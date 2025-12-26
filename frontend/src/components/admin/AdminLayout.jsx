import { Link, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">COOLIE Admin</h2>

        <nav className="space-y-2">
          <Link to="/admin" className="block hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/admin/workers" className="block hover:text-gray-300">
            Workers
          </Link>
        </nav>

        <button
          onClick={logout}
          className="mt-6 bg-red-600 px-3 py-2 rounded w-full"
        >
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
