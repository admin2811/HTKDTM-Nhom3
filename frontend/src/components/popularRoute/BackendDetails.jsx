import React from "react";
import Navbar from "../../components/dashboard/common/navbar/Navabar";
import Sidebar from "../../components/dashboard/common/sidebar/Sidebar";
import "../dashboard/home.css";

import CardFoundations from "./cardFrontEnd/CardFoundations";
import CardHTML from "./cardFrontEnd/CardHTML";
import CardHTMLPro from "./cardFrontEnd/CardHTMLPro";
import CardJava from "./cardFrontEnd/CardJava";
import CardJavaPro from "./cardFrontEnd/CardJavaPro";
import CardNode from "./cardBackEnd/CardNode";
import CardSql from "./cardBackEnd/CardSql";
import CardFrames from "./cardBackEnd/CardFrames";

function BackendDetails() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-60 h-full bg-gray-200">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 ml-60  overflow-y-auto">
            <Navbar />
            <div className="max-w-7xl mx-auto p-8">
          <div data-aos="fade-down" data-aos-offset="400">
          <h1 className="text-4xl text-center  font-bold text-black-800" >Chi tiết Lộ trình học Back-end</h1>
        
        <p className="mt-2 text-lg ">
            Back-end là nơi xử lý dữ liệu và lưu trữ .
            Vì vậy, nhiệm vụ của lập trình viên Back-end là phân tích thiết kế dữ liệu, xử lý logic nghiệp vụ của các chức năng trong ứng dụng.        </p>
        
            <p className="mt-2 text-lg ">
            EduWeb cung cấp các khóa học chuyên sâu, giúp bạn trang bị kiến thức và kỹ năng cần thiết để bắt đầu sự nghiệp lập trình viên Back-end.
            </p>

            {/* Các phần chi tiết */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-black-800">Khóa học 1: Nhập môn IT</h2>
              <p className="text-lg mt-2">
                Ngành IT - Phần mềm đòi hỏi sự kiên trì, khả năng học hỏi và kỹ năng làm việc sáng tạo...
              </p>
              <div className="mt-4">
                <CardFoundations />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-black-800">Khóa học 2: HTML và CSS</h2>
              <p className="text-lg mt-2">
                Khóa học này cung cấp kiến thức cơ bản về HTML và CSS, giúp bạn tạo ra các trang web cơ bản...
              </p>
              <div className="mt-4">
                <CardHTML />
              </div>
              <div className="mt-4">
                <CardHTMLPro />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-black-800">Khóa học 3: JavaScript</h2>
              <p className="text-lg mt-2">
                Với HTML, CSS bạn mới chỉ xây dựng được các websites tĩnh...
              </p>
              <div className="mt-4">
                <CardJava />
              </div>
              <div className="mt-4">
                <CardJavaPro />
              </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-black-800">Khóa học 4  : Node.js  </h2>
                <p className="text-lg mt-2">
                Node.js là một nền tảng chạy JavaScript phía backend, dùng để xây dựng server-side applications như API và ứng dụng thời gian thực. Nó hỗ trợ xử lý không đồng bộ, đáp ứng nhanh và mạnh mẽ trong việc xử lý nhiều yêu cầu đồng thời.            </p>
            </div>
            <div className="mt-4">
                <CardNode/>  
            </div>
            </div>
            <div>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-black-800">Khóa học 5  : SQL Server   </h2>
                <p className="text-lg mt-2">
                Cung cấp kiến thức từ cơ bản đến nâng cao về cách quản lý cơ sở dữ liệu, truy vấn SQL, và tối ưu hóa hệ thống. Học viên sẽ được hướng dẫn tạo bảng, xử lý dữ liệu, sử dụng các hàm, và thiết lập bảo mật,phù hợp để xây dựng các ứng dụng quản lý và hệ thống thông tin chuyên nghiệp.    </p>
            </div>
            <div className="mt-4">
                <CardSql />  
            </div>
        </div>
        <div>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-black-800">Khóa học 6  :  Libraries and Frameworks  </h2>
                <p className="text-lg mt-2">
                Một ứng dụng Back-end hiện đại có thể rất phức tạp, việc sử dụng code thuần (tự tay code từ đầu) không phải là một lựa chọn tốt. Vì vậy các Libraries và Frameworks ra đời nhằm đơn giản hóa, tiết kiệm thời gian và tiền bạc để nhanh chóng tạo ra được sản phẩm cuối cùng.               </p>
            </div>
            <div className="mt-4">
                <CardFrames  />  
            </div>
        </div>
          </div>
        </div>
      </div>
  );
}

export default BackendDetails;
