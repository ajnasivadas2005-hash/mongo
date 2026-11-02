
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/portfolio')
.then(() => console.log('MongoDB Connected Successfully!'))
.catch(err => console.log(err));

// Profile Schema
const profileSchema = new mongoose.Schema({
    name: String,
    role: String,
    tagline: String,
    about_one: String,
    about_two: String,
    goal: String
});

// Skills Schema
const skillSchema = new mongoose.Schema({
    name: String
});

// Projects Schema
const projectSchema = new mongoose.Schema({
    title: String,
    description: String
});

// Contact Schema
const contactSchema = new mongoose.Schema({
    email: String,
    location: String,
    linkedin: String,
    message: String
});

const Profile = mongoose.model('Profile', profileSchema);
const Skill = mongoose.model('Skill', skillSchema);
const Project = mongoose.model('Project', projectSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Get website content from MongoDB
app.get('/api/portfolio', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        const skills = await Skill.find();
        const projects = await Project.find();
        const contact = await Contact.findOne();

        res.json({
            profile,
            skills,
            projects,
            contact
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});