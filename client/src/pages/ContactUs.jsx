import React, { useState } from 'react';
import './ContactUs.css';





const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
    
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    
  };
  const profiles = [
    {
      name: 'Kristion Kim',
      email: 'kriselijahk1@gmail.com',
      github: 'https://github.com/kimkristion',
      image: './src/assets/kristion kim.jpg', 
    },
    {
      name: 'Alexis Lopez',
      email: 'lopez111alex@gmail.com',
      github: 'https://github.com/AlexisJLO',
      image: './src/assets/alexisLopez.png', 
    },
    {
      name: 'Jason Grant',
      email: 'jason82autotech@gmail.com',
      github: 'https://github.com/jason82autotech',
      image: './src/assets/jasonGrant.jpg',
    },
    {
      name: 'Emilio Lopez',
      email: 'john.doe@example.com',
      github: 'https://github.com/Emlonike',
      image: './src/assets/emilioLopez.png', 
    },
   
  ];
  return (
  <div>
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
