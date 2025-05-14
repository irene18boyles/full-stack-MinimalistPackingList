import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="text-white flex flex-col justify-center">
      <header>
        <h1 className="font-bold">Minimalist Packing List</h1>
        <p className="mt-2 text-lg text-gray-400">Pack smarter, travel lighter.</p>
      </header>

      <main className="max-w-4xl mt-4">
        <section className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">Why Use This App?</h2>
          <p className="mt-3 text-gray-300">
            The Minimalist Packing List app helps you create and manage efficient packing lists,
            ensuring you bring only what’s necessary.
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">✔ Create & Manage Lists</h3>
            <p className="text-gray-400 mt-2">Easily add, edit, and remove packing lists for your trips.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">✔ Categorize Items</h3>
            <p className="text-gray-400 mt-2">Sort your essentials into categories like Clothes, Toiletries, and Tech.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">✔ Check Off Packed Items</h3>
            <p className="text-gray-400 mt-2">Track your progress by marking packed items.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">✔ Lightweight & Responsive</h3>
            <p className="text-gray-400 mt-2">Designed for simplicity and ease of use across all devices.</p>
          </div>
        </section>

        <section className="mt-5">
          <Link to="/auth">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600">
              Get Started
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
