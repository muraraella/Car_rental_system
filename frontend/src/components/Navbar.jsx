import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">CarRental</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-600 font-medium">Home</Link>
        <Link to="/admin-login" className="hover:text-blue-600 font-medium">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;