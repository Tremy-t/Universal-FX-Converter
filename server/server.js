const uri = "mongodb+srv://tremytailor:LiSAXal3kCUsy6os@cluster0.xmxru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./models/Messages');

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
const PORT = 3000;
mongoose.connect('mongodb://localhost:27017/contactDB').then(() => {
  app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
  });
  
});

app.use((req, res, next) => {
  console.log(req.path)

  next()
})

// Handle form submission
app.post('/contact', async (req, res) => {
    const { fullName, email, message } = req.body;

    try {
        const newContact = await Contact.create({ fullName, email, message });
        
        res.status(200).json(newContact);
    } catch (error) {
      console.log(error);
   
      res.status(403).json('Error saving contact information.', error.message.errorResponse);
    }
});

app.get('/messages', async (req, res) => {
  try {
    const allMessages = await Contact.find();

    res.status(200).json(allMessages)
  } catch (error) {
    console.log(error);
    res.status(403).json(error)
  }
})