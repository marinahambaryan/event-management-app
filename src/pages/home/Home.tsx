import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 py-4">
        <h1 className="text-white text-center text-2xl font-bold">
          Welcome to My Event App
        </h1>
      </header>
      <main className="container mx-auto py-8">
        <div className="flex justify-center">
          <div className="max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
            {/* Render list of upcoming events */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
