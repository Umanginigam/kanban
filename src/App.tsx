import Sidebar from "./components/Sidebar";
import Board from "./components/Board";
import ThemeToggle from "./components/ThemeToggle";
function App() {
  return (
    <div className="flex justify-between items-start h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <Board />
      <ThemeToggle />
    </div>
  );
}

export default App;

