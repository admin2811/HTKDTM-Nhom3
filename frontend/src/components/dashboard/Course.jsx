import img_frontend from '../../assets/img/frontend.png'
import img_backend from '../../assets/img/backend.png'
import background from '../../assets/img/orange-pattern.jpg'
import { Link } from 'react-router-dom';
const Course = () => {
  return (
    <div>
      <div className="w-1/2">
        <h1 className="font-bold text-3xl mt-16 ml-20">Lộ trình học tập</h1>
        <p className="mt-20 ml-20">Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi làm với vị trí &quot;Lập trình viên Front-end&quot; bạn nên tập trung vào lộ trình &quot;Front-end&quot;.</p>
      </div>
      <div className="flex mt-24 ml-20 gap-20">
        <div className="w-[600px] p-6 rounded-lg border-2 border-gray-300 flex flex-col">
          <div className="flex mb-20">
            <div className="flex-col">
              <h2 className="text-3xl font-bold">Lộ trình học Front-end</h2>
              <p className="mt-10 text-xl leading-6">
              Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.
              </p>
            </div>
            <div className="flex items-center pl-6">
            <a
              href="#"
              className="flex items-center justify-center w-[125px] h-[125px] rounded-full border-2 border-orange-500"
              aria-label="Front-end learning path"
            >
              <img
                src={img_frontend} // Hình ảnh thử nghiệm, bạn có thể thay thế bằng hình ảnh của mình
                alt="Front-end"
                className="w-full h-full object-cover"
              />
            </a>
            </div>
          </div>
          <Link to='/dashboard/road/frontend-details' className='rounded-lg p-6 bg-blue-400 text-2xl text-white text-center'>Xem chi tiết</Link>
        </div>
        <div className="w-[600px] p-6 rounded-lg border-2 border-gray-300 flex flex-col">
          <div className="flex mb-20">
            <div className="flex-col">
              <h2 className="text-3xl font-bold">Lộ trình học Back-end</h2>
              <p className="mt-10 text-xl leading-6">
                  Lập trình viên Back-end là người làm việc với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học Back-end nhé.
              </p>
            </div>
            <div className="flex items-center pl-6">
            <a
              href="#"
              className="flex items-center justify-center w-[125px] h-[125px] rounded-full border-2 border-orange-500"
              aria-label="Front-end learning path"
            >
              <img
                src={img_backend} // Hình ảnh thử nghiệm, bạn có thể thay thế bằng hình ảnh của mình
                alt="Front-end"
                className="w-full h-full object-cover"
              />
            </a>
            </div>
          </div>
          <Link to="/dashboard/road/backend-details" className='rounded-lg p-6 bg-blue-400 text-2xl text-white text-center'>Xem chi tiết</Link>
        </div>
      </div>
      <div className="w-2/3 p-10 mt-20 items-center ml-auto mr-auto mb-56 rounded-lg" style={{ backgroundImage: `url(${background})` }}>
        <h1 className="text-3xl font-bold text-center text-white">Lộ trình học của bạn</h1>
        <p className="text-center text-white mt-10 mb-20 text-xl">Hãy thử sử dụng AI chọn lộ trình học phù hợp với bạn nhất</p>
        
        {/* Thêm lớp flex và justify-center để căn giữa link */}
        <div className="flex justify-center">
          <Link to='/routePersonal' className="mt-20 text-center p-6 bg-white rounded-lg w-full text-2xl">Try Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Course;