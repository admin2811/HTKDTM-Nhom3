import React, { useEffect, useState } from 'react';
import { CohereClient } from 'cohere-ai'
const AIResult = () => {
  const cohere = new CohereClient({
    token: "STwjcOQ4QPWRBBw1ztnbOVUZBfsnF9HQicsVzi2U"
  })
  const [result, setResult] = useState(null); // Lưu trữ kết quả API
  const dataStorage = localStorage.getItem('data');
  const [aiEvaluation, setAiEvaluation] = useState(null);
  let username = '';

  if (dataStorage) {
    const parsedData = JSON.parse(dataStorage);
    username = parsedData.username;  // Lấy tên người dùng từ localStorage
  } else {
    console.log("No data found");
  }

  // Hàm gửi dữ liệu tới API và nhận kết quả
  const handleEvaluateMark = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/evaluate_mark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: username,  // Gửi dữ liệu username
          course_id: 1,  // Thêm ID khóa học nếu cần
          score: 8,  // Điểm số, có thể thay đổi theo dữ liệu thực tế
          studyTime: '30 phút',  // Thời gian học, có thể thay đổi
          aiSuggestions: 'Xác định các phần kiến thức chưa nắm vững...', // Kết quả từ AI
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result);
        setResult(result);  // Lưu kết quả API vào state
        await handleAIRequest(result);
      } else {
        console.error('Failed to evaluate mark:', result);
      }
    } catch (error) {
      console.error('Error evaluating mark:', error);
    }
  };
  const handleAIRequest = async (result) => {
    try {
      // Truyền các thông số từ API để gửi tới Cohere
      const response = await cohere.generate({
        model: 'command-xlarge-nightly', // Lựa chọn mô hình Cohere
        prompt: `Dựa trên kết quả trung bình của học viên: ${result.data.average_result}, 
                              xếp hạng dự đoán: ${result.data.predicted_rank}, 
                              và tên người dùng của họ: ${result.data.user_name}, 
                              hãy cung cấp một đánh giá cá nhân về tiến độ học tập của họ.
                              `,
        max_tokens: 200,  // Tùy chỉnh số token
      });

      setAiEvaluation(response.generations[0].text); // Lưu kết quả từ Cohere vào state
    } catch (error) {
      console.error('Error from Cohere:', error);
    }
  };
  // Gọi hàm khi component mount  
  useEffect(() => {
    handleEvaluateMark();  // Gửi dữ liệu khi component load
  }, []);

  return (
    <div>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className="w-full max-w-md bg-white rounded-xl shadow-md py-8 px-8 mx-auto z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-[28px] font-bold text-black mb-6 text-center">Kết quả học tập của bạn</h2>
        <div className="flex flex-col items-center justify-center h-full">
          {result ? (
            <div className="bg-white rounded-lg shadow-md w-full p-4 mb-4">
              <h3 className="text-lg font-semibold text-black mb-4">Bài học 1</h3>
              <p className="text-base text-gray-500">Đã học</p>
              <p className="text-base text-gray-500">Điểm: {result.data.average_result || '8/10'}</p>
              <p className="text-base text-gray-500">Thời gian học: {result.studyTime || '30 phút'}</p>
              <p className="text-base text-gray-500">
                Kết quả Gợi ý từ AI: {result.aiSuggestions || 'Không có gợi ý'}
              </p>
            </div>
          ) : (
            <div className="text-center text-gray-500">Đang tải kết quả...</div>
          )}
          {aiEvaluation ? (
            <div className="bg-white rounded-lg shadow-md w-full p-4 mt-4">
              <h3 className="text-lg font-semibold text-black mb-4">Đánh giá từ AI</h3>
              <p className="text-base text-gray-500">{aiEvaluation}</p>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-4">Đang tải đánh giá từ AI...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIResult;
