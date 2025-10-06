import React, { useState } from 'react';

// Main App Component for Web
export default function App() {
  // State for the list of tasks
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Read a book', completed: false },
    { id: 2, text: 'Write some code', completed: true },
    { id: 3, text: 'Go for a run', completed: false },
  ]);

  // State for the text input
  const [inputText, setInputText] = useState('');

  // --- Handlers ---

  // Function to add a new task
  const handleAddTask = () => {
    if (inputText.trim() === '') {
      // Don't add empty tasks
      return;
    }
    const newTask = {
      id: Date.now(), // Use timestamp for a unique ID
      text: inputText.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputText(''); // Clear the input field
  };

  // Function to toggle a task's completed status
  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // --- Render Component ---
  return (
    <div className="bg-gray-100 min-h-screen font-sans flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 text-center">To-Do List</h1>
        </div>

        {/* Input Area */}
        <div className="flex flex-row gap-2 mb-6">
          <input
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            placeholder="Add a new task..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <button
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 active:scale-95 transition-all duration-200"
            onClick={handleAddTask}>
            Add
          </button>
        </div>

        {/* Task List */}
        <div>
          {tasks.length > 0 ? (
            tasks.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 mb-3 bg-white rounded-lg shadow-sm transition-all duration-200 ease-in-out">
                <div
                  className="flex-1 flex items-center cursor-pointer"
                  onClick={() => handleToggleTask(item.id)}>
                  <div
                    className={`w-6 h-6 mr-4 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                      item.completed
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`}>
                    {item.completed && (
                      <span className="text-white text-sm font-bold">✓</span>
                    )}
                  </div>
                  <p
                    className={`text-gray-700 transition-colors duration-200 ${
                      item.completed ? 'line-through text-gray-400' : ''
                    }`}>
                    {item.text}
                  </p>
                </div>
                <button
                  className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
                  onClick={() => handleDeleteTask(item.id)}>
                  <span className="text-red-500 text-lg">✕</span>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No tasks yet. Add one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}