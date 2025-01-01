
import React from 'react';
import { Link } from 'react-router-dom';

const CardFrames  = () => {
  return (
    <div className="w-120 border border-gray-300 shadow-xl rounded-3xl overflow-hidden p-6 text-black relative flex">
      <div className="bg-gradient-to-r bg-opacity-70 from-green-600 to-green-700 rounded-lg p-4 w-1/3 flex flex-col  text-white justify-center items-center">
        <h3 className="text-2xl font-bold text-center">Libraries and Frameworks</h3>
        <p className="text-sm text-center">Learn more </p>
      </div>
      <div className="flex-1 ml-4"> 
        <p className="text-xl font-semibold text-left">Node & ExpressJS </p>
        <div className="flex ustify-between mt-2">
                <p className="text-xl font-semibold text-red-600">2.500.000đ</p>
            </div>
        <p className="mt-2 text-base">
        Học Back-end với Node & ExpressJS framework, hiểu các khái niệm khi làm Back-end và xây dựng RESTful API cho trang web.      </p>
        <Link to="/dashboard/course/courseHTML" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-gray-200 transition">
          XEM KHÓA HỌC
        </Link>
      </div>
    </div>
  );
};

export default CardFrames;