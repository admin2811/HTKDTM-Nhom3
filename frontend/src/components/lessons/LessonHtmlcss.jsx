import React, { useState } from "react";
import YouTube from "react-youtube";

const lessons = [
  {
    id: 1,
    title: "Bài 1: Giới thiệu về HTML",
    description: "Tìm hiểu cơ bản về HTML và cách tổ chức cấu trúc của một trang web.",
    videoId: "tF9q98QCVdw", 
  },
  {
    id: 2,
    title: "Bài 2: Các thẻ và thuộc tính trong HTML",
    description:
      "Khám phá các thẻ HTML phổ biến và cách sử dụng thuộc tính để tùy chỉnh nội dung.",
    videoId: "saTje2F7REQ",
  },
  {
    id: 3,
    title: "Bài 3: HTML Forms và Input",
    description: "Tìm hiểu cách tạo biểu mẫu và thu thập dữ liệu từ người dùng.",
    videoId: "Z_yklMHacWY",
  },
  {
    id: 4,
    title: "Bài 4: Giới thiệu về CSS",
    description: "Học cách sử dụng CSS để định dạng và bố trí giao diện trang web.",
    videoId: "yfoY53QXEnI",
  },
  {
    id: 5,
    title: "Bài 5: CSS Selectors và thuộc tính cơ bản",
    description:
      "Hiểu cách sử dụng selectors trong CSS và các thuộc tính cơ bản như màu sắc, kích thước.",
    videoId: "1Rs2ND1ryYc",
  },
  {
    id: 6,
    title: "Bài 6: CSS Box Model",
    description:
      "Tìm hiểu Box Model trong CSS và cách xử lý khoảng cách giữa các phần tử.",
    videoId: "rIO5326FgPE",
  },
  {
    id: 7,
    title: "Bài 7: Định dạng bố cục với Flexbox",
    description:
      "Sử dụng Flexbox để tạo bố cục trang web một cách linh hoạt và đơn giản.",
    videoId: "JJSoEo8JSnc",
  },
  {
    id: 8,
    title: "Bài 8: Sử dụng Grid trong CSS",
    description: "Tìm hiểu cách sử dụng CSS Grid để tạo bố cục lưới cho trang web.",
    videoId: "t6CBKf8K_Ac",
  },
  {
    id: 9,
    title: "Bài 9: Phản hồi giao diện với Media Queries",
    description:
      "Tạo giao diện web phản hồi với các kích thước màn hình khác nhau bằng Media Queries.",
    videoId: "4sosXZsdy-s",
  },
  {
    id: 10,
    title: "Bài 10: Tối ưu hóa giao diện với CSS nâng cao",
    description:
      "Học các kỹ thuật CSS nâng cao để tối ưu hóa giao diện và trải nghiệm người dùng.",
    videoId: "1PnVor36_40",
  },
];
function LessonHtmlcss() {
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

    <h1 className="text-5xl font-extrabold text-blue-900 text-center my-4" >
       HTML & CSS
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

export default LessonHtmlcss;

