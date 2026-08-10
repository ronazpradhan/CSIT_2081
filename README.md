# 🎓 2081 BSc. CSIT Platform

The 2081 BSc. CSIT Platform is a fast, offline-capable web application designed to track and provide study materials, classroom routines, exam schedules, and utility tools for the BSc. CSIT 2081 batch.

**Important Note:** This repository contains the source code for the public-facing platform built specifically for the 2081 batch. 

The main idea behind this project is to make academic resource tracking fast, clean, and easily accessible without forcing students to jump through multiple Google Drive links or scattered messages.

This platform is PWA-enabled (Progressive Web App) and privacy-focused, ensuring students can access saved routines and materials even when offline.

**Live preview:** [https://github.com/ronazpradhan/CSIT_2081](https://github.com/ronazpradhan/CSIT_2081) *(Update with your live Vercel/Netlify link once deployed)*

## 🛠️ Technologies
- React
- Next.js
- TypeScript
- Material UI (MUI)
- SCSS
- PWA (Progressive Web App)

## ✨ Features
Here’s what you can do with the 2081 BSc. CSIT Platform:
- View and download semester-wise study materials, notes, and syllabus links
- Track your daily Class Routine and upcoming Exam Routines
- Quickly generate customized Assignment Front Pages in `.docx` format
- Use the app offline once loaded (PWA support)
- Navigate through a clean, modern, and responsive mobile-first interface
- Access important files like the Stats II table easily

## ⚙️ The Process
I started this project with the goal of building a centralized hub for our new 2081 batch so we actually have all our resources in one place.

Most class groups get messy with links scattered across Messenger, Discord, or WhatsApp. So, I focused on making a platform that is simple, fast, and always reliable.

The app was planned as a web platform where users can quickly check their routines and get their assignment covers ready. It uses Next.js and Material UI to keep the experience smooth and app-like.

After adapting the base from a previous batch's open-source project, I worked on cleaning up the codebase, removing unused legacy components, updating the titles, and tailoring the resources strictly for the 2081 batch.

## 📚 What I Learned
While building and adapting this project, I learned more about:
- Building modern web apps with React and Next.js
- Cleaning up and refactoring legacy codebases
- Using Material UI (MUI) for responsive and fast component design
- Generating and handling `.docx` files on the client-side
- Configuring Progressive Web Apps (PWA) through `manifest.json`
- Managing Git histories and completely resetting repository branches

## 🌱 Overall Growth
This project helped me understand how a real platform is maintained, adapted, and improved for a new set of users.

I learned that good apps do not always need too many features. Sometimes the best experience comes from keeping things simple, fast, and exactly what the students need.

This platform also helped me improve my confidence in React development, project cleanup, and GitHub repository management.

## 🚀 How Can It Be Improved?
In the future, this project can be improved by adding:
- Dynamic CMS (Content Management System) to update routines without editing code
- Push notifications for upcoming exams or assignment deadlines
- Dark mode toggle
- CGPA/SGPA Calculator
- Student discussion or notice board

## ▶️ Using the App
To run the platform locally on your machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/ronazpradhan/CSIT_2081.git
   ```
2. Navigate to the project directory:
   ```bash
   cd CSIT_2081
   ```
3. Install the dependencies (using npm, yarn, or bun):
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the platform.
