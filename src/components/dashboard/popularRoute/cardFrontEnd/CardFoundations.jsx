import { Link } from 'react-router-dom';

const CardFoundations = () => {
  return (
    <div className="w-120 border border-gray-300 shadow-xl rounded-3xl overflow-hidden p-6 text-black relative flex">
      <div className="bg-gradient-to-r bg-opacity-70 from-indigo-500 to-pink-500 rounded-lg p-4 w-1/3 flex flex-col  text-white justify-center items-center">
        <h3 className="text-2xl font-bold text-center">Nhập môn IT</h3>
        <p className="text-sm text-center">Cho người mới bắt đầu</p>
      </div>
      <div className="flex-1 ml-4"> 
        <p className="text-xl font-semibold text-left">Nhập môn IT</p>
        <div className="flex justify-between mt-2">
          <p className="text-xl font-semibold text-red-600">Miễn phí</p>
        </div>
        <p className="mt-2 text-lg ">
          Khóa học Foundations of IT cung cấp kiến thức cơ bản về lĩnh vực công nghệ thông tin, giúp học viên hiểu rõ về hệ thống máy tính, mạng, và ứng dụng công nghệ trong thực tiễn.
        </p>
        <Link to="/dashboard/course/CourseFou" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-gray-200 transition">
          XEM KHÓA HỌC
        </Link>
      </div>
    </div>
  );
};

export default CardFoundations;