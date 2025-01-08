import { Link } from 'react-router-dom';

const CardNode  = () => {
  return (
    <div className="w-120 border border-gray-300 shadow-xl rounded-3xl overflow-hidden p-6 text-black relative flex">
      <div className="bg-gradient-to-r bg-opacity-70 from-green-600 to-gray-500 rounded-lg p-4 w-1/3 flex flex-col  text-white justify-center items-center">
        <h3 className="text-2xl font-bold text-center">Node.js</h3>
        <p className="text-sm text-center">Learn more </p>
      </div>
      <div className="flex-1 ml-4"> 
        <p className="text-xl font-semibold text-left">Lập trình Node.js </p>
        <div className="flex ustify-between mt-2">
                <p className="text-lg line-through mr-2 ">2.500.000đ</p> 
                <p className="text-xl font-semibold text-red-600">1.299.000đ</p>
            </div>
        <p className="mt-2 text-base">
        Node.js được sử dụng để xây dựng server-side applications, như API, dịch vụ xử lý dữ liệu, hoặc ứng dụng thời gian thực (real-time).        </p>
        <Link to="/dashboard/course/courseHTML" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-gray-200 transition">
          XEM KHÓA HỌC
        </Link>
      </div>
    </div>
  );
};

export default CardNode;