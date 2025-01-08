/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const FormUser = ({ onClose }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name) {
      alert("Tên lộ trình không được để trống!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/routers/', {
        name,
        content: ''  // Chỉ gửi trường name, content để trống
      });
      onClose(response.data); // Truyền dữ liệu mới khi form đóng
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className='w-full max-w-md bg-white rounded-xl shadow-md py-8 px-8 mx-auto z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <h2 className='text-[28px] font-bold text-black mb-6 text-center'>Thêm Lộ Trình Của Bạn</h2>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <div className="flex space-x-4 mb-4">
            <input
              type='text'
              className='bg-white text-black border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150'
              name='name'
              placeholder='Tên Lộ Trình'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default FormUser;
