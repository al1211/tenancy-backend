import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Provide email and password" });

  const user = await User.findOne({ email }).populate("tenant");
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.status(401).json({message:"Email or password is incorrect"})
  }

  const token = signToken(user._id);
  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      tenant: { name: user.tenant.name, slug: user.tenant.slug, plan: user.tenant.plan }
    }
  });
};
