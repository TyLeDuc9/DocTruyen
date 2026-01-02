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

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/category', categoryRoute)
app.use('/api/story', storyRoute)
app.use('/api/chapter', chapterRoute)
app.use('/api/auth', authRoute)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
});
