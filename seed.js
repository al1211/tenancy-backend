import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";


import Tenant from "./models/tanant.model.js";
import User from "./models/user.model.js";

await mongoose.connect(process.env.MONGO_DB);

const seed = async () => {
  await Tenant.deleteMany({});
  await User.deleteMany({});


  const acme = await Tenant.create({ name: "Acme", slug: "acme", plan: "free", noteLimit: 3 });
  const globex = await Tenant.create({ name: "Globex", slug: "globex", plan: "free", noteLimit: 3 });
  const hashedPassword = await bcrypt.hash("password", 10);

  const users = [
    { email: "admin@acme.test", password: hashedPassword, role: "Admin", tenant: acme._id },
    { email: "user@acme.test", password: hashedPassword, role: "Member", tenant: acme._id },
    { email: "admin@globex.test", password: hashedPassword, role: "Admin", tenant: globex._id },
    { email: "user@globex.test", password: hashedPassword, role: "Member", tenant: globex._id }
  ];

  for (const u of users) {
    await User.create(u);
  }

  console.log("Seeded tenants and users");
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
