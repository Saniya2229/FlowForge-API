
# Job Portal - Profile Management System

A full-stack Job Portal application consisting of **Frontend (React/Next.js)** and **Backend (Node.js + Express + MongoDB)**.  
This project allows users to register, log in, update profiles, manage resumes, and interact with job workflows.

> ⚠️ All sensitive environment variables have been masked.  
> ❌ Node modules and unnecessary system files are excluded.

---

## 📂 Project Structure

```
jobportal_Profile_mng/
│
├── jobportal-frontend/   # Frontend UI (React/Next.js)
└── jobportal-backend/    # Backend API (Node.js + Express + MongoDB)
```

---

# 🚀 Features

### ✅ User Authentication & Profile Management
- User Registration  
- Login / Logout  
- JWT Authentication  
- Profile Update  
- Resume Upload (if included)  

### ✅ Job Portal Core
- User dashboard  
- Profile viewing  
- Edit & Save changes  
- Responsive UI  

---

# 🖥️ Frontend (React / Next.js)

### **📌 Tech Stack**
- React / Next.js  
- Tailwind CSS  
- Axios  
- React Router / Next Router  

### **▶️ How to Run Frontend**
```
cd jobportal-frontend
npm install
npm run dev
```

### **📁 Environment Variables (Frontend)**
Create a file:  
```
jobportal-frontend/.env
```

Inside (example):
```
VITE_BACKEND_URL=https://your_backend_url_here
```

---

# 🛠️ Backend (Node.js + Express)

### **📌 Tech Stack**
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT Authentication  
- Multer (optional for uploads)

### **▶️ How to Run Backend**
```
cd jobportal-backend
npm install
npm run dev
```

---

# 🔑 Backend Environment Variables

Create:
```
jobportal-backend/.env
```

Example values (masked):
```
MONGO_URI=YOUR_MONGO_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
PORT=5000
```

---

# 📦 Required Backend Dependencies

```
npm install express mongoose bcrypt jsonwebtoken cors multer dotenv
```

---

# 📦 Required Frontend Dependencies

```
npm install axios react-router-dom @tanstack/react-query
```

---

# 📝 How the Project Works

1. **User signs up / logs in**  
   Backend validates user → Generates JWT → Returns to frontend  

2. **Frontend stores token**  
   Usually in localStorage or cookies  

3. **User updates profile**  
   Frontend sends authenticated PATCH request → Backend updates MongoDB  

4. **Data is fetched in real-time**  
   Using axios + React Query (if implemented)

5. **Dashboard displays user information**  
   With edit options, resume upload (if included), and UI settings  

---

# 📧 Contact
If you want improvements, backend enhancements, or UI redesigns, feel free to reach out.

---

✨ **Project Ready for GitHub!**
