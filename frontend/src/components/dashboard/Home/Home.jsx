import Navbar from "../common/navbar/Navbar";
import Sidebar from "../common/sidebar/Sidebar";
import "./home.css"
import CourseCard from "./CourseCard";
import course1 from '../../../assets/img/courses/course1.png'
import course2 from '../../../assets/img/courses/course2.png'
import course3 from '../../../assets/img/courses/course3.png'
import course4 from '../../../assets/img/courses/course4.png'
import slide1 from '../../../assets/img/slider/slide1.png'
import slide2 from '../../../assets/img/slider/slide2.png'
import slide3 from '../../../assets/img/slider/slide3.png'
import slide4 from '../../../assets/img/slider/slide4.png'
import ImageSlider from "./ImageSlider";

const Home = () => {

  const slides = [
    { url: slide1 },
    { url: slide2 },
    { url: slide3 },
    { url: slide4 },
  ]; 
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
          <Navbar />

          {/* Slider Section */}
          <div className="slider-section">
            <ImageSlider slides={slides} />
          </div>

          <div className="all-course">
            <div className="recommend-courses">
              <div className="catalog-title">Khóa học đề xuất</div>
              <div className="coursecard">
                <CourseCard
                  image={course1}
                  title="Kiến thức nền tảng"
                  price="1.250.000đ"
                  discount_price="1.000.000đ"
                  number_of_member="123.456"
                  total_time="1h33p"
                />
                <CourseCard
                  image={course2}
                  title="Kiến thức nền tảng"
                  price="1.250.000"
                  discount_price="1.000.000"
                  number_of_member="123.456"
                  total_time="1h33p"
                />
                <CourseCard
                  image={course3}
                  title="Kiến thức nền tảng"
                  price="1.250.000"
                  discount_price="1.000.000"
                  number_of_member="123.456"
                  total_time="1h33p"
                />
                <CourseCard
                  image={course4}
                  title="Kiến thức nền tảng"
                  price="1.250.000"
                  discount_price="1.000.000"
                  number_of_member="123.456"
                  total_time="1h33p"
                />
              </div>
            </div>
            <div className="hot-courses">
              <div className="catalog-title">Khóa học hot</div>
              <div className="coursecard">
                <CourseCard
                  image={course1}
                  title="Kiến thức nền tảng"
                  price="1.250.000đ"
                  discount_price="1.000.000đ"
                  number_of_member="123.456"
                  total_time="1h33p"
                />
                <CourseCard
                  image={course2}
                  title="Kiến thức nền tảng"
                  price="1.250.000"
                  discount_price="1.000.000"
                  number_of_member="123.456"
                  total_time="1h33p"
                />
                <CourseCard
                  image={course3}
                  title="Kiến thức nền tảng"
                  price="1.250.000"
                  discount_price="1.000.000"
                  number_of_member="123.456"
                  total_time="1h33p"
                />
                <CourseCard
                  image={course4}
                  title="Kiến thức nền tảng"
                  price="1.250.000"
                  discount_price="1.000.000"
                  number_of_member="123.456"
                  total_time="1h33p"
                />
              </div>
            </div>
          </div>    
      </div>
    </div>
  );
};

export default Home;