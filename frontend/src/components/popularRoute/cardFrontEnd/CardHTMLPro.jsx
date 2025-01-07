import React from 'react';
import { Link } from 'react-router-dom';

const CardHTMLPro = () => {
    return (
        <div className="w-120 border border-gray-300 shadow-xl rounded-3xl overflow-hidden p-6 text-black relative flex">
            <div className="bg-gradient-to-r bg-opacity-70 from-orange-500 to-purple-400 rounded-lg p-4 w-1/3 flex flex-col text-white justify-center items-center"> {/* Căn giữa nội dung */}
                <h3 className="text-2xl font-bold text-center">HTML, CSS Pro <span className="text-yellow-400">*</span></h3>
                <p className="text-sm text-center">Cho người mới bắt đầu</p>
            </div>
            <div className="flex-1 ml-4"> 
            <p className="text-xl font-semibold text-left">HTML CSS</p>
            <div className="flex ustify-between mt-2">
                <p className="text-lg line-through mr-2 ">2.500.000đ</p> 
                <p className="text-xl font-semibold text-red-600">1.299.000đ</p>
            </div>
            <p className="mt-2 text-lg">
                Khóa học HTML CSS Pro phù hợp cho cả người mới bắt đầu, lên tới 8 dự án trên Figma, 30+ bài tập và 3+ games, tăng 20+ Figma để thực hành!
            </p>
            <Link to="/dashboard/course/courseHTML" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-gray-200 transition">
          XEM KHÓA HỌC
        </Link>


            </div>
        </div>
    );
};

export default CardHTMLPro;
