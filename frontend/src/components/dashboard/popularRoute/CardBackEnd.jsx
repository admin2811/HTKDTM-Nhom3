
import { useNavigate } from "react-router-dom";
import img_backend from "../../../assets/img/img_backend.png";
import PropTypes from 'prop-types';

function CardBackend({ name, title, icons ,navigateTo}) {
    const navigate = useNavigate(); // Tạo đối tượng navigate
  
    return (
      <div className="max-w-lg mx-auto border-2 border-gray-300 shadow-xl rounded-3xl overflow-hidden p-6">
        <div className="flex items-center">
          {/* Title and image */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-600 mt-3">{title}</p>
          </div>
  
          {/* Image */}
          <div className="ml-6">
            <img src={img_backend} alt="Backend" className="w-28 h-28 object-cover rounded-md"/>
          </div>
        </div>
  
        {/* Icons */}
        <div className="flex justify-center space-x-2 mt-6">
          {icons.map((icon, index) => (
            <button
              key={index}
              className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
              onClick={() => window.open(icon.link, "_blank")}
              title={icon.text}
            >
              <i className={`${icon.icon} text-2xl`}></i>
            </button>
          ))}
        </div>
  
        {/* Button */}
        <div className="mt-8 text-center">
          <button
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
            onClick={() => navigate(navigateTo)} // Điều hướng đến đường dẫn
          >
            Xem chi tiết lộ trình
          </button>
        </div>
      </div>
    );
}
  CardBackend.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icons: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })).isRequired,
    navigateTo: PropTypes.string.isRequired,
  };

export default CardBackend;