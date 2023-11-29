const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const port = 3000; // You can choose any available port

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/foodfrom');   
}
const ConatctSchema = new mongoose.Schema({
    name: {type:String},
    Email:{type:String},
    Number:{type:Number},
    message:{type:String},
});
const Contact = mongoose.model('contact', ConatctSchema);
module.exports=Contact;
// Serve static files (e.g., CSS) from a 'public' directory
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded());

// Define a route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/',  async(req, res) => {

    const data={
        name:req.body.name,
        Email:req.body.Email,
        Number:req.body.Number,
        message:req.body.message
    }
    Contact.insertMany([data]);
   
    res.send("this data is send to databse");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})