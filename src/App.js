import React from "react";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Header />
      </div>
    </div>
  );
}

export default App;
