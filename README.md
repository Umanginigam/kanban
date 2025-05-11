<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<!--     <title>Kanban Board</title> -->
</head>

<body>
    <h1>Kanban Board</h1>
    <p>A Kanban board built with <strong>React</strong>, <strong>TypeScript</strong>, <strong>React Beautiful DnD</strong>, <strong>Framer Motion</strong>, and <strong>Tailwind CSS</strong>. This project allows users to organize tasks across multiple columns (To Do, In Progress, Done) with drag-and-drop functionality. Users can add, edit, and move tasks between columns in a visual and intuitive interface.</p>

  <h2>Features</h2>
    <ul>
        <li><strong>Drag and Drop Tasks</strong>: Tasks can be easily dragged from one column to another.</li>
        <li><strong>Task Management</strong>: Users can add new tasks, edit existing tasks, and move tasks across columns.</li>
        <li><strong>Responsive UI</strong>: The Kanban board is fully responsive and works well on both mobile and desktop devices.</li>
        <li><strong>Modal for Task Management</strong>: The task modal allows users to add and edit tasks, including setting the task title, description, and creation date.</li>
        <li><strong>User-Friendly Design</strong>: Simple and clean user interface with smooth animations for task transitions.</li>
    </ul>

  <h2>Technologies Used</h2>
    <ul>
        <li><strong>React</strong>: JavaScript library for building the user interface.</li>
        <li><strong>TypeScript</strong>: Typed superset of JavaScript for better code quality and maintainability.</li>
        <li><strong>React Beautiful DnD</strong>: Drag and drop functionality for React components.</li>
        <li><strong>Framer Motion</strong>: Library for animations in React.</li>
        <li><strong>Tailwind CSS</strong>: Utility-first CSS framework for rapid UI development.</li>
        <li><strong>Vite</strong>: Next-generation, fast build tool for modern web applications.</li>
    </ul>

   <h2>Installation</h2>
    <p>Follow these steps to get the project up and running locally.</p>

  h3>Prerequisites</h3>
    <p>Make sure you have the following installed on your machine:</p>
    <ul>
        <li>Node.js (version 14 or above)</li>
        <li>npm or yarn</li>
    </ul>

  <h3>Steps to Run</h3>
    <ol>
        <li>Clone this repository:
            <pre><code>git clone https://github.com/umanginigam/kanban-board.git
        </li>
        <li>Navigate to the project folder:
            <pre><code>cd kanban-board</code></pre>
        </li>
        <li>Install the dependencies:
            <pre><code>npm install</code></pre>
            <p>or if you prefer Yarn:</p>
            <pre><code>yarn install</code></pre>
        </li>
        <li>Run the development server:
            <pre><code>npm start</code></pre>
        </li>
        <li>Open your browser and go to <a href="http://localhost:3000">http://localhost:3000</a> to see the Kanban board in action.</li>
    </ol>

  <h2>Usage</h2>
    <ul>
        <li><strong>Columns</strong>: There are three main columns: <strong>To Do</strong>, <strong>In Progress</strong>, and <strong>Done</strong>.</li>
        <li><strong>Adding Tasks</strong>: Click the "+ Add Task" button to add a new task to any of the columns.</li>
        <li><strong>Editing Tasks</strong>: Click on any task to edit it (e.g., change the title, description, or other details).</li>
        <li><strong>Drag and Drop</strong>: Drag tasks from one column to another to update their status (e.g., move tasks from <strong>To Do</strong> to <strong>In Progress</strong>).</li>
    </ul>


  <h2>Contributing</h2>
    <p>If you'd like to contribute to the project, feel free to open a pull request. Here are some ways you can help:</p>
    <ul>
        <li>Fixing bugs or issues</li>
        <li>Improving the UI/UX design</li>
        <li>Adding more features (e.g., task priority, due dates, etc.)</li>
    </ul>
    <h3>Steps to Contribute</h3>
    <ol>
        <li>Fork the repository.</li>
        <li>Create a new branch (<code>git checkout -b feature/your-feature-name</code>).</li>
        <li>Make your changes and commit them (<code>git commit -am 'Add new feature'</code>).</li>
        <li>Push to the branch (<code>git push origin feature/your-feature-name</code>).</li>
        <li>Open a pull request.</li>
    </ol>

  <h2>License</h2>
    <p>This project is open-source and available under the <a href="LICENSE">MIT License</a>.</p>
</body>

</html>
