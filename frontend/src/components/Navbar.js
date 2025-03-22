import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex-shrink-0">
            <Link to="/tasks" className="text-2xl font-bold">
              Minhas Tarefas
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex space-x-4">
            <Link
              to="/tasks"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
            >
              Tarefas
            </Link>
            <Link
              to="/create"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
            >
              Adicionar Tarefa
            </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/tasks"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
            >
              Tarefas
            </Link>
            <Link
              to="/create"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
            >
              Adicionar Tarefa
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;