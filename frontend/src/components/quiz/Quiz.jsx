import React, { useRef, useState } from 'react'
import './Quiz.css'
import {data} from './data'
import { useNavigate } from "react-router-dom";
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

import { dataChart } from './dataChart';

function Quiz() {

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
    

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    const navigate = useNavigate();

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1, Option2, Option3, Option4];

    const checkAns = (e, ans) => {
        if (!lock) {
            const savedData = JSON.parse(localStorage.getItem("quizResult")) || { id_course: question.id_course };

            // So sánh đáp án người dùng chọn với đáp án đúng (cả hai đều là chuỗi)
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);  // Tăng điểm khi trả lời đúng
                savedData[index + 1] = "correct"; // Lưu kết quả đúng
                savedData.correctCount = (savedData.correctCount || 0) + 1; // Tăng số câu đúng
            } else {
                e.target.classList.add("wrong");
                savedData[index + 1] = "wrong"; // Lưu kết quả sai
                setLock(true);
                // Tìm phần tử chứa câu trả lời đúng và thêm class 'correct' cho nó
                // option_array.find(option => option.current.textContent === question.ans).current.classList.add("correct");
                option_array[question.ans.charCodeAt(0) - 65].current.classList.add("correct");
            }

             // Cập nhật tổng điểm (số câu đúng / tổng số câu * 10)
            savedData.totalScore = (savedData.correctCount / data.length) * 10;

            // Lưu dữ liệu cập nhật vào localStorage
            localStorage.setItem("quizResult", JSON.stringify(savedData));
            console.log("Kết quả hiện tại trong localStorage:", savedData);
        }
    }
    

    const next = () => {
        if (lock === true) {
            if (index === data.length-1){
                setResult(true);
                return 0;
            }

            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
        localStorage.removeItem("quizResult"); // Xóa dữ liệu kết quả trong localStorage
    }

    const back = () => {
        navigate("/dashboard");
    }

  return (
    <div className='quiz-container'>
        <h1>Kiểm tra cuối khóa</h1>
        <hr />
        {result?<></>: <>
            <h2>{index+1}. {question.question}</h2>
            <ul>
                <li ref={Option1} onClick={(e) => {checkAns(e, "A")}}>{question.option1}</li>
                <li ref={Option2} onClick={(e) => {checkAns(e, "B")}}>{question.option2}</li>
                <li ref={Option3} onClick={(e) => {checkAns(e, "C")}}>{question.option3}</li>
                <li ref={Option4} onClick={(e) => {checkAns(e, "D")}}>{question.option4}</li>
            </ul>
            <button onClick={next}>Câu tiếp theo</button>
            <div className="index">{index+1} / {data.length}</div>
        </>}
        
        {result?<>
            <h2>Bạn đã đúng được {score} trên {data.length} câu</h2>

            <div className="profile-shortcut">
                <h3 className="text-l font-semibold">Tỷ lệ làm đúng của các câu</h3>
                {/* <div id='superset-container'></div>  */}
                <Bar data={data_bieuDoCot} options={options_bieuDoCot} />
            </div>

            <div className="flex justify-between gap-2">
                <button onClick={reset}>Làm lại</button>
                <button onClick={back}>Quay về</button>
            </div>   
        </> : <></>}

    </div>
  )
}

export default Quiz
