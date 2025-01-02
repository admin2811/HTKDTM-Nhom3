import React, { useState } from 'react';
import './Profile.css';
import Sidebar from "../common/sidebar/Sidebar";
import default_avatar from '../../../assets/img/avatar/default.png';
import { IoPersonSharp } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FiTrash } from "react-icons/fi";

const Profile = () => {
  const [name, setName] = useState("Nguyễn Văn A");
  const [email, setEmail] = useState("nguyenvana@gmail.com");
  const [bio, setBio] = useState("Học lập trình tại Fullstack.edu.vn");
  const [birthday, setBirthday] = useState("10/10/2000");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingBirthday, setIsEditingBirthday] = useState(false);

  const userAvatar = null;
  const avatarSrc = userAvatar ? userAvatar : default_avatar;

  const handleDelete = (field) => {
    if (field === "name") setName("");
    if (field === "email") setEmail("");
    if (field === "bio") setBio("");
    if (field === "birthday") setBirthday("");
  };

  const courses = [
    "Khóa học ReactJS cơ bản",
    "Khóa học NodeJS nâng cao",
    "Khóa học Frontend Developer",
  ];

  return (
    <div className="profile-page">
      <Sidebar />
      <div className='container-profile'>
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={avatarSrc} alt="Avatar" />
          </div>
          <div className="profile-name">
            <h2>{name}</h2>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-left">
            <label>Thông tin cá nhân</label>
            <form className="profile-form">
              <div className="profile-field">
                <IoPersonSharp className='icon-profile' />
                {isEditingName ? (
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <p>{name}</p>
                )}
    
              </div>

              <div className="profile-field">
                <IoMail className='icon-profile'/>
                {isEditingEmail ? (
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <p>{email}</p>
                )}
                
              </div>

              <div className="profile-field">
                <IoIosInformationCircleOutline className='icon-profile'/>
                {isEditingBio ? (
                  <input
                    id="bio"
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                ) : (
                  <p>{bio}</p>
                )}
                <div className='rd'>
                    <FaRegPenToSquare className='icon-rd' onClick={() => setIsEditingBio(!isEditingBio)} />
                    <FiTrash className='icon-rd' onClick={() => handleDelete("bio")} />
                </div>
              </div>

              <div className="profile-field">
                <LiaBirthdayCakeSolid className='icon-profile'/>
                {isEditingBirthday ? (
                  <input
                    id="birthday"
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                ) : (
                  <p>{birthday}</p>
                )}
                <div className='rd'>
                    <FaRegPenToSquare className='icon-rd' onClick={() => setIsEditingBirthday(!isEditingBirthday)} />
                    <FiTrash className='icon-rd' onClick={() => handleDelete("birthday")} />
                </div>
              </div>
            </form>
          </div>

          <div className="profile-right">
            <h2>Các khóa học đã tham gia</h2>
            <ul className="course-list">
              {courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
            {/* Video embedded */}
            <div className="course-video">
              <h3>Khóa học tập sự</h3>
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
      </div>
    </div>
  );
};

export default Profile;
