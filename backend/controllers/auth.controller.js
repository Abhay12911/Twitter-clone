import {generateTokenAndSetCookie} from "../lib/utils/generateToken.js";
import user from "../models/user.model.js"
import bcrypt from "bcryptjs";

export const signup = async (req,res) =>{
   try {
        const {fullName, username, email, password} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email format"});
        }
        const existingUser = await user.findOne({username});

        if(existingUser){
            return res.status(400).json({error:"Username is alreasy taken"});
        }

        const existingEmail = await user.findOne({email});
        if(existingEmail){
            return res.status(400).josn({error:"Email is already taken"});
        }

        if (password.length <6){
            return res.status(400).json({error:"Password must be atleast 6 digits long"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new user({
            fullName,
            email,
            username,
            password: hashedPassword,
        });

        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,

            });
        } else{
            res.status(400).json({error: "invalid user data"});
        }
   } catch (error) {
    console.log("Error in signup contoller", error.message);
    res.status(500).json({error: "ineternal Server Error"});
   }
};

export const login = async (req,res) =>{
    res.json({
        data:"You hit the login endpoint",
    })
}

export const logout = async (req,res) =>{
    res.json({
        data: "You hit the logout endpoint",
    })
}