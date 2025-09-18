const express = require("express");
const path = require("path");
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');




require("dotenv").config();



// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Contact Form Route
app.post("/request-call", async (req, res) => {
  const {name, email, phone, parking } = req.body;

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail
        pass: process.env.GMAIL_PASS, // App password
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER, // Your email
      subject: "New Parking Call Request",
      text: `
        You have a new request call:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Parking Area: ${parking}
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

  res.json({ success: true, message: "Request submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send(" Error sending email.");
  }
});

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Router
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
