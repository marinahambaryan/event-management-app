import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-4">
          Welcome to Event Management App
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Manage your events effortlessly
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-md shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">Create Events</h2>
            <p className="text-gray-700">
              Easily create new events with our user-friendly interface.
            </p>
          </div>
          <div className="bg-white rounded-md shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">Manage Events</h2>
            <p className="text-gray-700">
              View, update, and delete your events with ease.
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Link
            to="/events"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
          >
            Go to Event Management
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
