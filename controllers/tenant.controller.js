import Tenant from "../models/tanant.model.js";
import User from "../models/user.model.js";

export const inviteUser = async (req, res) => {
  
  const { email, role = "Member", password = "password" } = req.body;
  const tenant = req.user.tenant;

  if (!email) return res.status(400).json({ message: "email required" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ email, password, role, tenant: tenant._id });
  res.status(201).json({ message: "Invited", user: { id: user._id, email: user.email, role: user.role } });
};

export const upgradeTenant = async (req, res) => {
  // POST /tenants/:slug/upgrade (Admin only)
  const { slug } = req.params;
  // ensure admin's tenant slug matches slug param
  if (req.user.tenant.slug !== slug) return res.status(403).json({ message: "Cannot upgrade other tenant" });

  const tenant = await Tenant.findOne({ slug });
  if (!tenant) return res.status(404).json({ message: "Tenant not found" });

  tenant.plan = "pro";
  tenant.noteLimit = null; // unlimited
  await tenant.save();

  res.json({ message: "Tenant upgraded to Pro", tenant: { slug: tenant.slug, plan: tenant.plan } });
};
