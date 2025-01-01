import React, { useState } from "react";
import YouTube from "react-youtube";

const lessons = [
    {
      id: 1,
      title: "Bài 1: Giới thiệu về Java",
      description: "Tìm hiểu về ngôn ngữ lập trình Java và ứng dụng thực tế.",
      videoId: "xfOp0izFnu0",
    },
    {
      id: 2,
      title: "Bài 2: Cài đặt môi trường Java",
      description: "Hướng dẫn cài đặt JDK, IDE và thiết lập môi trường phát triển Java.",
      videoId: "ayA1Lz2qEZo",
    },
    {
      id: 3,
      title: "Bài 3: Biến và kiểu dữ liệu trong Java",
      description: "Hiểu cách khai báo biến, sử dụng kiểu dữ liệu và xử lý dữ liệu trong Java.",
      videoId: "6Gbxt2Sox7k",
    },
    {
      id: 4,
      title: "Bài 4: Câu lệnh điều kiện và vòng lặp",
      description: "Học cách sử dụng if-else, switch, for, while để kiểm soát luồng chương trình.",
      videoId: "HUtHP5Iz0BQ",
    },
    {
      id: 5,
      title: "Bài 5: Lập trình hướng đối tượng (OOP) cơ bản",
      description:
        "Tìm hiểu các khái niệm cơ bản về OOP như lớp, đối tượng, kế thừa, đa hình.",
      videoId: "ph_RfyQP5cE",
    },
    {
      id: 6,
      title: "Bài 6: Xử lý mảng và chuỗi trong Java",
      description:
        "Khám phá cách sử dụng mảng, chuỗi và các phương thức xử lý dữ liệu liên quan.",
      videoId: "ph_RfyQP5cE",
    },
    {
      id: 7,
      title: "Bài 7: Làm việc với Collection Framework",
      description:
        "Tìm hiểu các cấu trúc dữ liệu như ArrayList, HashMap và cách sử dụng chúng.",
      videoId: "0-EmH82R88s",
    },
    {
      id: 8,
      title: "Bài 8: Xử lý ngoại lệ (Exception Handling)",
      description:
        "Học cách phát hiện, xử lý lỗi và sử dụng các khối try-catch trong Java.",
      videoId: "t6CBKf8K_Ac",
    },
    {
      id: 9,
      title: "Bài 9: Luồng dữ liệu (Input/Output) trong Java",
      description:
        "Tìm hiểu cách làm việc với luồng dữ liệu và xử lý tệp trong Java.",
      videoId: "HECh2wIr10A",
    },
    {
      id: 10,
      title: "Bài 10: Lập trình đa luồng (Multithreading)",
      description:
        "Khám phá cách tạo và quản lý các luồng trong Java để thực hiện công việc đồng thời.",
      videoId: "1PnVor36_40",
    },
    {
      id: 11,
      title: "Bài 11: Làm việc với cơ sở dữ liệu trong Java",
      description:
        "Học cách sử dụng JDBC để kết nối, truy vấn và thao tác với cơ sở dữ liệu.",
      videoId: "8QqJehJ2h0Y",
    },
  ];
  
function LessonJava() {
  const [selectedLesson, setSelectedLesson] = useState(lessons[0]); // Bài học đang được chọn
  const [completedLessons, setCompletedLessons] = useState(0); // Số bài đã học

  const opts = {
    height: "600",
    width: "980",
    playerVars: {
      autoplay: 0,
    },
  };

  // Cập nhật số bài đã học khi thay đổi bài học
  const handleLessonChange = (lesson) => {
    setSelectedLesson(lesson);
    const completedCount = lessons.findIndex((l) => l.id === lesson.id) + 1;
    setCompletedLessons(completedCount);
  };

  // Tính phần trăm hoàn thành
  const completionPercentage = Math.round(
    (completedLessons / lessons.length) * 100
  );

  return (
    <div className="w-full h-screen bg-gray-50 p-6 rounded-lg shadow-lg flex">
  <header className="flex justify-between items-center mb-6 w-full py-4 fixed top-0 left-0 bg-white shadow-md z-10">
    <button
      className="text-blue-500 text-lg font-semibold flex items-center ml-6 "
      onClick={() => window.history.back()}
    >
      &lt; Trở về
    </button>

    <h1 className="text-5xl font-bold text-blue-800 flex-1 text-center">
    Lập trình JavaScript 
    </h1>

    <div className="text-lg text-gray-600 text-right mr-6">
      <p>
        {completedLessons}/{lessons.length} bài học
      </p>
      <p>{completionPercentage}% hoàn thành</p>
    </div>
  </header>

  <div className="flex w-full h-full mt-20  ">
    <div className="w-1/5 bg-gray-100 p-4 rounded-lg shadow mr-4 h-full overflow-y-auto">
      <h2 className="text-2xl text-center font-semibold mb-4 text-gray-800">
        Danh sách bài học
      </h2>
      <ul className="space-y-4">
        {lessons.map((lesson, index) => (
          <React.Fragment key={lesson.id}>
            <li
              className={`p-4 rounded-lg cursor-pointer ${
                selectedLesson.id === lesson.id
                  ? "bg-blue-200"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleLessonChange(lesson)}
            >
              <h3 className="font-bold text-lg text-gray-800">
                {lesson.title}
              </h3>
              <p className="text-sm text-gray-600">{lesson.description}</p>
            </li>
            {index < lessons.length - 1 && (
              <hr className="border-gray-300" />
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>

    <div className="w-4/5 bg-white p-6 rounded-lg shadow text-gray-700">
      <h2 className="text-2xl font-semibold mb-4">{selectedLesson.title}</h2>
      <p className="mb-6">{selectedLesson.description}</p>
      <div className="flex justify-center mt-2 ">
        <YouTube videoId={selectedLesson.videoId} opts={opts} />
      </div>
      <div className="flex justify-between gap-2">
        {/* Nút "Bài trước" */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300"
          onClick={() => {
            const currentIndex = lessons.findIndex(
              (lesson) => lesson.id === selectedLesson.id
            );
            if (currentIndex > 0) {
              handleLessonChange(lessons[currentIndex - 1]);
            }
          }}
          disabled={
            lessons.findIndex((lesson) => lesson.id === selectedLesson.id) ===
            0
          }
        >
          &lt; Bài trước
        </button>

        {/* Nút "Bài tiếp theo" */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300"
          onClick={() => {
            const currentIndex = lessons.findIndex(
              (lesson) => lesson.id === selectedLesson.id
            );
            if (currentIndex < lessons.length - 1) {
              handleLessonChange(lessons[currentIndex + 1]);
            }
          }}
          disabled={
            lessons.findIndex((lesson) => lesson.id === selectedLesson.id) ===
            lessons.length - 1
          }
        >
          Bài tiếp theo &gt;
        </button>
      </div>
    </div>
  </div>
</div>

  );
  
}

export default LessonJava;

