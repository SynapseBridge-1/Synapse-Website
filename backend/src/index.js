// import dotenv from "dotenv";
// dotenv.config({ path: ".env.development" });
// dotenv.config({ path: ".env.production" });
import { google } from "googleapis";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";

// Get the current file path (ES6 module way)

const app = express();
app.set('trust proxy', 1); 
// Retrieve database URI and port from environment variables
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

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
async function createTransporter() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });
  } catch (error) {
    console.error("Error creating transporter:", error);
    throw error;
  }
}

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

// Set up nodemailer transporter

    // Middleware to handle validation results
    const validate = (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json({ msg: errorMessages });
      }
      next();
    };

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

          const transporter = await createTransporter();
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
            console.error("Failed to send email:", error);
            res.status(500).send("Failed to send message");
          }
        } catch (error) {
          console.error("Server error:", error);
          res.status(500).send("Server error! Sorry for the inconvenience");
        }
      }
    );

    app.get("/api/health", async (req, res) => {
      // console.log("checking server....");
      return res.sendStatus(200);
    });
    // Start the server and listen on the specified port
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
