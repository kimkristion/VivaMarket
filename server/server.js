const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require("./utils/auth");
const nodemailer = require("nodemailer");
const cors = require("cors");


const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const port = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lopez111alex@gmail.com",
    pass: "obyk ezvi uyfv cxuo",
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/contact-us", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `${email}\n`,
    to: "lopez111alex@gmail.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  db.once("open", () => {
    app.listen(port, () => {
      console.log(`API server running on port ${port}!`);
      console.log(`Use GraphQL at http://localhost:${port}/graphql`);
    });
  });
};

startApolloServer();
