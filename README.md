# 📂 Bulk Data Uploader

A full-stack MERN-style application to upload, preview, and download CSV/Excel files with Redis-based caching and Tailwind-styled UI.

## 🌐 Live URLs
- Frontend: (https://bulk-data-uploader-bay.vercel.app/) (https://bulk-data-uploader-bay.vercel.app/)
- Backend: ([(https://bulk-data-uploader-backend-vh9z.onrender.com)](https://bulk-data-uploader-backend-vh9z.onrender.com))

## ⚙️ Tech Stack
- Frontend: React.js, Tailwind CSS, Axios
- Backend: Node.js, Express.js, Redis (Upstash)
- Deployment: Vercel (frontend), Render (backend)

## 📁 Features
- File Upload (CSV/XLSX)
- Progress bar + toast notifications
- Uploaded data table preview
- CSV Download
- Dark Mode toggle
- File history listing
- Redis caching support

## 🚀 Getting Started
### 1. Clone the repo
git clone https://github.com/piyushguptaofficial/bulk-data-uploader.git


### 2. Run backend

cd backend
npm install
npm start

## 3. Run frontend

cd frontend
npm install
npm start

📹 Demo
Check out the full video walkthrough on YouTube

🧠 Learnings
Redis caching integration

Handling large CSVs

React state + Tailwind styling

### ✅ 2. Live Deployments

#### a. Frontend: Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Import GitHub repo
3. Set root directory: `frontend`
4. Framework: `React`
5. Deploy

#### b. Backend: Render
1. Go to [https://dashboard.render.com](https://dashboard.render.com)
2. New Web Service → Connect your repo
3. Root directory: `backend`
4. Add environment variable:
   - `REDIS_URL=rediss://...`
5. Deploy

---

### ✅ 3. Demo Video (Upload to YouTube)

1. Record screen using OBS / Screen Recorder.
2. Max 5 minutes.
3. Talk about:
   - Project overview
   - Feature walkthrough
   - Key logic (upload, Redis, download)
   - Dark mode, toast, etc.

**Title Suggestion:**  
`Bulk Data Uploader - Full Stack App Demo (React + Node + Redis)`

---

### ✅ 4. Documentation (PDF or Markdown)

Create a file `documentation.pdf` or `documentation.md` with these:

#### a. Problem Understanding:
> Create an efficient way to upload and handle large CSV/Excel files with preview, download, and cache support.

#### b. Architecture + Tech Stack:
> React frontend + Node/Express backend with Redis (Upstash) caching. Tailwind for styling.

#### c. Development Approach:
> Step-by-step module building:
> - Upload → Show table → Download → Redis integration → Toasts → Responsive design

#### d. Challenges:
- Redis integration
- Parsing large CSVs
- Deploying on Render with environment vars

#### e. Learnings:
- State management in React
- Redis connection handling
- UI/UX improvements

---

### 🛠 Final GitHub Push
If you haven’t yet:
```bash
git add .
git commit -m "Final commit for submission 🚀"
git push origin main


