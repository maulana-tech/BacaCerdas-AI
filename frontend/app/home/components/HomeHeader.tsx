"use client";

interface HomeHeaderProps {
  userName: string;
}

export default function HomeHeader({ userName }: HomeHeaderProps) {
  return (
    <header className="bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-800">Hai, {userName}</h1>
        <p className="text-gray-600 mt-1">Apa yang ingin kamu baca hari ini?</p>
      </div>
    </header>
  );
}