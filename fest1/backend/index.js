const express = require('express');
const mysql = require('mysql');
const mongoose = require('mongoose')
const Feedback = require('./feedback')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(cors())
app.use(bodyParser.json());
const port = 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "rajithebbar",
    database: "festmanagement",
    port: "3306"
});
db.connect(function (error) {
    if (error) console.log(error);
    else console.log("connected to Mysql");
})

app.post("/participant", (req, res) => {
    console.log("Received POST request to /participant")
    console.log(req.body)
    const {
        name,
        email,
        usn,
        phoneNumber,
        event,
        year,
        branch,
        gen,
        college,
        dob
    } = req.body;


    const sql = `INSERT INTO participant (name, email, usn, phoneNumber, Ename, year, branch, gender, college, dob) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, email, usn, phoneNumber, event, year, branch, gen, college, dob];

    db.query(sql, values, (error, res) => {
        if (error) {
            console.error("Registration Failed:", error);
            return res.status(500).json({ error: "Registration Failed.." });
        }
        console.log("Registration successful!");
        return res.json({ Status: "Success" });
    });
});
app.get("/participant", (req, res) => {
    db.query("SELECT * FROM participant", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
    // console.log("team head successfully signed in")
})


app.get("/Event", (req, res) => {
    db.query("select * from Event,EventLocation where Event.Ename=EventLocation.Ename", (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: "Error fetching data from Event table" })
        }
        res.json(result)
    })
})
app.get("/Sponsorship", (req, res) => {
    db.query("SELECT * FROM Sponsorship", (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: "Error fetching data from sponsorship table" })
        }
        res.json(result)
    })
})

app.get("/Organizes", (req, res) => {
    db.query("SELECT * FROM Organizes", (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: "Error fetching data from organizers table" })
        }
        res.json(result)
    })
})


app.put('/Event/:Ename', (req, res) => {
    const eventName = req.params.Ename;
    const updatedEvent = req.body;

    const formattedDate = new Date(updatedEvent.Date).toISOString().slice(0, 19).replace('T', ' ');

    const sql = `UPDATE Event SET Ename=?, Teamsize=?, EntryFee=?, Cname=?, Date=? WHERE Ename=?`;
    const values = [updatedEvent.Ename, updatedEvent.Teamsize, updatedEvent.EntryFee, updatedEvent.Cname, formattedDate, eventName];

    db.query(sql, values, (error, result) => {
        if (error) {
            console.error('Error updating event:', error);
            return res.status(500).json({ error: 'Error updating event' });
        }

        console.log('Event updated successfully!');
        res.json({ status: 'Success' });
    });
});

mongoose.connect('mongodb://127.0.0.1:27017/feedback', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db1 = mongoose.connection;
db1.on('error', console.error.bind(console, 'MongoDB connection error:'));
db1.once('open', () => {
    console.log('Connected to MongoDB');
});

app.post('/feedback', async (req, res) => {
    console.log('Received POST request to /feedback');
    console.log(req.body);

    try {
        const { participantUsn, feedbackText, rating } = req.body;

        var newFeedback = new Feedback({
            participantUsn: participantUsn,
            feedbackText: feedbackText,
            rating: rating,
        });

        await newFeedback.save();
        console.log('MongoDB Feedback added successfully!');
        return res.json({ Status: 'Success' });
    } catch (error) {
        console.error('MongoDB Feedback insertion failed:', error);
        return res.status(500).json({ error: 'MongoDB Feedback insertion failed..' });
    }
});

app.get('/feedback', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedback data from MongoDB:', error);
        return res.status(500).json({ error: 'Error fetching feedback data from MongoDB' });
    }
});


app.listen(port, () => {
    console.log("listening....")
});

