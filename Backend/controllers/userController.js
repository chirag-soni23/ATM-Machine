import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { TryCatch } from "../utils/TryCatch.js";
import { generateToken } from "../utils/generateToken.js";
import getDataUri from "../utils/urlGenerator.js";
import cloudinary from 'cloudinary'

// Register 
export const registerUser = TryCatch(async(req,res)=>{
    const {name,email,password, mobileNumber} = req.body;
    let user = await User.findOne({ $or: [{ email }, { mobileNumber }] });
    if(user){
        return res.status(400).json({message:"Already have an account"})
    };
    const hashPassword = await bcrypt.hash(password,10);
    user = await User.create({
        name,email,password:hashPassword,mobileNumber
    });
    
    // JSON Web Token
    generateToken(user._id,res);
    res.status(200).json({user,message:"User registered successfully!"});
})

// Login
export const loginUser = TryCatch(async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Email or Password is incorrect"});
    }
    const comparePassword = await bcrypt.compare(password,user.password);
    if(!comparePassword){
        return res.status(400).json({message:"Email or Password is incorrect"})
    };
    // JSON Web Token
    generateToken(user._id,res);
    res.json({
        user,
        message:"User Logged in successfully!"
    })
})

// my profile
export const Myprofile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.user._id);
    res.json(user);
})

// user profile
export const userProfile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
})

// get all users
export const allUsers = TryCatch(async (req, res) => {
    const users = await User.find().select("-password");
    res.json({
        message: "All users fetched successfully!",
        users,
    });
});

// logout
export const logout = TryCatch(async(req,res)=>{
    res.cookie("token","",{maxAge:0});
    res.json({
        message:"Logged out succesfully!"
    })
})

// update profile picture
export const updateProfilePic = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    if (!req.file) {
        return res.status(400).json({ message: "Please upload a file." });
    }

    // Convert the uploaded file to a Data URI
    const file = getDataUri(req.file);

    // Upload the new image to Cloudinary
    const uploadResult = await cloudinary.v2.uploader.upload(file.content, {
        folder: "profile_pics",
    });

    // Delete the old profile picture from Cloudinary if it exists
    if (user.image && user.image.id) {
        await cloudinary.v2.uploader.destroy(user.image.id);
    }

    // Update the user's profile picture
    user.image = {
        id: uploadResult.public_id,
        url: uploadResult.secure_url,
    };

    await user.save();

    res.json({
        message: "Profile picture updated successfully!",
        image: user.image,
    });
});

// edit profile
export const editProfile = TryCatch(async(req,res)=>{
    const {name,email,mobileNumber} = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    if (name) user.name = name;
    if (email) {
        const emailExists = await User.findOne({ email, _id: { $ne: user._id } });
        if (emailExists) {
            return res.status(400).json({ message: "Email already in use." });
        }
        user.email = email;
    }

    if (mobileNumber) {
        const mobileExists = await User.findOne({
            mobileNumber,
            _id: { $ne: user._id },
        });
        if (mobileExists) {
            return res.status(400).json({ message: "Mobile number already in use." });
        }
        user.mobileNumber = mobileNumber;
    }

    await user.save();

    res.json({
        message: "Profile updated successfully!",
        user,
    });
})
