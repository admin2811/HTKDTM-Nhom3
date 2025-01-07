import React from "react";
import Navbar from "../../components/dashboard/common/navbar/Navabar";
import Sidebar from "../../components/dashboard/common/sidebar/Sidebar";
import "../dashboard/home.css";

import CardFoundations from "./cardFrontEnd/CardFoundations";
import CardHTML from "./cardFrontEnd/CardHTML";
import CardHTMLPro from "./cardFrontEnd/CardHTMLPro";
import CardJava from "./cardFrontEnd/CardJava";
import CardJavaPro from "./cardFrontEnd/CardJavaPro";
import CardReact from "./cardFrontEnd/CardReact";

function FrontendDetails() {
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
          <h1 className="text-4xl text-center font-bold text-black-800" >Chi tiết Lộ trình học Front-end</h1>
        
        <p className="mt-4  text-lg  ">          Front-end là phần giao diện mà người dùng có thể nhìn thấy và trực tiếp tương tác, chẳng hạn như các ứng dụng di động hoặc website mà bạn đã từng sử dụng.
        </p>
        <p className="mt-4  text-lg  ">          Lập trình viên Front-end chịu trách nhiệm thiết kế giao diện người dùng sao cho đẹp mắt, dễ sử dụng và mang lại trải nghiệm người dùng tốt nhất. Đây là công việc đòi hỏi sự sáng tạo và tinh tế trong từng chi tiết.
        </p>
        
        <p className="mt-4  text-lg  ">          EduWeb cung cấp các khóa học chuyên sâu, giúp bạn trang bị kiến thức và kỹ năng cần thiết để bắt đầu sự nghiệp lập trình viên Front-end.
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

            <div className="mt-8"  >
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

            <div className="mt-8"  >
              <h2 className="text-2xl font-semibold text-black-800">Khóa học 4: Libraries and Frameworks</h2>
              <p className="text-lg mt-2">
                Một websites hay ứng dụng hiện đại rất phức tạp, chỉ sử dụng HTML, CSS...
              </p>
              <div className="mt-4">
                <CardReact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontendDetails;
