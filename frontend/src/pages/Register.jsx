import  { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    field: "",
    language: "",
    target: "",
    level: "",
    time_study: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  // Hàm kiểm tra định dạng email
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường dữ liệu
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Kiểm tra định dạng email
    if (!validateEmail(formData.email)) {
      setErrorMessage("Email không hợp lệ! Vui lòng nhập lại.");
      return;
    }

    try {
      const response = await axios.post("https://serverleaderbroadpostgre.fly.dev/register", formData);
      console.log("Đăng ký thành công:", response.data);
      setErrorMessage("");
      navigate("/login");  // Chuyển hướng sau khi đăng ký thành công
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error.response ? error.response.data : error.message);

      // Hiển thị thông báo lỗi nếu email đã tồn tại
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);  // Lỗi từ backend, như "Tài khoản đã tồn tại!"
      } else {
        setErrorMessage("Lỗi khi đăng ký! Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Đăng Ký
        </h1>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">
            {errorMessage}
          </div>
        )}
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="User Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          {/* Lĩnh vực */}
          <div className="mb-4">
            <label htmlFor="field" className="block text-gray-700 font-semibold mb-2">
              Lĩnh vực:
            </label>
            <div className="relative">
              <select
                id="field"
                name="field"
                value={formData.field}
                onChange={handleChange}
                className="appearance-none border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                required
              >
                <option value="" disabled>
                  Chọn lĩnh vực
                </option>
                <option value="web">Web</option>
                <option value="app">App</option>
                <option value="ai">AI</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Ngôn ngữ */}
          <div className="mb-4">
            <label htmlFor="language" className="block text-gray-700 font-semibold mb-2">
              Ngôn ngữ:
            </label>
            <div className="relative">
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="appearance-none border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                required
              >
                <option value="" disabled>
                  Chọn ngôn ngữ
                </option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>


          {/* Mục tiêu */}
          <div className="mb-4">
            <label htmlFor="goal" className="block text-gray-700 font-semibold mb-2">
              Mục tiêu:
            </label>
            <div className="relative">
              <select
                id="target"
                name="target"
                value={formData.target}
                onChange={handleChange}
                className="appearance-none border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                required
              >
                <option value="" disabled>
                  Chọn mục tiêu
                </option>
                <option value="học thêm">Học thêm</option>
                <option value="học mới">Học mới</option>
                <option value="đi làm">Đi làm</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>


          {/* Trình độ hiện tại */}
          <div className="mb-4">
            <label htmlFor="level" className="block text-gray-700 font-semibold mb-2">
              Trình độ hiện tại:
            </label>
            <div className="relative">
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="appearance-none border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                required
              >
                <option value="" disabled>
                  Chọn trình độ
                </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>


          {/* Thời gian học */}
          <div className="mb-4">
            <label htmlFor="duration" className="block text-gray-700 font-semibold mb-2">
              Thời gian học:
            </label>
            <div className="relative">
              <select
                id="time_study"
                name="time_study"
                value={formData.time_study}
                onChange={handleChange}
                className="appearance-none border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                required
              >
                <option value="" disabled selected>
                  Chọn thời gian học
                </option>
                <option value="1th">1 Tháng</option>
                <option value="2th">2 Tháng</option>
                <option value="3th">3 Tháng</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-accent text-white rounded-md hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent-dark"
            >
              Đăng Ký
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Bạn đã có tài khoản? </span>
          <Link to="/login" className="text-accent hover:underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
