import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const cardClasses = darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900';

  return (
    <header className={`${cardClasses} shadow-sm`}>
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Where in the world?</h1>
        <button onClick={toggleDarkMode} className="flex items-center space-x-2 hover:opacity-75">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span>Dark Mode</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
