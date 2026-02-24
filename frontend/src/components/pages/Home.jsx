import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/cars")
      .then(res => setCars(res.data));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Available Cars
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {cars.filter(car => car.available).map(car => (
          <div
            key={car._id}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold">{car.name}</h3>
            <p className="text-gray-600">{car.brand}</p>
            <p className="text-blue-600 font-bold mt-2">
              ${car.pricePerDay} / day
            </p>

            <Link
              to={`/book/${car._id}`}
              className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700"
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;