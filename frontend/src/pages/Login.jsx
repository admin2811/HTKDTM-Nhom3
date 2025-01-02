import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State để lưu thông báo lỗi
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const response = await axios.post("https://serverleaderbroadpostgre.fly.dev/login", formData);  
      console.log(response);
      //console.log("Đăng nhập thành công:", response.data);
      setErrorMessage(""); // Xóa thông báo lỗi nếu đăng nhập thành công
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error.response ? error.response.data : error.message);

      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message); // Hiển thị lỗi từ server
      } else {
        setErrorMessage("Lỗi máy chủ, vui lòng thử lại!");
      }
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Đăng Nhập
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
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <Link to='/forgot_password' className="py-2 text-accent mt-5">Forgot Password?</Link>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-accent text-white rounded-md hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent-dark"
            >
              Đăng Nhập
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Bạn chưa có tài khoản? </span>
          <Link
            to="/register"
            className="text-accent hover:underline"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
