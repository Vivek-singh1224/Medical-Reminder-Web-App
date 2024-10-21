const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect("mongodb://localhost:27017/medicineDB", { useNewUrlParser: true, useUnifiedTopology: true });


const medicineSchema = new mongoose.Schema({
    name: String,
    dosage: String,
    frequency: String,
    reminderTime: String,
});


const Medication = mongoose.model("Medication", medicineSchema);


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

app.post("/addMedication", (req, res) => {
    const newMedication = new Medication({
        name: req.body.name,
        dosage: req.body.dosage,
        frequency: req.body.frequency,
        reminderTime: req.body.reminderTime
    });

    newMedication.save((err) => {
        if (!err) {
            res.redirect("/");
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
