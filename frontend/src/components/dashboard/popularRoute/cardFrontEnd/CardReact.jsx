import { Link } from 'react-router-dom';

const CardReact = () => {
    return (
        <div className="w-120 border border-gray-300 shadow-xl rounded-3xl overflow-hidden p-6 text-black relative flex">
            <div className="bg-gradient-to-r bg-opacity-70 from-violet-500 to-green-500 rounded-lg p-4 w-1/3 flex flex-col  text-white justify-center items-center"> {/* Căn giữa nội dung */}
                <h3 className="text-2xl font-bold text-center  ">ReactJS</h3>
                <p className="text-lg text-center"> learn once, write anywhere </p>
            </div>
            <div className="flex-1 ml-4"> 
            <p className="text-xl font-semibold text-left"> Xây Dựng Website với ReactJS</p>
            <div className="flex ustify-between mt-2">
                <p className="text-xl font-semibold text-red-600">2.300.000đ </p>
            </div>
            <p className="mt-2 text-lg">
            Hiểu sâu hơn về cách Javascript hoạt động, tìm hiểu về IIFE, closure, reference types, this keyword, bind, call, apply, prototype, ..            </p>
            <Link to="/dashboard/course/courseHTML" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-gray-200 transition">
          XEM KHÓA HỌC
        </Link>

            </div>
        </div>
    );
};

export default CardReact;