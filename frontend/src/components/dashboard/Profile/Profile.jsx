import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import "./Profile.css";
import course1 from "../../../assets/img/courses/course1.png";
import default_avatar from "../../../assets/img/avatar/default.png";
import Sidebar from "../common/sidebar/Sidebar";
import { LuCalendarClock } from "react-icons/lu";
import { IoMail } from "react-icons/io5";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdOutlinePlayLesson } from "react-icons/md";
import { BsBookmarkCheck } from "react-icons/bs";

import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Đăng ký các thành phần của chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const supersetUrl = "http://ec2-3-106-58-241.ap-southeast-2.compute.amazonaws.com";
const supersetApiUrl = supersetUrl + '/api/v1/security';
const dashboardId = "07493a36-64c7-48ac-90e5-72d8ff7998e7";

async function getToken() {
  // calling login to get access token
  const login_body = {
    "password": "admin",
    "provider": "db",
    "refresh": true,
    "username": "admin"
  };

  const login_headers = {
    "headers": {
      "Content-Type": "application/json"
    }
  };

  console.log(supersetApiUrl + '/login');
  const { data } = await axios.post(supersetApiUrl + '/login', login_body, login_headers);
  const access_token = data['access_token'];
  console.log(access_token);

  // Calling guest token
  const guest_token_body = JSON.stringify({
    "resources": [
      {
        "type": "dashboard",
        "id": dashboardId,
      }
    ],
    "rls": [],
    "user": {
      "username": "report-viewer",
      "first_name": "report-viewer",
      "last_name": "report-viewer",
    }
  });

  const guest_token_headers = {
    "headers": {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`,
    }
  };

  console.log(supersetApiUrl + '/guest_token/');
  console.log(guest_token_body);
  console.log("guest token: ",guest_token_headers);

  // Fetch the guest token and embed the dashboard
  await axios.post(supersetApiUrl + '/guest_token/', guest_token_body, guest_token_headers).then(dt=>{
    console.log(dt.data['token']);
    embedDashboard({
      id: dashboardId, // given by the Superset embedding UI
      supersetDomain: supersetUrl,
      mountPoint: document.getElementById("superset-container"), // html element in which iframe render
      fetchGuestToken: () => dt.data['token'],
      dashboardUiConfig: { hideTitle: true }
    });
  })
  

  var iframe = document.querySelector("iframe");
  if (iframe) {
    iframe.style.width = '50%'; // Set the width as needed
    iframe.style.minHeight = '50vw'; // Set the height as needed
  }
}

const Profile = () => {
  const [name, setName] = useState("Nguyễn Văn A");
  const [email, setEmail] = useState("nguyenvana@gmail.com");
  const [bio, setBio] = useState("Học lập trình tại Fullstack.edu.vn");
  const [birthday, setBirthday] = useState("10/10/2000");

  const defaultAvatar = default_avatar;
  const userAvatar = null;
  const avatarSrc = userAvatar ? userAvatar : defaultAvatar;

  const courses = [
    "Khóa học ReactJS cơ bản",
    "Khóa học NodeJS nâng cao",
    "Khóa học Frontend Developer",
  ];

  useEffect(() => {
    getToken(); // Gọi hàm getToken chỉ khi component được mount lần đầu
  }, []); // Dependency array trống để chỉ gọi 1 lần

  const data_bieuDoCot = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: 'Tỷ lệ làm đúng',
        data: [100, 100, 50, 50, 50, 60],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options_bieuDoCot = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const data_bieuDoTron = {
    labels: ['Đã học', 'Chưa học'],
    datasets: [
      {
        label: 'Số lượng bài học',
        data: [6, 4], // 6 bài đã học và 4 bài chưa học
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options_bieuDoTron = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} bài`;
          },
        },
      },
    },
  };

  return (
    <div className="profile-page">
      <Sidebar />
      <div className="w-full xl:w-2/3 profile-container">
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">
              <img src={avatarSrc} alt="User Avatar" className="rounded-full" />
            </div>
            <div className="profile-detail">
              <div className="profile-card-info">
                <h1 className="profile-name">{name}</h1>
              </div>
              <p className="profile-bio">{bio}</p>
              <div className="profile-info-detail">
                <div className="profile-field">
                  <LiaBirthdayCakeSolid className="icon-profile" />
                  <span className="profile-birthday">{birthday}</span>
                </div>
                <div className="profile-field">
                  <IoMail className="icon-profile" />
                  <span className="profile-email">{email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-small-card">
            <div className="profile-box">
              <FaRegCalendarCheck className="icon" />
              <div className="text-box">
                <p className="small-card-content">90%</p>
                <p className="small-card-text">Hoàn thành khóa học</p>
              </div>
            </div>
            <div className="profile-box">
              <LuCalendarClock className="icon" />
              <div className="text-box">
                <p className="small-card-content">6 tháng</p>
                <p className="small-card-text">Thời gian học</p>
              </div>
            </div>
            <div className="profile-box">
              <MdOutlinePlayLesson className="icon" />
              <div className="text-box">
                <p className="small-card-content">18</p>
                <p className="small-card-text">Bài đã học</p>
              </div>
            </div>
            <div className="profile-box">
              <BsBookmarkCheck className="icon" />
              <div className="text-box">
                <p className="small-card-content">5</p>
                <p className="small-card-text">Khóa học đã học</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-bottom">
          <h1 className="title-bottom">Các khóa học đã tham gia</h1>
          <ul className="course-list">
            {courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
          <div className="course-video">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/1nA33oSe0Qc?si=1rRTWYIuYScrJrpy"
              title="Khóa học tập sự"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="w-full xl:w-1/4 flex flex-col gap-4 profile-right-sidebar">
        <div className="profile-shortcut">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/list/lessons">
              Lessons
            </Link>
            <Link className="p-3 rounded-md bg-lamaPurpleLight" href="/list/teachers">
              Teachers
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href="/list/exams">
              Exams
            </Link>
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/list/assignments">
              Assignments
            </Link>
            <Link className="p-3 rounded-md bg-lamaYellowLight" href="/list/results">
              Results
            </Link>
          </div>
        </div>

        <div className="profile-shortcut">
          <h2 className="text-xl font-semibold">Khóa học JavaScript cơ bản</h2>
          <Pie data={data_bieuDoTron} options={options_bieuDoTron} />
        </div>
        <div className="profile-shortcut">
          <h2 className="text-xl font-semibold">Bảng đánh giá các câu hỏi bài test</h2>
          {/* <div id='superset-container'></div>  */}
          <Bar data={data_bieuDoCot} options={options_bieuDoCot} />
        </div>

      </div>
    </div>
  );
};

export default Profile;
