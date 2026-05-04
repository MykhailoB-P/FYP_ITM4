<div align="center">
  <h2 style="color: #FF0000; font-weight: 900;">⚠️ EARLY PROTOTYPE BUILD ⚠️</h2>
  <p style="color: #FF0000; font-weight: bold;">This is a proof-of-concept build created to demonstrate the core idea, mechanics, and design expression. It is not a final production release.</p>
</div>

# SecuLab 🛡️

**Cybersecurity Training Platform**

SecuLab is a web platform for learning cybersecurity. Instead of just reading theory, students can practice hacking and defending in safe, interactive scenarios right in their browser.

## 🚀 Key Features

- **Interactive Scenarios:** 6 playable hacking missions, including OSINT, Port Scanning, SQL Injection, Brute Force, and Phishing Analysis.
- **XP & Gamification:** Users earn XP points when they answer quizzes or finish missions. The system remembers completed tasks to stop users from cheating for points.
- **Live Leaderboard:** A ranking page that updates instantly without refreshing the page. It highlights your name so you can easily find your rank.
- **Hacker Design:** A cool, minimalist "hacker" style. It features an animated cyber background and a clean black-and-white terminal look.
- **Fast & Smooth:** The website updates your XP and profile instantly when you play, without needing to reload the page.

## 💻 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Supabase (Database, Auth, and Real-time updates)

## 🛠️ Getting Started

### What you need

- Node.js 18 or newer
- A Supabase Project (with Database and Auth turned on)

### Installation

1. **Download the code**

   ```bash
   git clone <your-repo-url>
   cd <your-project-folder>
   ```

2. **Install packages**

   ```bash
   npm install
   ```

3. **Set up database keys**
   Create a `.env.local` file in the main folder and add your Supabase keys:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the project**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎓 About This Project

This is a Final Year College Project. It shows my expression of idea of cybersecurity education platform
