const bcrypt = require('bcryptjs');
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const Session = require('../models/Session');
const ACCESS_TOKEN_TTL = '30m'
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("BODY:", req.body);

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
