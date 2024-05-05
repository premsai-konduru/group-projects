const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Connect to MongoDB (change the connection string accordingly)
mongoose.connect('mongodb://127.0.0.1/activitydairy');

// Define a mongoose schema for the activity model
const activitySchema = new mongoose.Schema({
    title: String,
    deadline: Date,
    status: String
});

const Activity = mongoose.model('Activity', activitySchema);

app.use(express.json());
app.use(cors());

app.get('/api/tasks', async (req, res) => {
    try {
        // Fetch all tasks from the database
        const tasks = await Activity.find();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to handle adding a new activity
app.post('/api/activities', async (req, res) => {
    try {
        const { title, deadline } = req.body;
        const status = "In Progress";
        const newActivity = new Activity({ title, deadline, status });
        const savedActivity = await newActivity.save();
        res.json(savedActivity);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update task status
app.put('/api/tasks/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    const newStatus = req.body.status;

    try {
        // Find the task by ID and update its status
        const updatedTask = await Activity.findByIdAndUpdate(
            taskId,
            { $set: { status: newStatus } },
            { new: true }
        );

        if (updatedTask) {
            res.json({ success: true, message: 'Task updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Task not found' });
        }
    } catch (error) {
        console.error('Error updating task status:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
