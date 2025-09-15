import Notes from "../models/note.model.js";
import Tenant from "../models/tanant.model.js";

const ensureWithinLimit = async (tenantId) => {
  const tenant = await Tenant.findById(tenantId);
  if (tenant.plan === "pro") return; // unlimited
  const limit = tenant.noteLimit ?? 3;
  const count = await Notes.countDocuments({ tenant: tenantId });
  if (count >= limit) {
    const err = new Error("Note limit reached for Free plan. Upgrade to Pro.");
    err.statusCode = 403;
    throw err;
  }
};

export const createNote = async (req, res) => {
  const { title, body } = req.body;
  const tenantId = req.user.tenant._id;
  await ensureWithinLimit(tenantId);
  const note = await Notes.create({ title, body, tenant: tenantId, author: req.user._id });
  res.status(201).json(note);
};

export const listNotes = async (req, res) => {
  const tenantId = req.user.tenant._id;
  const notes = await Notes.find({ tenant: tenantId }).sort({ createdAt: -1 });
  res.json(notes);
};

export const getNote = async (req, res) => {
  const tenantId = req.user.tenant._id;
  const note = await Notes.findOne({ _id: req.params.id, tenant: tenantId });
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
};

export const updateNote = async (req, res) => {
  const tenantId = req.user.tenant._id;
  const note = await Notes.findOneAndUpdate({ _id: req.params.id, tenant: tenantId }, req.body, { new: true, runValidators: true });
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
};

export const deleteNote = async (req, res) => {
  const tenantId = req.user.tenant._id;
  const note = await Notes.findOneAndDelete({ _id: req.params.id, tenant: tenantId });
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json({ message: "Deleted" });
};
