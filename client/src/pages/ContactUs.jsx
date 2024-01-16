import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    try {
      const response = await fetch("http://localhost:3001/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };
  const profiles = [
    {
      name: "Kristion Kim",
      email: "kriselijahk1@gmail.com",
      github: "https://github.com/kimkristion",
      image: "./src/assets/profiles/kristion kim.jpg",
    },
    {
      name: "Alexis Lopez",
      email: "lopez111alex@gmail.com",
      github: "https://github.com/AlexisJLO",
      image: "./src/assets/profiles/alexisLopez.png",
    },
    {
      name: "Jason Grant",
      email: "jason82autotech@gmail.com",
      github: "https://github.com/jason82autotech",
      image: "./src/assets/profiles/jasonGrant.jpg",
    },
    {
      name: "Emilio Lopez",
      email: "john.doe@example.com",
      github: "https://github.com/Emlonike",
      image: "./src/assets/profiles/emilioLopez.png",
    },
  ];
  return (
    <div>
      <div class="wave">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>

      <div className="contact-us">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="profiles-section">
        {profiles.map((profile) => (
          <div key={profile.name} className="profile-card">
            <img src={profile.image} alt={profile.name} />
            <h3>{profile.name}</h3>
            <p>Email: {profile.email}</p>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
