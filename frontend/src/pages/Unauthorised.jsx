import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      <p className="mb-4">You do not have permission to view this page.</p>
      <Link to="/" className="text-blue-600">
        Go back home
      </Link>
    </div>
  );
};

export default Unauthorized;
