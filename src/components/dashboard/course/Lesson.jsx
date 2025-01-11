/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import YouTube from "react-youtube";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../common/loading/Loading";

// Tạo component danh sách bài học riêng
const LessonList = ({ lessons, selectedLesson, onLessonChange }) => (
  <div className="w-1/5 bg-gray-100 p-4 rounded-lg shadow mr-4 h-full overflow-y-auto">
    <h2 className="text-2xl text-center font-semibold mb-4 text-gray-800">Danh sách bài học</h2>
    <ul className="space-y-4">
      {lessons.map((lesson) => (
        <li
          key={lesson.id}
          className={`p-4 rounded-lg cursor-pointer ${selectedLesson.id === lesson.id ? "bg-blue-200" : "hover:bg-gray-200"}`}
          onClick={() => onLessonChange(lesson)}
        >
          <h3 className="font-bold text-lg text-gray-800">{lesson.title}</h3>
          <p className="text-sm text-gray-600">{lesson.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

function LessonJava() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [isAIProcessing, setIsAIProcessing] = useState(false);  // Thêm trạng thái loading cho nút AI
  const [transcription, setTranscription] = useState("");  // State mới để lưu trữ transcription
  const { id } = useParams();
  const navigate = useNavigate();
  const dataStorage = localStorage.getItem("data");
  let username = ''
  if (dataStorage) {
    const parsedData = JSON.parse(dataStorage);
    username = parsedData.username;  // In ra 'test1'
  } else {
    console.log("No data found");
  }  
  console.log(id)
  const handleRegisterCourse = async () => {
    if (id && username) {
      try {
        const response = await fetch("http://127.0.0.1:5000/register_course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course_id: id,
            user_name: username,
          }),
        });

        const result = await response.json();
        
        if (response.ok) {
          console.log("Successfully registered:", result);
        } else {
          console.error("Failed to register course:", result);
        }
      } catch (error) {
        console.error("Error registering course:", error);
      }
    } else {
      console.log("Missing id or username");
    }
  };
  const opts = useMemo(() => ({
    height: "600",
    width: "980",
    playerVars: {
      autoplay: 0,
    },
  }), []);

  // Fetch dữ liệu
  const fetchData = useCallback(async () => {
    setLoading(true);
    // Post dữ liệu tới register_course rồi mới hiển thị khoá học
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/lessons/${id}/`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
        setLessons(result.lessons || []);
        setSelectedLesson(result.lessons?.[0] || null);
      } else {
        console.error("Failed to fetch lessons");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Log video URL to console when selectedLesson changes
  useEffect(() => {
    if (selectedLesson) {
      const videoUrl = `https://www.youtube.com/watch?v=${selectedLesson.videoId}`;
      console.log("YouTube Video URL:", videoUrl);
    }
  }, [selectedLesson]);

  // Hàm gửi URL video đến server Django
  const sendVideoUrlToServer = async (videoUrl) => {
    console.log(videoUrl);
    setIsAIProcessing(true);  // Bật trạng thái loading khi bắt đầu gửi yêu cầu
    try {
      const response = await fetch("http://127.0.0.1:5000/api/transcribeByUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          videoUrl: videoUrl,
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        console.log("Transcription:", data.transcription);

        // Tách văn bản thành từng câu (bằng dấu chấm).
        const transcriptionText = data.transcription || "Không có tóm tắt";
        
        // Chia văn bản theo dấu chấm hoặc các dấu câu khác
        const formattedTranscription = transcriptionText
          .split(/[.!?]\s+/)  // Tách theo dấu chấm, dấu chấm hỏi hoặc dấu chấm than
          .map((sentence, index) => <p key={index} className="mb-2">{sentence.trim()}</p>);

        setTranscription(formattedTranscription);  // Lưu transcription vào state
      } else {
        console.error("Error transcribing video:", data.message);
      }
    } catch (error) {
      console.error("Error sending video URL to server:", error);
    } finally {
      setIsAIProcessing(false);  // Tắt trạng thái loading khi đã hoàn thành
    }
  };

  // Cập nhật số bài học đã hoàn thành
  const handleLessonChange = (lesson) => {
    setSelectedLesson(lesson);
    const completedCount = lessons.findIndex((l) => l.id === lesson.id) + 1;
    setCompletedLessons(completedCount);
  };

  // Tính phần trăm hoàn thành
  const completionPercentage = useMemo(() => Math.round((completedLessons / lessons.length) * 100), [completedLessons, lessons.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading className="text-center" />
      </div>
    );
  }
  // const splitIntoSentences = (text) => {
  //   return text.split(/[.!?]\s+/).map((sentence, index) => (
  //     <p key={index}>{sentence.trim()}</p>
  //   ));
  // };

  return (
    <div className="w-full h-screen bg-gray-50 p-6 rounded-lg shadow-lg flex">
      <header className="flex justify-between items-center mb-6 w-full py-4 fixed top-0 left-0 bg-white shadow-md z-10">
        <button
          className="text-blue-500 text-lg font-semibold flex items-center ml-6 "
          onClick={() => window.history.back()}
        >
          &lt; Trở về
        </button>
        <h1 className="text-5xl font-bold text-blue-800 flex-1 text-center">Lập trình JavaScript</h1>
        <div className="text-lg text-gray-600 text-right mr-6">
          <p>{completedLessons}/{lessons.length} bài học</p>
          <p>{completionPercentage}% hoàn thành</p>
        </div>
      </header>

      <div className="flex w-full h-full mt-20">
        <LessonList lessons={lessons} selectedLesson={selectedLesson} onLessonChange={handleLessonChange} />

        <div className="w-4/5 bg-white p-6 rounded-lg shadow text-gray-700">
          <h2 className="text-2xl font-semibold mb-4">{selectedLesson?.title}</h2>
          <p className="mb-6">{selectedLesson?.description}</p>
          <div className="flex justify-center mt-2">
            <YouTube videoId={selectedLesson?.videoId} opts={opts} />
          </div>
          <div className="flex justify-between gap-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300"
              onClick={() => {
                const currentIndex = lessons.findIndex((lesson) => lesson.id === selectedLesson.id);
                if (currentIndex > 0) handleLessonChange(lessons[currentIndex - 1]);
              }}
              disabled={lessons.findIndex((lesson) => lesson.id === selectedLesson.id) === 0}
            >
              &lt; Bài trước
            </button>

            <div className="flex gap-2">
              {isAIProcessing ? (
                <svg className="animate-spin h-5 w-5 mr-3 rounded-xl border-2 border-t-orange-300" viewBox="0 0 24 24"></svg>
              ) : (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300"
                  onClick={() => {
                    // Khi ấn nút AI Tóm tắt bài học, gửi video URL đến server
                    const videoUrl = `https://www.youtube.com/watch?v=${selectedLesson.videoId}`;
                    sendVideoUrlToServer(videoUrl);
                  }}
                >
                  AI Tóm tắt bài học
                </button>
              )}
            </div>

            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300"
                onClick={async () => {
                  const currentIndex = lessons.findIndex((lesson) => lesson.id === selectedLesson.id);
                  if (currentIndex === lessons.length - 1) {
                    // Gọi handleRegisterCourse khi nhấn vào "Bài kiểm tra cuối khóa"
                    await handleRegisterCourse();
                    // Chuyển hướng tới trang bài kiểm tra cuối khóa
                    navigate(`/dashboard/quizz/${id}`);
                  } else {
                    handleLessonChange(lessons[currentIndex + 1]);
                  }
                }}
              >
                {lessons.findIndex((lesson) => lesson.id === selectedLesson.id) === lessons.length - 1
                  ? "Bài kiểm tra cuối khóa"
                  : "Bài tiếp theo >"}
              </button>

          </div>

          {/* Hiển thị transcription nếu có */}
          {transcription && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-bold text-lg">Tóm tắt bài học:</h3>
              <div className="text-gray-700">
                {/* Hiển thị các câu đã được chia thành các đoạn riêng biệt */}
                {transcription}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LessonJava;
