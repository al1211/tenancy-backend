import express from "express";
import * as notesController from "../controllers/notes.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const notesrouter = express.Router();
notesrouter.use(protect); // all notes endpoints require auth

notesrouter.post("/", notesController.createNote);
notesrouter.get("/", notesController.listNotes);
notesrouter.get("/:id", notesController.getNote);
notesrouter.put("/:id", notesController.updateNote);
notesrouter.delete("/:id", notesController.deleteNote);

export default notesrouter;
