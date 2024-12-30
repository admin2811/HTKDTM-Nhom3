import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
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
      const response = await axios.post("http://localhost:4000/adduser", formData);
      console.log("Đăng ký thành công:", response.data);
      setErrorMessage("");
      navigate("/dashboard");  // Chuyển hướng sau khi đăng ký thành công
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
              placeholder="Tên đăng nhập"
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
              placeholder="Mật khẩu"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
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
