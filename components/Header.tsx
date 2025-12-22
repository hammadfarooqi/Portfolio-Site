"use client";

interface HeaderProps {
  onTitleClick: () => void;
}

export default function Header({ onTitleClick }: HeaderProps) {
  return (
    <div className="absolute left-8 top-20 z-20">
      {/* Title - clickable */}
      <h1
        className="text-5xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-gray-900 transition-colors data-clickable"
        data-clickable="true"
        onClick={onTitleClick}
      >
        Hammad Farooqi
      </h1>
      
      {/* Subtitle */}
      <p className="text-sm text-gray-500 mb-6">Princeton '27 Undergrad</p>
      
      {/* Links */}
      <div className="flex flex-col gap-2">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors underline"
          data-clickable="true"
        >
          Resume
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors underline"
          data-clickable="true"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors underline"
          data-clickable="true"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

