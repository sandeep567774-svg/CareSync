# CareSync 🏥

CareSync is a sleek, modern healthcare management platform built with React and Tailwind CSS. It provides tailored, dynamic dashboards for patients, doctors, and system administrators, streamlining the process of booking appointments, managing schedules, and overseeing user accounts.

## ✨ Features

### 🔐 Role-Based Access Control
- **Patient Portal**: Patients can securely log in (via email and phone number), search for doctors, and book appointments via a clean, interactive booking modal.
- **Doctor Dashboard**: Doctors can monitor their daily schedule, view real-time patient statistics, and mark appointments as "Completed" or "Cancelled".
- **Admin Panel**: Administrators have top-level access to view system-wide statistics and manage active users and credentials.

### 🌓 Global Dark Mode
A seamlessly integrated Dark Mode that works across the entire application. Controlled purely via the user settings dashboard with ultra-smooth transition animations to reduce eye strain, entirely overriding default OS behaviors for strict user control.

### 📅 Dynamic Appointment State
The application utilizes centralized React state to ensure that an appointment booked by a patient immediately reflects on the doctor's schedule, providing a robust simulation of a real-time healthcare platform.

## 🛠️ Technology Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite v8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Deployment**: GitHub Pages

## 🚀 Getting Started (Local Development)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sandeep567774-svg/CareSync.git
   ```
2. Navigate to the project directory:
   ```bash
   cd CareSync
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the provided local URL (typically `http://localhost:5173/`).

## 🔑 Demo Login Credentials

To explore the different role-based views, use the following credentials on the Landing Page:

**Patient:**
- Email: Any email works!
- Password: Any password works!
- Phone: Any phone number works!

**Doctor:**
- Email: `Doc1@gmail.com`
- Password: `DOC1`
*(Note: Doc2 and Doc3 also work with their respective passwords)*

**Admin:**
- Email: `Admin@gmail.com`
- Password: `Admin@CareSync`

## 📦 Deployment
This project is configured to be easily deployed to GitHub pages via the built-in npm deploy script:
```bash
npm run deploy
```

---
*Built with ❤️ for modern healthcare systems.*
