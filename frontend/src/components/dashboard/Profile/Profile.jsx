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

import { dataChart } from './dataChart';

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

  const data_bieuDoCot = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [
      {
        label: '1',
        data: Object.values(dataChart).filter(value => value !== "id_course"), // Use values for the chart data
        backgroundColor: '#1FA8C9',
        borderColor: '#1FA8C9',
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
    scales: {
        y: {
            ticks: {
                beginAtZero: true,
                stepSize: 20,  // Đặt khoảng cách giữa các giá trị là 20
            },
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
          <Bar data={data_bieuDoCot} options={options_bieuDoCot} />
        </div>

      </div>
    </div>
  );
};

export default Profile;
