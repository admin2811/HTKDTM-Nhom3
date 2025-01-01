import React from 'react';
import { Link } from 'react-router-dom';

const CardJava = () => {
    return (
        <div className="w-120 border border-gray-300 shadow-xl rounded-3xl overflow-hidden p-6 text-black relative flex">
            <div className="bg-gradient-to-r bg-opacity-70 from-yellow-500 to-orange-400 rounded-lg p-4 w-1/3 flex flex-col  text-white justify-center items-center"> {/* Căn giữa nội dung */}
                <h3 className="text-2xl font-bold text-center  ">Java Căn Bản</h3>
                <p className="text-lg text-center">{'{.Căn Bản}'}</p>
                </div>
            <div className="flex-1 ml-4"> 
            <p className="text-xl font-semibold text-left"> Lập trình Java</p>
            <div className="flex ustify-between mt-2">
                <p className="text-xl font-semibold text-red-600">Miễn phí </p>
            </div>
            <p className="mt-2 text-lg">
            Học Javascript cơ bản phù hợp cho người chưa từng học lập trình. Với hơn 100 bài học và có bài tập thực hành sau mỗi bài học.            </p>
            <Link to="/dashboard/course/courseJava" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-gray-200 transition">
          XEM KHÓA HỌC
        </Link>


            </div>
        </div>
    );
};

export default CardJava;