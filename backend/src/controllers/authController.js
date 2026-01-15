const bcrypt = require('bcryptjs');
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const Session = require('../models/Session');
const ACCESS_TOKEN_TTL = '30m'
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000
exports.changePassword = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("REQ USER:", req.user);
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Missing password fields" });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: "New password must be at least 6 characters" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect" });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        await Session.deleteMany({ userId });
        res.clearCookie("refreshToken");
        return res.json({ message: "Password changed successfully. Please login again." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token not found" });
        }

        const hashed = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        const session = await Session.findOne({ refreshToken: hashed });
        if (!session || session.expiresAt < new Date()) {
            if (session) await session.deleteOne();
            return res.status(401).json({ message: "Refresh token expired" });
        }

        const user = await User.findById(session.userId);
        if (!user || user.isBlocked) {
            return res.status(403).json({ message: "User not allowed" });
        }

        const newAccessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
        );

        return res.json({ accessToken: newAccessToken });
    } catch {
        return res.status(500).json({ message: "Server error" });
    }
};
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Email created successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "err server", error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).json({ message: "Email or password not correct" });

        if (user.isBlocked)
            return res.status(403).json({ message: "Account is blocked" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Email or password not correct" });

        const accessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_TTL }
        );
        console.log(accessToken);

        const refreshToken = crypto.randomBytes(40).toString("hex");
        const hashedRefreshToken = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        await Session.create({
            userId: user._id,
            refreshToken: hashedRefreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: REFRESH_TOKEN_TTL,
        });

        res.json({
            message: "Login successfully",
            accessToken,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role,
                avatarUrl: user.avatarUrl,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "err server", error: err.message });
    }
};

exports.logOut = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (refreshToken) {
            const hashedRefreshToken = crypto
                .createHash("sha256")
                .update(refreshToken)
                .digest("hex");

            await Session.deleteOne({ refreshToken: hashedRefreshToken });
            res.clearCookie("refreshToken");
        }

        return res.status(204).json({ message: "Logout successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
