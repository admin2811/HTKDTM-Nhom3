import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AOS from "aos"; 
import "aos/dist/aos.css";
import Navbar from "./common/navbar/Navabar";
import Sidebar from "./common/sidebar/Sidebar";
import "./home.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Card from "../popularRoute/CardFrontEnd";
import CardBackend from "../popularRoute/CardBackEnd";
 
const Course = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Thời gian animation
      once: true,     // Animation chỉ chạy 1 lần
    });
  }, []);

  const frontEndIcons = [
    { icon: "fa-solid fa-file", text: "Nhập môn IT", link: "" },
    { icon: "fa-brands fa-html5", text: "Khóa học HTML CSS", link: "" },
    { icon: "fa-brands fa-js-square", text: "Khóa học Javascript", link: "https://example.com/js" },
    { icon: "fa-brands fa-react", text: "Khóa học React JS", link: "https://example.com/react" },
  ];

  const backendIcons = [
    { icon: "fa-solid fa-file", text: "Nhập môn IT", link: "" },
    { icon: "fa-brands fa-js-square", text: "Khóa học Javascript", link: "https://example.com/js" },
    { icon: "fa-brands fa-node", text: "Khóa học Node.js", link: "https://example.com/node" },
    { icon: "fa-solid fa-database", text: "Khóa học SQLServer", link: "https://example.com/mongodb" },
    { icon: "fa-solid fa-server", text: "Khóa học quản lý Server", link: "https://example.com/server" },
    { icon: "fa-solid fa-code", text: "Khóa học xây dựng API", link: "https://example.com/api" },
    { icon: "fa-brands fa-html5", text: "Khóa học HTML CSS Pro", link: "" },
  ];

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <header className="text-black p-4" data-aos="fade-down" data-aos-offset="400">
          <h1 className="text-center text-3xl font-bold">Lộ trình học phổ biến</h1>
          <p className="mt-4 text-center text-xl">
            Hầu hết các trang web và ứng dụng di động ngày nay đều được chia thành hai phần chính: Front-end và Back-end.
          </p>
          <p className="text-center text-xl mt-4">
            Nếu bạn muốn tạo ra những trải nghiệm trực quan ấn tượng cho người dùng, hãy chọn "lộ trình Front-end", nơi bạn sẽ học cách biến ý tưởng thành hiện thực qua mã code.
          </p>
          <p className="text-center text-xl mt-4">
            Để xây dựng nền tảng vững chắc cho các ứng dụng web, "lộ trình Back-end" sẽ là lựa chọn lý tưởng, giúp bạn hiểu rõ cách thức hoạt động của máy chủ và cơ sở dữ liệu.
          </p>
        </header>
        <div className="flex mt-8 justify-start gap-0">
          {/* Thẻ Front-end */}
          <div className="w-1/2 m-0 p-0" data-aos="fade-right">
            <Card
              name="Lộ trình học Front-end"
              title="Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này EduWeb chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé."
              icons={frontEndIcons}
              navigateTo="/dashboard/road/frontend-details"
            />
          </div>

          {/* Thẻ Back-end */}
          <div className="w-1/2 m-0 p-0" data-aos="fade-left">
            <CardBackend
              name="Lộ trình học Back-end"
              title="Lập trình viên Back-end là người làm việc với dữ liệu, công việc nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học Back-end nhé."
              icons={backendIcons}
              navigateTo="/dashboard/road/backend-details"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
