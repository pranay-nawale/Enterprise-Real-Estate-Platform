require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const Hero = require('./models/Hero');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', apiRoutes);

// Health check / welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Real Estate CMS API' });
});

// Auto-seed database if empty
const autoSeed = async () => {
  try {
    const count = await Hero.countDocuments();
    if (count === 0) {
      console.log('Database is empty. Auto-seeding initial data...');
      
      // Load seed data directly here
      const About = require('./models/About');
      const Service = require('./models/Service');
      const Property = require('./models/Property');
      const Project = require('./models/Project');
      const Contact = require('./models/Contact');

      // Seed Hero
      await Hero.create({
        title: "one",
        subtitle: "CODENAME",
        description: "Subhash Nagar, Chembur, Mumbai. Where home extends to life.",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
        buttonText: "EXPLORE THE PROJECT"
      });

      // Seed About
      await About.create({
        title: "A Legacy Built for the Future",
        description: "Located in Subhash Nagar, Chembur, this residential redevelopment offers a practical yet elevated living experience. Comprising 1 & 2 BHK residences in Ground-Level Commercial Spaces + 16-Story Habitational Floors, the project is planned with a strong focus on functionality and lifestyle — adding daily convenience, a modern gymnasium/fitness center, and lifestyle amenities, ensuring a well-rounded living environment for residents.",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
      });

      // Seed Services
      await Service.create([
        {
          title: "Premium Residential Projects",
          description: "We craft top-tier residential developments with luxury apartments, world-class amenities, and spacious floor layouts designed for your dream lifestyle."
        },
        {
          title: "Prime Retail Spaces",
          description: "Ground-level commercial and retail zones designed for business visibility, retail convenience, and everyday shopping needs for the neighborhood."
        },
        {
          title: "Redevelopment Excellence",
          description: "Transforming older residential complexes into modern high-rises with state-of-the-art construction quality and structural integrity."
        }
      ]);

      // Seed Properties
      await Property.create([
        {
          propertyName: "1 RK Classic",
          location: "Subhash Nagar, Chembur, Mumbai",
          price: "₹ 45 Lakhs",
          bedrooms: 0,
          bathrooms: 1,
          area: "330 sq.ft",
          description: "Cozy 1 RK apartment with grand layout, private bathroom, carpet area of 285 sq.ft and balcony of 45 sq.ft. Floors 1-8.",
          imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80"
        },
        {
          propertyName: "1 BHK Grand",
          location: "Subhash Nagar, Chembur, Mumbai",
          price: "₹ 75 Lakhs",
          bedrooms: 1,
          bathrooms: 1,
          area: "450 sq.ft",
          description: "Spacious 1 BHK Grand apartment with separate living room, dining, toilet, carpet area of 385 sq.ft and balcony of 65 sq.ft. Floors 9-15.",
          imageUrl: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=600&q=80"
        },
        {
          propertyName: "2 BHK Alto",
          location: "Subhash Nagar, Chembur, Mumbai",
          price: "₹ 1.2 Crores",
          bedrooms: 2,
          bathrooms: 2,
          area: "670 sq.ft",
          description: "Premium 2 BHK Alto residence with two bedrooms, two bathrooms, kitchen, carpet area of 585 sq.ft and balcony of 85 sq.ft. Floors 16+.",
          imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
        }
      ]);

      // Seed Projects
      await Project.create([
        {
          projectName: "Gymnasium & Fitness Center",
          description: "State-of-the-art gym with modern training machinery, cardio zones, and weights.",
          imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80"
        },
        {
          projectName: "Indoor Games Area",
          description: "Table tennis, chess, and board games area for recreation.",
          imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
        },
        {
          projectName: "Yoga & Meditation Area",
          description: "Tranquil open space designed for mindfulness, stretching, and physical wellness.",
          imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80"
        },
        {
          projectName: "Ample Parking Space",
          description: "Dedicated multi-level parking for residents and visitor vehicles.",
          imageUrl: "https://images.unsplash.com/photo-1506521788723-85811181d33b?auto=format&fit=crop&w=600&q=80"
        },
        {
          projectName: "Grand Entrance Lobby",
          description: "Elegantly styled main lobby with security desk and visitor lounge.",
          imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
        }
      ]);



      // Seed Contact
      await Contact.create({
        address: "312, Swastik Group, Swastik House, Corporate Park, L.B.S. Marg, Ghatkopar (West), Mumbai - 400086",
        phone: "+91 022-6689 0000 / +91 98201 08988",
        email: "swastikgroup123@gmail.com"
      });

      console.log('Database auto-seeded successfully!');
    }
  } catch (error) {
    console.error('Error during auto-seeding:', error);
  }
};

// Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  autoSeed().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
});
