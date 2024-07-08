// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import bcrypt from 'bcrypt';
import fs from 'fs';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';

// Get the current file path (ES6 module way)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// Serve static files for the addProject route
app.use("/api/addProject", (req, res, next) => {
  express.static("../src/assets")(req, res, next);
});

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per windowMs
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
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('email').trim().isEmail().withMessage('Email is required').normalizeEmail().withMessage("Email is invalid"),
  body('message').trim().notEmpty().withMessage('Message is required').escape(),
];

const loginValidationRules = [
  body('adminUsername').notEmpty().withMessage('Username is required').trim().escape(),
  body('adminPassword')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches('[0-9]').withMessage('Password must contain a number')
    .matches('[A-Z]').withMessage('Password must contain a capital letter')
    .trim().escape(),
];

const addProjectValidationRules = [
  body('name').trim().notEmpty().withMessage('Project name is required').escape(),
  body('description').trim().notEmpty().withMessage('Project description is required').escape(),
];

const addServiceValidationRules = [
  body('name').trim().notEmpty().withMessage('Service name is required').escape(),
  body('description').trim().notEmpty().withMessage('Service description is required').escape(),
];

const deleteProjectValidationRules = [
  body('name').trim().notEmpty().withMessage('Project name is required').escape(),
];

const deleteServiceValidationRules = [
  body('name').trim().notEmpty().withMessage('Service name is required').escape(),
];

const loginAdminValidationRules = [
  body("adminUsername").trim().notEmpty().withMessage("Username is required").escape(),
  body("adminPassword").trim().notEmpty().withMessage("Password is required").escape(),
];

// Create a new MongoClient instance
const client = new MongoClient(databaseURI);

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // Define the database and collections
    const db = client.db("synapseBridge");
    const servicesCollection = db.collection("services");
    const projectsCollection = db.collection("projects");
    const adminCollection = db.collection("admin");

    // Set up storage engine for Multer
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "../src/assets/"); // Adjust the destination path as necessary
      },
      filename: function (req, file, cb) {
        cb(
          null,
          path.basename(file.originalname, path.extname(file.originalname)) +
            "-" +
            Date.now() +
            path.extname(file.originalname)
        );
      },
    });

    // Function to check file type
    function checkFileType(file, cb) {
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb("Error: Images Only!");
      }
    }

    // Initialize Multer with storage engine and file filter
    const upload = multer({
      storage: storage,
      limits: { fileSize: 1000000 }, // 1MB file size limit
      fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
      },
    }).single("image");

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Middleware to handle validation results
    const validate = (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ msg: errorMessages });
      }
      next();
    };

    // Route to get all services
    app.get("/api/services", async (req, res) => {
      try {
        const services = await servicesCollection.find({})
          .project({ _id: 0, name: 1, description: 1 }) // Include name and description
          .toArray();
        res.status(200).json(services);
      } catch (error) {
        console.error("Error retrieving services:", error);
        res.status(500).json({ message: "Error retrieving services" });
      }
    });

    // Route to get all projects
    app.get("/api/projects", async (req, res) => {
      try {
        const projects = await projectsCollection.find({})
          .project({ _id: 0, name: 1, description: 1, imagePath: 1 }) // Include name, description, and imagePath
          .toArray();
        res.status(200).json(projects);
      } catch (error) {
        console.error("Error retrieving projects:", error);
        res.status(500).json({ message: "Error retrieving projects" });
      }
    });

    // Route to get all projects for admin without imagePath
    app.get("/api/admin/projects", async (req, res) => {
      try {
        const projects = await projectsCollection.find({}, { imagePath: 0 })
          .project({ _id: 0, name: 1, description: 1 }) // Include name and description
          .toArray();
        res.status(200).json(projects);
      } catch (error) {
        console.error("Error retrieving projects:", error);
        res.status(500).json({ message: "Error retrieving projects" });
      }
    });

    // Route to get all services for admin
    app.get("/api/admin/services", async (req, res) => {
      try {
        const services = await servicesCollection.find({})
          .project({ _id: 0, name: 1, description: 1 }) // Include name and description
          .toArray();
        res.status(200).json(services);
      } catch (error) {
        console.error("Error retrieving services:", error);
        res.status(500).json({ message: "Error retrieving services" });
      }
    });

    // Route to handle project addition with file upload
    app.post(
      "/api/addProject",
      upload,
      addProjectValidationRules,
      validate,
      async (req, res) => {
        const { name, description } = req.body;

        if (!req.file) {
          return res.status(400).json({ msg: "No file selected!" });
        }

        const imagePath = path.join("../src/assets", req.file.filename);
        const newProject = {
          name,
          description,
          imagePath,
        };

        try {
          const result = await projectsCollection.insertOne(newProject);
          if (result.acknowledged) {
            res.status(200).json({ msg: "Project added successfully!" });
          } else {
            res.status(400).json({ msg: "Failed to add Project" });
          }
        } catch (err) {
          console.log("Database error:", err);
          res.status(400).json({ msg: err.message });
        }
      }
    );

     // Route to handle contact form submission
     app.post(
      "/api/contact",
      contactValidationRules,
      validate,
      async (req, res) => {
        try {
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
            console.error("Error sending email:", error);
            res.status(500).send("Failed to send message");
          }
        } catch (err) {
          console.log("api/contact error", err);
          res.status(500).send("Server error!  Sorry for inconvenience");
        }
      }
    );

    // Route to handle service addition
    app.post(
      "/api/addService",
      addServiceValidationRules,
      validate,
      async (req, res) => {
        const { name, description } = req.body;

        try {
          const result = await servicesCollection.insertOne({
            name,
            description,
          });
          if (result.acknowledged) {
            res.status(200).json({ msg: "Service added successfully!" });
          } else {
            res.status(400).json({ msg: "Failed to add Service" });
          }
        } catch (err) {
          console.error("Database error:", err);
          res.status(400).json({ msg: err.message });
        }
      }
    );

    // Route to handle project deletion
    // Route to handle project deletion
    app.delete(
      "/api/deleteProject",
      deleteProjectValidationRules,
      validate,
      async (req, res) => {
        const { name } = req.body;

        try {
          // Find the project to get the file path
          const project = await projectsCollection.findOne({ name });
          if (!project) {
            return res.status(404).json({ msg: "Project not found!" });
          }

          // Use the imagePath from the project document as a relative path
          const filePath = path.resolve(__dirname, project.imagePath);

          // Delete the project image file
          fs.unlink(filePath, async (err) => {
            if (err) {
              console.error("File deletion error:", err);
              return res.status(500).json({ msg: "File deletion failed!" });
            }

            // Delete the project document from the database
            const result = await projectsCollection.deleteOne({ name });
            if (result.deletedCount === 1) {
              res.status(200).json({ msg: "Project deleted successfully!" });
            } else {
              res.status(404).json({ msg: "Project not found!" });
            }
          });
        } catch (err) {
          console.error("Database error:", err);
          res.status(400).json({ msg: err.message });
        }
      }
    );


     // Route to handle service deletion
     app.delete(
      "/api/deleteService",
      deleteServiceValidationRules,
      validate,
      async (req, res) => {
        const { name } = req.body;

        try {
          const result = await servicesCollection.deleteOne({ name });
          if (result.deletedCount === 1) {
            res.status(200).json({ msg: "Service deleted successfully!" });
          } else {
            res.status(404).json({ msg: "Service not found!" });
          }
        } catch (err) {
          console.error("Database error:", err);
          res.status(400).json({ msg: err.message });
        }
      }
    );
  // POST /api/setup-admin: Endpoint to set up or update admin credentials
  app.post("/api/setup-admin", loginValidationRules,validate, async (req, res) => {
    // Extract the admin username and password from the request body
    const { adminUsername, adminPassword } = req.body;

    try {
      // Retrieve the pepper value from environment variables
      const PEPPER = process.env.PEPPER;

      // Combine the password with the pepper
      const pepperedPassword = adminPassword + PEPPER;

      // Define the number of salt rounds for hashing
      const saltRounds = 10;

      // Hash the peppered password with bcrypt
      const hashedPassword = await bcrypt.hash(
        pepperedPassword,
        saltRounds
      );

      // Create an admin object with the hashed password
      const admin = {
        username: adminUsername,
        password: hashedPassword,
      };

      // Upsert the admin credentials in the MongoDB collection
      const result = await adminCollection.updateOne(
        { username: adminUsername },
        { $set: admin },
        { upsert: true }
      );

      // Log the result of the upsert operation
      console.log(
        `Admin credentials stored with _id: ${
          result.upsertedId || adminUsername
        }`
        
      );

      // Send a success response
      res.status(200).json({ message: "Admin password setup successful" });
    } catch (error) {
      // Log and send an error response in case of any issues
      console.log("Error setting up admin password:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

    // Route to handle admin login
  // POST /api/login-admin: Endpoint to log in as admin
  app.post(
    "/api/login-admin",
    loginAdminValidationRules,
    validate,
    async (req, res) => {
      // Extract the admin username and password from the request body
      const { adminUsername, adminPassword } = req.body;

      try {
        // Retrieve the pepper value from environment variables
        const PEPPER = process.env.PEPPER;

        // Find the admin user in the MongoDB collection
        const admin = await adminCollection.findOne({
          username: adminUsername,
        });
        if (!admin) {
          // Send a 401 Unauthorized response if the admin user is not found
          return res
            .status(401)
            .json({ msg: "Invalid username or password" });
        }

        // Combine the provided password with the pepper
        const pepperedPassword = adminPassword + PEPPER;

        // Compare the peppered password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(
          pepperedPassword,
          admin.password
        );

        if (isPasswordValid) {
          // Send a success response if the password is valid
          res.status(200).json({ msg: "Login successful" });
        } else {
          // Send a 401 Unauthorized response if the password is invalid
          res.status(401).json({ msg: "Invalid username or password" });
        }
      } catch (error) {
        // Log and send an error response in case of any issues
        console.error("Error during admin login:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
    // Start the server and listen on the specified port
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

connectToDatabase();
