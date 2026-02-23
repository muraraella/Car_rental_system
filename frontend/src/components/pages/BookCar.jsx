import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function BookCar() {
  const { id } = useParams();
  const [form, setForm] = useState({});

  const book = async () => {
    await axios.post("http://localhost:5000/api/bookings", {
      ...form,
      car: id,
    });
    alert("Car booked successfully!");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-xl rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Book Car
        </h2>

        Customer's Name
        <input
          placeholder="Your Name"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={e => setForm({...form, customerName: e.target.value})}
        />
         
        StartDate
        <input
          type="date"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={e => setForm({...form, startDate: e.target.value})}
        />
        ReturnDate
        <input
          type="date"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={e => setForm({...form, endDate: e.target.value})}
        />

        <button
          onClick={book}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default BookCar;