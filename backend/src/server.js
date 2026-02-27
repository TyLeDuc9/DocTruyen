const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const { connectDB } = require('./libs/db');
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

const categoryRoute = require('./routes/categoryRoute')
const storyRoute = require('./routes/storyRoute')
const chapterRoute = require('./routes/chapterRoute')
const authRoute = require('./routes/authRoute')
const followRoute = require('./routes/followRoute')
const favoriteRoute = require('./routes/favoriteRoute')
const commentRoute = require('./routes/commentRoute')
const userRoute = require('./routes/userRoute')
const readingHistoryRoute = require('./routes/readingHistoryRoute')
const notifyRoute = require('./routes/notifyRoute')
const dashRoute = require('./routes/dashboardRoute')
const chapterReportRoute = require('./routes/chapterReportRoute')
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://doctruyen-1.onrender.com", "https://doctruyen-admin.onrender.com/login-admin"],
    credentials: true,              
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/category', categoryRoute)
app.use('/api/story', storyRoute)
app.use('/api/chapter', chapterRoute)
app.use('/api/auth', authRoute)
app.use('/api/follow', followRoute)
app.use('/api/favorite', favoriteRoute)
app.use('/api/comment', commentRoute)
app.use('/api/user', userRoute)
app.use('/api/reading-history', readingHistoryRoute)
app.use('/api/notify', notifyRoute)
app.use('/api/dashboard', dashRoute)
app.use('/api/chapter-report', chapterReportRoute)



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
});
