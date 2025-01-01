import React from 'react';
// import LessonHtmlcss from "../lesson/LessonHtmlcss"; 
import { useNavigate } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function CourseJava() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/course/courseJava/lesson-java"); 
  };
  return (
    <div className="container mx-auto px-4 py-8">
       {/* Nút trở về */}
    <button
      className="text-blue-500 text-lg font-semibold flex items-center ml-6 "
      onClick={() => window.history.back()}
    >
      &lt; Trở về
    </button>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Lập Trình JavaScript</h1>
        <p className="text-lg text-gray-600">Khóa học giúp bạn nắm vững các kỹ thuật lập trình JavaScript, từ các khái niệm cơ bản đến nâng cao. Cùng tìm hiểu cách thao tác DOM, xử lý sự kiện, làm việc với API, và phát triển các ứng dụng web tương tác mạnh mẽ..</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
  {/* Nội dung khóa học */}
  <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
  <div className="flex-1">
    <h2 className="text-2xl font-semibold mb-4">Bạn sẽ học được gì?</h2>
    <ul className="list-disc pl-5 text-gray-700">
        <li>Nắm vững cú pháp và các khái niệm cơ bản trong Java</li>
        <li>Hiểu rõ cách làm việc với OOP (Lập trình hướng đối tượng) trong Java</li>
        <li>Thành thạo cách sử dụng các cấu trúc dữ liệu và thuật toán</li>
        <li>Làm việc với các thư viện và framework phổ biến trong Java như Spring, Hibernate</li>
        <li>Phát triển tư duy giải quyết vấn đề của lập trình viên chuyên nghiệp</li>
        <li>Tăng cơ hội thành công khi phỏng vấn xin việc nhờ kỹ năng lập trình Java vững chắc</li>
    </ul>

    <h2 className="text-2xl mt-4 font-semibold mb-4">Thông tin khóa học</h2>
    <ul className="space-y-4">
      <li className="flex items-center">
        <i className="fas fa-graduation-cap text-gray-500 mr-2"></i>
        <span>Trình độ căn bản </span>
      </li>
      <li className="flex items-center">
        <i className="fas fa-book text-gray-500 mr-2"></i>
        <span>Tổng số <strong>11</strong> bài học</span>
      </li>
      <li className="flex items-center">
        <i className="fas fa-clock text-gray-500 mr-2"></i>
        <span>Thời lượng <strong>13 giờ 25 phút</strong></span>
      </li>
      <li className="flex items-center">
        <i className="fas fa-laptop text-gray-500 mr-2"></i>
        <span>Học mọi lúc, mọi nơi</span>
      </li>
    </ul>
    <button
      className="bg-blue-600 mt-4 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
      onClick={handleClick}
    >
      Bắt đầu ngay
    </button>
  </div>

  {/* Video Trailer  */}
  <div className="w-full md:w-1/2">
    <iframe
      width="100%"
      height="400"
      src="https://www.youtube.com/embed/xfOp0izFnu0"
      title="Course Trailer"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</div>


      
    </div>
    </div>
 
  );
}

export default CourseJava;
