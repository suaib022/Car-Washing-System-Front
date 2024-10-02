import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-xl">
        Oops! The page you're looking for does not exist.
      </p>
      <div className="mt-6">
        <Link to="/" className="btn btn-primary mr-4">
          Go to Home
        </Link>
        <Link to="/login" className="btn btn-secondary">
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
