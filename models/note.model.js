import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Notes=mongoose.model("Note",noteSchema);
export default Notes