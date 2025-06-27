import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jsonwebtoken.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if(!emailRegex.test(email)){
    return res.status(400).json({ error: "Invalid email" });
  }
  if(!passwordRegex.test(password)){
    return res.status(400).json({ error: "Password must be at least 5 characters long and include uppercase, lowercase, number, and special character." });
  }
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "User already exists. Kindly login" });
    const hashPassword = await bcrypt.hash(password,10);
    const user = await User.create({ name, email, password:hashPassword });
    res.status(201).json({message: "User registered successfully"});
  } catch (error) {
    console.log("error in signup route", error.message)
    return res.status(500).json({ error: "Server error" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User does not exits" });
    }
    console.log(user)
   const verify = await bcrypt.compare(password, user.password);

    if(!verify){
      return res.status(401).json({success:false , error:"Invaild password"});
    }
    const token = await generateToken(user.email);
    res.cookie("token", token, {
    // httpOnly: true,
    // secure: true,
    // sameSite: "Strict",
    maxAge: 60 * 60 * 1000, 
    });

    return res.status(200).json({success:true ,message: "logged in" , name:user.name , email:user.email } )

  } catch (error) {
    console.log("error in login route", error.message)
    return res.status(500).json({ error: "Server error" });
  }
}

export async function logout(req, res) {
    res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
}
