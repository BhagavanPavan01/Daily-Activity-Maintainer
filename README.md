# Daily Activity Maintainer

A beautifully designed, feature-rich React Web Application for tracking daily tasks, managing interview preparation routines, and visualizing your productivity through analytics and a GitHub-style activity contribution graph.

## Features
- **Day Planner**: Manage your daily tasks with complete CRUD operations.
- **Interview Prep Routine**: Track custom repeating preparation routines specifically geared towards interviews.
- **Activity Graph**: View your productivity mapped out dynamically on a 365-day GitHub-style contribution graph.
- **Analytics**: Deep visual insights into your task completion statistics.
- **Global Theme Toggling**: Seamless aesthetic transitions between minimal Light Mode and an elegant Dark Mode ecosystem.
- **Mobile First Accessibility**: Clean, responsive UI spanning mobile phones, tablets, and desktop devices.

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (Version 18+ recommended) installed on your machine.

### How to Run Locally
1. **Install Dependencies**:
   Open a terminal in the project directory and pull in the required packages:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. **Open the App**:
   Navigate to `http://localhost:5173` in your web browser. Vite will dynamically hot-reload the app whenever you save changes to the source code.

### How to Build for Production
To build the app for production, execute:
```bash
npm run build
```
This triggers the Vite compiler to bundle your React application into the `dist` folder. This folder contains optimized CSS, Javascript, and static assets that can be easily hosted on any static cloud server.

### Deployment (Netlify)
This project includes a fully configured `netlify.toml` file. It establishes Single Page Application (SPA) fallback routing, preventing standard `404 Not Found` errors when refreshing secondary URLs.
You simply connect this repository to your Netlify dashboard, and it handles everything out of the box!

---

## User Manual

### 1. The Dashboard
- **Switching Contexts**: Toggle between your standard **Day Planner** and the structured **Interview Prep Routine** using the main tabs.
- **Activity Graph**: Below the Planner, check your progress on the map. The square tiles will dynamically light up in higher intensities depending on how many tasks you accomplish across a given date!
  
### 2. Managing Tasks
- Use the input bar inside the Day Planner to submit new goals. You can easily mark them as complete, edit their names, or completely delete them.
- Any unresolved routines scale seamlessly to track cumulative discipline.

### 3. The Date & Calendar Machine
- Selecting a previous date on the Calendar module instantly updates your Day Planner, Routine list, and data context to reflect the stored historical archive of that specific day. You can review past performance on the fly.
  
### 4. Navigation & Personalization
- Use the **Dashboard** button on the Top Bar to instantly return to your home view.
- Click the **Sun / Moon** icon in the header perfectly adjusts the global aesthetics depending on your environment.
- Access the **User Profile** section in the exact top right corner to oversee account management elements.