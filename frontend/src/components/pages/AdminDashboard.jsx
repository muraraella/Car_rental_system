import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔐 Protect Route
  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
    } else {
      fetchCars();
    }
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/cars");
      setCars(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ➕ Add or Update Car
  const addOrUpdateCar = async () => {
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5001/api/cars/${editingId}`,
          form,
          {
            headers: { Authorization: token },
          }
        );
        setEditingId(null);
      } else {
        await axios.post(
          "http://localhost:5001/api/cars",
          form,
          {
            headers: { Authorization: token },
          }
        );
      }

      setForm({});
      fetchCars();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  // 🗑 Delete Car
  const deleteCar = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5001/api/cars/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      fetchCars();
    } catch (error) {
      console.error(error);
    }
  };

  // ✏️ Edit Car
  const editCar = (car) => {
    setForm({
      name: car.name,
      brand: car.brand,
      pricePerDay: car.pricePerDay,
      available: car.available,
    });
    setEditingId(car._id);
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <div className="p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          Admin Dashboard
        </h2>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* FORM */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Car" : "Add New Car"}
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            value={form.name || ""}
            placeholder="Car Name"
            className="border p-3 rounded-lg"
            onChange={e =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <input
            value={form.brand || ""}
            placeholder="Brand"
            className="border p-3 rounded-lg"
            onChange={e =>
              setForm({ ...form, brand: e.target.value })
            }
          />
          <input
            value={form.pricePerDay || ""}
            placeholder="Price Per Day"
            className="border p-3 rounded-lg"
            onChange={e =>
              setForm({ ...form, pricePerDay: e.target.value })
            }
          />
        </div>

        <button
          onClick={addOrUpdateCar}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {editingId ? "Update Car" : "Add Car"}
        </button>
      </div>

      {/* CAR LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {cars.map(car => (
          <div
            key={car._id}
            className="bg-white shadow-md rounded-xl p-5"
          >
            <h3 className="font-semibold text-lg">
              {car.name}
            </h3>

            <p>{car.brand}</p>

            <p className="text-blue-600 font-bold">
              ${car.pricePerDay}
            </p>

            <p className={car.available ? "text-green-600" : "text-red-600"}>
              {car.available ? "Available" : "Booked"}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => editCar(car)}
                className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => deleteCar(car._id)}
                className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminDashboard;