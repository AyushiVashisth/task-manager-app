import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header = React.memo(() => {
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Task Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay organized and productive
        </p>
      </div>
      <ThemeToggle />
    </header>
  );
});

Header.displayName = "Header";

export default Header;
