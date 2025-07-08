import { User } from "../models/user.model.js";

import mongoose from "mongoose";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

const userSignUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        return res.status(400).json({ message: "User already existed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ user, message: "user is created" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "user is not authorized" });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "user not found " });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "invalid credentials" });
    }

    try {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        return res.status(500).json({ message: "login failed" });
    }
};

const forgetPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "user not found " });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail(email, resetLink);

    return res.json({ message: "reset link sent to mail" });
};

const resetPassword = async (req, res) => {
    const { token } = req.params;

    const { newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "user not found " });
        }

        const hashed = await bcrypt.hash(newPassword, 10);

        user.password = hashed;

        await user.save();

        res.json({ message: "password reset successful" });
    } catch (error) {
        return res.status(500).json({ message: " invalid or expired token" });
    }
};

export { userSignUp, userLogin, forgetPassword, resetPassword };
