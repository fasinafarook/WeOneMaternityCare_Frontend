import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen flex items-center justify-center">
      <div className="py-12 px-6 mx-auto max-w-screen-lg text-center rounded-lg shadow-lg bg-white/90 backdrop-blur-md">
        <h1 className="mb-4 text-8xl tracking-tight font-extrabold text-red-600 lg:text-9xl">
          404
        </h1>
        <p className="mb-4 text-3xl font-bold text-blue-900 lg:text-4xl">
          Oops! Page Not Found
        </p>
        <p className="mb-6 text-lg font-light text-gray-600">
          We're sorry, but the page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
