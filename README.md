📚 DocTruyen – MERN Stack Project

DocTruyen là một hệ thống Web đọc truyện online được xây dựng theo kiến trúc MERN Stack (MongoDB – Express – React – Node.js).
Hệ thống hỗ trợ người dùng đọc truyện, lưu yêu thích, bình luận và có trang quản trị riêng cho admin.

🚀 Live Demo

🌐 Website: https://doctruyen-1.onrender.com

🛠 Admin: https://doctruyen-admin.onrender.com/login-admin

🔑 Demo Account
👤 User Demo
Email: le@gmail.com
Password: 123456

🛠 Admin Demo
Email: doctruyen@gmail.com
Password: 123456

⚠ Đây là tài khoản demo dành cho nhà tuyển dụng và mục đích trải nghiệm hệ thống.

🛠 Công nghệ sử dụng

🔹 Frontend
- React.js
- Redux Toolkit
- TypeScript
- Axios
- React Router
- TailwindCSS

🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Cloudinary (Upload ảnh)

🎯 Tính năng chính

👤 User
- Đăng ký / Đăng nhập (JWT Authentication)
- Đọc truyện theo chương
- Tìm kiếm & lọc truyện theo thể loại
- Thêm vào danh sách yêu thích
- Bình luận & đánh giá truyện
- Cập nhật thông tin cá nhân

🛠 Admin
- CRUD truyện
- CRUD chương
- Quản lý người dùng
- Quản lý bình luận
- Upload ảnh truyện

📦 Cài đặt dự án
1️⃣ Clone Repository
git clone https://github.com/TyLeDuc9/DocTruyen.git
cd DocTruyen
2️⃣ Backend Setup
cd backend
npm install

Tạo file .env

MONGO_URL=your_db
ACCESS_TOKEN_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret_key

Chạy server:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
4️⃣ Admin Setup
cd admin
npm install
npm run dev
🌍 Deploy

- Frontend & Admin: Render
- Backend API: Render
- Database: MongoDB Atlas