# 🩸 Blood Management & Donation Portal (Frontend)

A modern, high-performance, and responsive healthcare web application built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Firebase Authentication**. This platform seamlessly connects emergency blood seekers with verified voluntary donors and hospital blood banks in real time.

---

## 🌟 Key Features

### 1. 🏥 Public & Emergency Services
- **Quick Blood Finder:** Instant search filter by blood group (`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`) and geographic district.
- **Interactive Blood Compatibility Matrix:** Visual donor-recipient compatibility chart for quick medical reference.
- **Awareness & Guidelines:** Comprehensive donation eligibility checklist, myths vs. facts, and safety protocols.
- **Emergency Helpline & Quick Connect:** Direct one-click phone dialer for critical cases.

### 2. 👤 Donor Experience
- **Smart Cooldown Tracker:** Automated 90-day countdown timer after every successful donation.
- **Real-time Availability Status:** Toggle standby availability (`Available` vs `Unavailable`) and mark emergency radius.
- **Matched Request Notifications:** Instant notifications whenever an urgent request matches the donor's blood type and location.
- **Donation History & Milestones:** Audit log of past donations with life-saver milestones.

### 3. 🆘 Patient / Requestor Experience
- **Multi-Level Emergency Blood Requests:** Create requests tagged with urgency levels (`Normal`, `High`, `Critical`).
- **Real-Time Response Tracking:** Track responding donors, view contact details, and confirm attendance.
- **Request Lifecycle Management:** Close, edit, or mark requests as fulfilled upon successful donation.

### 4. 🛡️ Admin Control Panel
- **Donor Verification Portal:** Identity validation and one-click verification for new donors before public directory listing.
- **Request Moderation:** Approve, review, or reject emergency blood requests.
- **System Analytics:** Live overview of registered donors, active emergency calls, and fulfilled donations.
- **Audit Logs:** Full historical audit record of completed donations.

---

## 🛠️ Technology Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [DaisyUI v5](https://daisyui.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Authentication:** [Firebase Authentication](https://firebase.google.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Hosting:** [Firebase Hosting](https://firebase.google.com/docs/hosting)

---

## 📂 Project Structure

```text
Blood-Management-System-Frontend/
├── public/                  # Static assets & favicon
├── src/
│   ├── api/                 # Centralized Axios API instances & service functions
│   ├── assets/              # SVGs and UI media
│   ├── layouts/             # Responsive Layout wrappers
│   │   ├── HomeLayout.jsx       # Public glassmorphic navbar & brand footer
│   │   ├── AuthLayout.jsx       # Split-card auth wrapper with glows
│   │   ├── DashboardLayout.jsx  # User & Donor sidebar navigation
│   │   └── AdminLayout.jsx      # Dark slate control panel shell
│   ├── pages/               # Application route views
│   │   ├── Home.jsx             # Hero, finder, workflow, matrix, FAQ
│   │   ├── Awareness.jsx        # Eligibility, myths vs facts
│   │   ├── Login.jsx            # Secure credential & social login
│   │   ├── Register.jsx         # Role-based onboarding (Donor / Patient)
│   │   ├── DashboardHome.jsx    # Role-adaptive analytics & cooldown widget
│   │   ├── SearchDonors.jsx     # Filterable donor directory
│   │   ├── RequestBlood.jsx     # Emergency blood posting form
│   │   ├── MyRequests.jsx       # Patient request management table
│   │   ├── RequestDetail.jsx    # Moderation & donor response details
│   │   ├── DonorProfile.jsx     # Donor profile editor & cooldown warning
│   │   ├── DonorAvailability.jsx# Real-time donation availability switches
│   │   ├── DonorNotifications.jsx# Matching request feeds
│   │   ├── DonorUpcomingBooking.jsx# Active commitment view
│   │   ├── DonorDonationHistory.jsx# Personal donation log
│   │   ├── AdminDashboard.jsx   # Administrative overview & statistics
│   │   ├── AdminDonors.jsx      # Donor verification board
│   │   ├── AdminRequests.jsx    # Request moderation board
│   │   ├── AdminDonationHistory.jsx# Global donation logs
│   │   └── ErrorPage.jsx        # Polished 404 error page
│   ├── provider/            # Firebase AuthContext & PrivateRoute guards
│   ├── routes/              # Centralized route definitions
│   ├── index.css            # Tailwind CSS & theme tokens
│   └── main.jsx             # React DOM entry point
├── firebase.json            # Firebase Hosting configuration
├── vite.config.js           # Vite build pipeline & plugins
└── package.json             # Scripts & dependencies
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**

### 2. Installation

Clone the repository and install dependencies:

```bash
cd Blood-Management-System-Frontend
npm install
```

### 3. Environment Setup

Create a `.env` file in the root of `Blood-Management-System-Frontend`:

```env
# Backend API URL
VITE_API_URL=https://blood-donation-nu-steel.vercel.app/api

# Firebase Web App Credentials
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Running Locally

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### 5. Production Build & Deployment

Build the production bundle:

```bash
npm run build
```

Deploy directly to **Firebase Hosting**:

```bash
firebase deploy
```

---

## 🔒 Security & Privacy
- Sensitive credentials and tokens are managed securely via Firebase and HTTP interceptors.
- Role-based routing guards prevent unauthorized access to Admin and User routes.
- Donor contact numbers are masked or protected behind verified authorization flows.

---

## 📄 License
This project is licensed under the [ISC License](LICENSE).
