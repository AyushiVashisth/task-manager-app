<h1 align="center">📝 Advanced Task Manager App 📝</h1>

<br/>

<h3 align="justify" width="80%">
A modern, feature-rich Task Manager application built with React that helps you organise and manage your daily tasks efficiently. This app includes advanced features like dark/light mode theming, drag-and-drop functionality, local storage persistence, and performance optimisations. The application demonstrates best practices in React development, including the use of custom hooks, the Context API, and responsive design principles.
</h3>

<br/>

### Project Deployment
👉 [Live Demo](https://task-manager-app-two-mauve.vercel.app/)
👉 [Tech Assignment.pdf](https://github.com/user-attachments/files/21029405/Tech.Assignment.-.LimeTray.pdf)

<br/>

<h2 align="left">
<img src="https://art.pixilart.com/486745d4bb1ef18.gif"  width="20" height="20" align="center">
 Technologies Used
<img src="https://art.pixilart.com/486745d4bb1ef18.gif"  width="20" height="20" align="center">
</h2>

<div align="center">
 
 <div align="center"><h3 align="center">Frontend</h3>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"  align="center" alt="reactjs" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"  align="center" alt="javascript" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"  align="center" alt="css3" />
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"  align="center" alt="html5" />
</div>

<div align="center"><h3 align="center">Libraries & Tools</h3> 
<img src="https://img.shields.io/badge/React_Beautiful_DnD-FF6B6B?style=for-the-badge&logo=react&logoColor=white" align="center" alt="react-beautiful-dnd"/>
<img src="https://img.shields.io/badge/Local_Storage-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white"  align="center" alt="localstorage"/>
<img src="https://img.shields.io/badge/Context_API-61DAFB?style=for-the-badge&logo=react&logoColor=black"  align="center" alt="context-api"/>
<img src="https://img.shields.io/badge/Custom_Hooks-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" align="center" alt="hooks"/>
</div>

<div align="center"><h3 align="center">Development Tools</h3>
<img src="https://img.shields.io/badge/Vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" align="center" alt="vercel"/>
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"  align="center" alt="github"/>
<img src ="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white" align="center" alt="npm">
<img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white" align="center" alt="vscode"/>
</div>
</div>

<div align="center"><h3 align="center">Deployed On:</h3>
  <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"  alt="vercel"/>
</div>

<br/>

# ✨ Features

## 🎯 Core Functionality
- **Task Management**: Add, edit, delete, and mark tasks as completed
- **Smart Filtering**: Filter tasks by All, Completed, or Pending status
- **Data Persistence**: Tasks are automatically saved to Local Storage
- **Form Validation**: Prevents adding empty or invalid tasks

## 🚀 Advanced Features
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Drag & Drop**: Reorder tasks using intuitive drag-and-drop interface
- **Responsive Design**: Mobile-first approach ensuring perfect experience on all devices
- **Smooth Animations**: CSS transitions for adding, removing, and updating tasks
- **Performance Optimized**: Uses React.memo, useCallback, and useMemo for optimal performance

## 🔧 Technical Implementation
- **Custom Hooks**: `useLocalStorage` hook for efficient local storage operations
- **Context API**: Centralised state management without prop drilling
- **Modern React Patterns**: Functional components with hooks
- **Clean Architecture**: Modular and maintainable code structure

<br/>

# 📱 Screenshots

## Light Mode
![Light Mode Screenshot](https://github.com/user-attachments/assets/979334dd-7461-470a-a819-29da84be5335)

## Dark Mode
![Dark Mode Screenshot](https://github.com/user-attachments/assets/fa74966a-d923-48f3-a1f0-40d470f3dbdd)

## Mobile Responsive
![Mobile Screenshot](https://github.com/user-attachments/assets/95ea4a9c-39cc-48ae-824d-e4cb953b4073)
![Mobile Screenshot](https://github.com/user-attachments/assets/2fa531c0-a749-4c3c-a5ca-1c39a7f48fe9)


## Drag & Drop in Action
![Drag Drop Screenshots](https://github.com/user-attachments/assets/3d626b6d-a143-4e83-aace-21b99e400e28)
![Drag Drop Screenshots](https://github.com/user-attachments/assets/3db2b0d9-eae7-494c-b039-07829ef966dc)


<br/>

# 🛠️ Setup Instructions

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser

## Installation

1. Clone the repository to your local machine:
   ```sh
   git clone https://github.com/your-username/task-manager-app.git
   ```

2. Navigate to the project directory:
   ```sh
   cd task-manager-app
   ```

3. Install the required dependencies:
   ```sh
   npm install
   ```

4. Start the development server:
   ```sh
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to use the Task Manager.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

<br/>

# 📂 Project Structure

```
task-manager-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── TaskFilter.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskList.jsx
│   │   └── ThemeToggle.jsx
│   ├── context/
│   │   └── TaskContext.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useTheme.js
│   ├── styles/
│   │   ├── App.css
│   │   ├── components.css
│   │   └── animations.css
│   ├── utils/
│   │   └── taskUtils.js
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── package.json
└── README.md
```

<br/>

# 🎨 Key Features Breakdown

## Custom Hooks
- **useLocalStorage**: Handles all local storage operations with automatic JSON parsing/stringifying
- **useTheme**: Manages theme state and preferences

## Performance Optimisations
- **React.memo**: Prevents unnecessary re-renders of task components
- **useCallback**: Memoises event handlers to prevent child re-renders
- **useMemo**: Optimizes expensive filtering operations

## Responsive Design
- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly interface elements
- Adaptive typography and spacing

## Animations & Transitions
- Smooth task addition/removal animations
- Theme transition effects
- Hover and focus states
- Loading states with skeleton screens

<br/>

# 🚀 Deployment

This project can be easily deployed on various platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy with automatic builds on push

<br/>

# 🙏 Acknowledgments

- React team for the amazing framework
- react-beautiful-dnd for drag and drop functionality
- All the open-source contributors who made this project possible

<br/>

## Show your support

Give a ⭐️ if you like this project!

<h1 align="center">✨ Happy Task Managing! ✨</h1>
