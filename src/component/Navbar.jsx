import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md w-full">
      <div className="w-full flex justify-between items-center bg-white px-6 py-4">
        {/* Clickable Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-700 tracking-wide drop-shadow-sm cursor-pointer"
        >
          MoneyMapr
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/newcar")}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            New car
          </button>
          <button
            onClick={() => navigate("/cicalculator")}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            SmartCalc
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
