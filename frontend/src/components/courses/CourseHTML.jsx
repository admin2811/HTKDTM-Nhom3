import React from 'react';
import { useNavigate } from "react-router-dom";
import LessonHtmlcss from '../lessons/LessonHtmlcss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function CourseHTML() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/course/courseHTML/lesson-htmlcss"); 
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
      <div className="text-center mb-8" data-aos="fade-down" data-aos-offset="200">
        <h1 className="text-4xl font-bold text-blue-600">Lập Trình HTML & CSS Nâng Cao</h1>
        <p className="text-lg text-gray-600">Khóa học giúp bạn nắm vững các kỹ thuật lập trình web, từ việc tạo layout đến xử lý hiệu ứng động. Cùng tìm hiểu các kỹ thuật như Flexbox, CSS Grid, tối ưu hóa hiệu suất và xây dựng giao diện responsive.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
  {/* Nội dung khóa học */}
  <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-8" >
  <div className="flex-1"  >
    <h2 className="text-2xl font-semibold mb-4" >Bạn sẽ học được gì?</h2>
    <ul className="list-disc pl-5 text-gray-700">
      <li>Các kỹ thuật HTML & CSS nâng cao giúp code tối ưu hơn</li>
      <li>Hiểu rõ cách thiết kế giao diện web responsive</li>
      <li>Nắm vững các khái niệm như Flexbox, CSS Grid, và các phương thức tối ưu hóa hiệu suất</li>
      <li>Phát triển tư duy thiết kế web của lập trình viên chuyên nghiệp</li>
      <li>Có nền tảng vững chắc để làm việc với các thư viện và framework như Bootstrap, Tailwind CSS</li>
      <li>Tăng cơ hội thành công khi phỏng vấn xin việc nhờ vào kỹ năng HTML & CSS vững chắc</li>
    </ul>
    <h2 className="text-2xl mt-4 font-semibold mb-4">Thông tin khóa học</h2>
    <ul className="space-y-4">
      <li className="flex items-center">
        <i className="fas fa-graduation-cap text-gray-500 mr-2"></i>
        <span>Trình độ trung bình</span>
      </li>
      <li className="flex items-center">
        <i className="fas fa-book text-gray-500 mr-2"></i>
        <span>Tổng số <strong>10</strong> bài học</span>
      </li>
      <li className="flex items-center">
        <i className="fas fa-clock text-gray-500 mr-2"></i>
        <span>Thời lượng <strong>09 giờ 00 phút</strong></span>
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
      src="https://www.youtube.com/embed/Z6uylatF5VY"
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

export default CourseHTML;
