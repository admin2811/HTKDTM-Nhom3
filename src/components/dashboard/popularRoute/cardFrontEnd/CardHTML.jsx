import { Link } from 'react-router-dom';

const CardHTML = () => {
    return (
        <div className="w-120 border border-gray-300 shadow-xl rounded-3xl overflow-hidden p-6 text-black relative flex">
            <div className="bg-gradient-to-r bg-opacity-70 from-teal-500 to-blue-500 rounded-lg p-4 w-1/3 flex flex-col  text-white justify-center items-center"> {/* Căn giữa nội dung */}
                <h3 className="text-2xl font-bold text-center  ">HTML, CSS Căn Bản</h3>
                <p className="text-sm text-center">Cho người mới bắt đầu</p>
            </div>
            <div className="flex-1 ml-4"> 
            <p className="text-xl font-semibold text-left">HTML CSS</p>
            <div className="flex ustify-between mt-2">
                <p className="text-xl font-semibold text-red-600">Miễn phí </p>
            </div>
            <p className="mt-2 text-lg">
            Khóa học HTML và CSS căn bản cung cấp nền tảng vững chắc về xây dựng và định dạng giao diện web, tự tin bắt đầu hành trình lập trình front-end                   </p>
            <Link to="/dashboard/course/courseHTML" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-gray-200 transition">
                      XEM KHÓA HỌC
                    </Link>


            </div>
        </div>
    );
};

export default CardHTML;