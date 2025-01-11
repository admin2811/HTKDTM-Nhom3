import { useState, useEffect } from 'react';

const AIPreview = () => {
  const [aiResponse, setAiResponse] = useState('');

  // Theo dõi sự thay đổi của aiResponse trong localStorage
  useEffect(() => {
    // Hàm cập nhật giá trị aiResponse khi localStorage thay đổi
    const handleStorageChange = () => {
      const newAiResponse = localStorage.getItem('aiResponse');
      setAiResponse(newAiResponse); // Cập nhật aiResponse khi có sự thay đổi
    };

    // Đăng ký sự kiện để theo dõi thay đổi trong localStorage
    window.addEventListener('storage', handleStorageChange);
    // Dọn dẹp sự kiện khi component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Chỉ chạy một lần khi component mount
  console.log(localStorage.getItem('aiResponse'));
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'>
        <h1 className="text-center text-2xl font-semibold mb-20">Lộ trình học của bạn</h1>
        <div style={{ whiteSpace: 'pre-line' }}>
          {localStorage.getItem('aiResponse') || aiResponse}
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition mt-10">Save</button>
    </div>
  );
};

export default AIPreview;
