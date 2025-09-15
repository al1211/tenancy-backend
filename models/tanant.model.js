import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // e.g. "acme", "globex"
  plan: { type: String, enum: ["free","pro"], default: "free" },
  noteLimit: { type: Number, default: 3 } // used for free plan
}, { timestamps: true });

const Tenant=mongoose.model("Tenant",tenantSchema);
export default Tenant
