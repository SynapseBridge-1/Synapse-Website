// import dotenv from "dotenv";
// dotenv.config({ path: ".env.development" });
// dotenv.config({ path: ".env.production" });

import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";

// Get the current file path (ES6 module way)


const app = express();

// Retrieve database URI and port from environment variables
const databaseURI = process.env.db_uri;
const port = process.env.PORT;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));



// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // limit each IP to 20 requests per windowMs
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
  headers: true, // include rate limit headers
});

// Apply rate limiting to all requests
app.use(limiter);


// Validation and sanitization rules
const contactValidationRules = [
  body("name").trim().notEmpty().withMessage("Name is required").escape(),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email is required")
    .normalizeEmail()
    .withMessage("Email is invalid"),
  body("message").trim().notEmpty().withMessage("Message is required").escape(),
];

// Create a new MongoClient instance
const client = new MongoClient(databaseURI);

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully");
    // Define the database and collections
    const db = client.db("synapseBridge");
    const servicesCollection = db.collection("services");
    const projectsCollection = db.collection("projects");

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Middleware to handle validation results
    const validate = (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json({ msg: errorMessages });
      }
      next();
    };

    // Route to get all projects with embedded images
    app.get("/api/projects", async (req, res) => {
      try {
        console.log("projects api");
        const projects = await projectsCollection.find({}).toArray();

        // Convert each project's binary data to base64 for sending over JSON
        const projectsWithImages = projects.map((project) => ({
          ...project,
          imageData: project.imageData.toString("base64"),
        }));

        res.status(200).send(projectsWithImages);
      } catch (error) {
        console.error("Error retrieving projects:", error);
        res.status(500).json({ message: "Error retrieving projects" });
      }
    });

    // Route to get all services
    app.get("/api/services", async (req, res) => {
      try {
        console.log("services api");
        const services = await servicesCollection
          .find({})
          .project({ _id: 0, name: 1, description: 1 }) // Include name and description
          .toArray();
        res.status(200).json(services);
        // res.send(services);
      } catch (error) {
        res.status(500).json({ message: "Error retrieving services" });
      }
    });

    // Route to handle contact form submission
    app.post(
      "/api/contact",
      contactValidationRules,
      validate,
      async (req, res) => {
        try {
          console.log("contact api");
          const { name, email, message } = req.body;

          if (!name || !email || !message) {
            return res.status(400).send("All fields are required");
          }

          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.COMPANY_EMAIL,
            subject: `New Message from Client ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
          };

          try {
            await transporter.sendMail(mailOptions);
            res.status(200).send("Message sent successfully");
          } catch (error) {
            res.status(500).send("Failed to send message");
            console.log("failed to send email",error);
          }
        } catch (err) {
          res.status(500).send("Server error!  Sorry for inconvenience");
          console.log("error:server",err);
        }
      }
    );

    // Start the server and listen on the specified port
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  }
}

connectToDatabase();