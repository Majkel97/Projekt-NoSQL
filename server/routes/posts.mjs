import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of messages
router.get("/", async (req, res) => {
  let collection = await db.collection("messages");
  let results = await collection.find({}).toArray();

  res.send(results).status(200);
});

// Get a list of students
router.get("/students", async (req, res) => {
  try {
    let collection = await db.collection("students");
    let results = await collection.find({}).toArray();
    
    res.json({ students: results }).status(200);
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Get a list of messages
router.get("/students1", async (req, res) => {
  let collection = await db.collection("students");
  let results = await collection.find({}).toArray();

  res.send(results).status(200);
});

// Get a single message
router.get("/message/:id", async (req, res) => {
  let collection = await db.collection("messages");
  let query = {_id: ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a new message to the collection
router.post("/", async (req, res) => {
  let collection = await db.collection("messages");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Add a new student to collection
router.post("/student", async (req, res) => {
  let collection = await db.collection("students");
  let newDocument = req.body;
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


// Delete message from collection
router.delete("/message/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };

  const collection = db.collection("messages");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;

router.put("/message/:id", async (req, res) => {
  const messageId = req.params.id;
  const query = { _id: ObjectId(messageId) };

  try {
    const collection = await db.collection("messages");

    // Check if the message exists
    const existingMessage = await collection.findOne(query);
    if (!existingMessage) {
      return res.status(404).send("Message not found");
    }

    // Update the message
    const updateData = req.body;
    updateData.date = new Date();

    const updateResult = await collection.updateOne(query, { $set: updateData });

    res.json({ message: "Message updated successfully", updatedCount: updateResult.modifiedCount }).status(200);
  } catch (error) {
    console.error("Error updating message:", error.message);
    res.status(500).send("Internal Server Error");
  }
});


// Get all messages by student ID
router.get("/messagesByStudent/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Check if the provided studentId is a valid ObjectId
    if (!ObjectId.isValid(studentId)) {
      return res.status(400).send("Invalid student ID");
    }

    const collection = await db.collection("messages");

    // Find messages by student ID
    const results = await collection.find({ student: studentId }).toArray();

    res.send(results).status(200);
  } catch (error) {
    console.error("Error fetching messages by student ID:", error.message);
    res.status(500).send("Internal Server Error");
  }
});


// Get student data by message ID
router.get("/message/student/:id", async (req, res) => {
  try {
    const messageId = req.params.id;

    // Check if the provided messageId is a valid ObjectId
    if (!ObjectId.isValid(messageId)) {
      return res.status(400).send("Invalid message ID");
    }

    const messagesCollection = await db.collection("messages");
    const studentsCollection = await db.collection("students");

    // Find the message by ID
    const message = await messagesCollection.findOne({ _id: ObjectId(messageId) });

    if (!message) {
      return res.status(404).send("Message not found");
    }

    // Find the student associated with the message
    const student = await studentsCollection.findOne({ _id: ObjectId(message.student) });

    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.json({ student }).status(200);
  } catch (error) {
    console.error("Error fetching student by message ID:", error.message);
    res.status(500).send("Internal Server Error");
  }
});