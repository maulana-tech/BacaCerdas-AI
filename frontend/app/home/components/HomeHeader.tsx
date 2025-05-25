"use client";

interface HomeHeaderProps {
  userName: string;
}

export default function HomeHeader({ userName }: HomeHeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">Hai, {userName}</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">Apa yang ingin kamu baca hari ini?</p>
      </div>
    </header>
  );
}