import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Quizz.css';
import { useNavigate, useParams } from "react-router-dom";
import Loading from '../common/loading/Loading';
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
function Quiz() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const dataStorage = localStorage.getItem("data");
    let username = '';
    if (dataStorage) {
        const parsedData = JSON.parse(dataStorage);
        username = parsedData.username;  // In ra 'test1'
    } else {
        console.log("No data found");
    }
    console.log(id);
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
    // Fetch data function
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:5000/quizz/${id}/`);
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setData(result.quizz || []);  // Set quizz data
            } else {
                console.error("Failed to fetch lessons");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();  // Call fetchData when the id changes
    }, [id, fetchData]);

    const [index, setIndex] = useState(0);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const navigate = useNavigate();
    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const option_array = [Option1, Option2, Option3, Option4];

    // Only set the question if data is available and index is within range
    const question = data[index] || {};  // Default to empty object if undefined

    // Ensure that the question is not undefined before rendering
    const checkAns = (e, ans) => {
        if (!lock) {
            const savedData = JSON.parse(localStorage.getItem("quizResult")) || { id_course: question.id_course };

            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
                savedData[index + 1] = "correct";
                savedData.correctCount = (savedData.correctCount || 0) + 1;
            } else {
                e.target.classList.add("wrong");
                savedData[index + 1] = "wrong";
                setLock(true);
                option_array[question.ans.charCodeAt(0) - 65].current.classList.add("correct");
            }

            savedData.totalScore = (savedData.correctCount / data.length) * 10;
            localStorage.setItem("quizResult", JSON.stringify(savedData));
        }
    };

    const next = () => {
        if (lock) {
            if (index === data.length - 1) {
                setResult(true);
                handlePostResult();  // Gọi hàm gửi kết quả lên server
                return;
            }

            setIndex(prevIndex => prevIndex + 1);
            setLock(false);
            option_array.forEach(option => {
                option.current.classList.remove("wrong", "correct");
            });
        }
    };

    const reset = () => {
        setIndex(0);
        setScore(0);
        setLock(false);
        setResult(false);
        localStorage.removeItem("quizResult");
    };

    const back = () => {
        navigate("/dashboard");
    };

    // Gửi kết quả bài kiểm tra lên server
    const handlePostResult = async () => {
        if (id && username) {
            try {
                const response = await fetch("http://127.0.0.1:5000/post_result", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        course_id: id,
                        user_name: username,
                        result: score,  // Gửi tổng số câu đúng
                    }),
                });

                const result = await response.json();
                
                if (response.ok) {
                    console.log("Successfully posted result:", result);
                } else {
                    console.error("Failed to post result:", result);
                }
            } catch (error) {
                console.error("Error posting result:", error);
            }
        } else {
            console.log("Missing id or username");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loading className="text-center" />
            </div>
        );
    }

    return (
        <div className='quiz-container'>
            <h1>Kiểm tra cuối khóa</h1>
            <hr />
            {result ? <h2>Bạn đã đúng được {score} trên {data.length} câu</h2> : <>
                {question.question && (
                    <>
                        <h2>{index + 1}. {question.question}</h2>
                        <ul>
                            <li ref={Option1} onClick={(e) => { checkAns(e, "A") }}>{question.option1}</li>
                            <li ref={Option2} onClick={(e) => { checkAns(e, "B") }}>{question.option2}</li>
                            <li ref={Option3} onClick={(e) => { checkAns(e, "C") }}>{question.option3}</li>
                            <li ref={Option4} onClick={(e) => { checkAns(e, "D") }}>{question.option4}</li>
                        </ul>
                        <button onClick={next}>Câu tiếp theo</button>
                        <div className="index">{index + 1} / {data.length}</div>
                    </>
                )}
            </>}
            <div className="profile-shortcut">
                <h3 className="text-l font-semibold">Tỷ lệ làm đúng của các câu</h3>
                {/* <div id='superset-container'></div>  */}
                <Bar data={data_bieuDoCot} options={options_bieuDoCot} />
            </div>
            <div className="flex justify-between gap-2">
                <button onClick={reset}>Làm lại</button>
                <button onClick={back}>Quay về</button>
            </div>
        </div>
    );
}

export default Quiz;
