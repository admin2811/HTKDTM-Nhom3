import "./home_course.css";
import CourseCard from "./CourseCard";
import course1 from '../../../assets/img/course/course1.png';
import course2 from '../../../assets/img/course/course2.png';
import course3 from '../../../assets/img/course/course3.png';
import course4 from '../../../assets/img/course/course4.png';
import Loading from '../common/loading/Loading'
import { useState, useEffect } from "react";
const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = localStorage.getItem("data");
        const parsedData = rawData ? JSON.parse(rawData) : null;

        const response = await fetch("http://127.0.0.1:5000/api/recommended_course/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(typeof result.data);
          setData(result.data);
          setCourses(JSON.parse(result.data)|| []);
          console.log(courses)
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading className="text-center" />
      </div>
    );
  }
  

  if (!data) {
    return <div className="justify-center items-center text-center mx-auto">Failed to load data. Please try again later.</div>;
  }
  // const courses = [
  //   {
  //     id: 1,
  //     image: course1,
  //     title: "Kiến thức nền tảng",
  //     price: "1.250.000đ",
  //     discount_price: "1.000.000đ",
  //     number_of_lessions: "10",
  //     total_time: "1h33p",
  //   },
  //   {
  //     id: 2,
  //     image: course2,
  //     title: "Kiến thức nền tảng",
  //     price: "1.250.000đ",
  //     discount_price: "1.000.000đ",
  //     number_of_lessions: "10",
  //     total_time: "1h33p",
  //   },
  //   {
  //     id: 3,
  //     image: course3,
  //     title: "Kiến thức nền tảng",
  //     price: "1.250.000đ",
  //     discount_price: "1.000.000đ",
  //     number_of_lessions: "10",
  //     total_time: "1h33p",
  //   },
  //   {
  //     id: 4,
  //     image: course4,
  //     title: "Kiến thức nền tảng",
  //     price: "1.250.000đ",
  //     discount_price: "1.000.000đ",
  //     number_of_lessions: "10",
  //     total_time: "1h33p",
  //   },
  // ];
  // console.log(courses)
  return (
    <div className="home flex justify-center mx-auto items-center">
      <div className="all-course container max-w-7xl mx-auto px-4">
        {/* <div className="bg-white shadow-lg p-6 rounded-md mb-20">
        <iframe
            width="600px"
            height="400px"
            seamless
            frameBorder="0"
            scrolling="no"
            src="http://ec2-3-106-58-241.ap-southeast-2.compute.amazonaws.com/superset/explore/p/J06K8143BwX/?standalone=1&height=400"
          >
        </iframe>
        </div> */}
        {/* Danh sách khóa học đề xuất */}
        <div className="recommend-courses mb-10">
          <div className="catalog-title">Khóa học đề xuất</div>
          <div className="flex gap-6 mt-5 flex-wrap">
          {Array.isArray(courses) && courses.slice(0, 5).map((course, index) => (
              <CourseCard
                key={index}
                id={course.id}
                image={course1}
                title={course.course_name}
                price="Free"
                number_of_lessions={course.number_of_lessions}
                total_time={course.duration}
              />
            ))}
          </div>
        </div>
        <div className="all-course mb-20">
            <div className="recommend-courses">
              <div className="catalog-title">Khóa học Trả Phí</div>
              <div className="flex gap-6 mt-5">
                <CourseCard
                  image={course1}
                  title="Kiến thức nền tảng"
                  price="1.250.000đ"
                  discount_price="1.000.000đ"
                  number_of_lessions="10"
                  total_time="1h33p"
                  category="vip"
                />
                <CourseCard
                  image={course2}
                  title="Kiến thức nền tảng"
                  price="1.250.000"
                  discount_price="1.000.000"
                  number_of_lessions="10"
                  total_time="1h33p"
                  category="vip"
                />
              </div>
            </div>
          </div>
        {/* Danh sách khóa học hot */}
        <div className="hot-courses">
          <div className="catalog-title">Khóa học miễn phí</div>
          <div className="flex flex-wrap gap-6 mt-5 mb-20">
            {courses.map((course, index) => (
              <CourseCard
                key={index}
                id={course.id}
                image={course3}
                title={course.course_name}
                price="Free"
                number_of_lessions={course.number_of_lessions}
                total_time={course.duration}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Home;
