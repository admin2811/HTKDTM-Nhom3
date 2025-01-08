import { Home , Brain} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CohereClient } from 'cohere-ai'

const FormSection = () => {
    const cohere = new CohereClient({
        token: "STwjcOQ4QPWRBBw1ztnbOVUZBfsnF9HQicsVzi2U"
    })
    const [formData, setFormData] = useState({
        target: "",
        personal: "",
        experience: "",
        language: "",
        study: ""
    })
    
    const [predictedPath, setPredictedPath] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const getDetailedPathFromAI = async (path) => {
        try {
          const response = await cohere.generate({
            model: 'command-xlarge-nightly', // Hoặc mô hình phù hợp mà bạn muốn sử dụng
            prompt: `Hãy cung cấp lộ trình chi tiết hơn và link video học cho: ${path}`,
            max_tokens: 3000,
          });
          console.log(response)
          setAiResponse(response.generations[0].text.trim());
        } catch (error) {
          console.error('Error with AI response:', error);
        }
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(false); // Bắt đầu loading trước khi gửi request
        try {
          const response = await fetch('http://127.0.0.1:5000/api/predict-learning-path/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          console.log('Success:', data);
          setPredictedPath(data.predicted_path);
          // Xử lý dữ liệu trả về từ API nếu cần
          await getDetailedPathFromAI(data.predicted_path);
        } catch (error) {
          console.error('Error:', error);
          // Xử lý lỗi nếu cần
        } finally {
            setIsLoading(true); // Kết thúc loading sau khi có phản hồi
          }
      };
      
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    console.log(predictedPath)
    console.log(aiResponse)
    localStorage.setItem('aiResponse', aiResponse)
  return (
    <form onSubmit={handleSubmit}>
        <div className='p-5 shadow-lg rounded-lg border-t-orange-500 border-t-4 mt-10'>
            <div className='flex justify-between'>
                <Link className='p-3 bg-orange-500 rounded-lg text-white items-center text-center'><Home /></Link>
                <button type='submit' className='bg-white text-orange-300 p-3 border-orange-300 rounded-lg border-2 flex items-center space-x-2'>
                {!isLoading ? (
                    <svg className="animate-spin h-5 w-5 mr-3 rounded-xl border-2 border-t-orange-300" viewBox="0 0 24 24"></svg>
                 ): null}
                    <Brain className='' />
                    <span>Generate from AI</span>
                </button>
            </div>
            <h2 className='font-bold text-lg mt-10'>Personal Detail</h2>
            <p>Get Started with the basic information</p>
            <div className="mb-4">
            <div className='grid grid-cols-2 gap-4'>
                <div className="relative">
                    <select
                    id="target"
                    name="target"
                    value={formData.target}
                    onChange={handleChange}
                    className="appearance-none border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                    >
                    <option value="" disabled>
                        Chọn mục tiêu
                    </option>
                    <option value="học thêm">Học thêm</option>
                    <option value="học mới">Học mới</option>
                    <option value="đi làm">Đi làm</option>
                    </select>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                    </svg>
                </div>
                
                <div className="relative">
                    <select
                    id="personal"
                    name="personal"
                    value={formData.personal}
                    onChange={handleChange}
                    className="appearance-none border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                    >
                    <option value="" disabled>
                        Dự định làm cá nhân
                    </option>
                    <option value="có">Có</option>
                    <option value="không">Không</option>
                    </select>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                    </svg>
                </div>

                <div className="relative">
                    <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="appearance-none border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                    >
                    <option value="" disabled>
                        Kinh nghiệm
                    </option>
                    <option value="hoàn toàn mới">Hoàn toàn mới</option>
                    <option value="trung cập">Trung cấp</option>
                    <option value="nâng cao">Nâng cao</option>
                    </select>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                    </svg>
                </div>

                <div className="relative">
                    <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange} 
                    className="appearance-none border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                    >
                    <option value="" disabled>
                        Chọn Ngôn Ngữ
                    </option>
                    <option value="python">Python</option>
                    <option value="JavaScripts">Javascript</option>
                    <option value="Java">Java</option>
                    <option value="PHP">PHP</option>
                    <option value="Kotlin">Kotlin</option>
                    <option value="Khác">Khác</option>
                    </select>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                    </svg>
                </div>

                <div className="relative">
                    <select
                    id="study"
                    name="study"
                    value={formData.study}
                    onChange={handleChange}
                    className="appearance-none border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                    >
                    <option value="" disabled>
                        Chọn Thời gian học
                    </option>
                    <option value="dưới 1 tháng">Dưới 1 tháng</option>
                    <option value="1- 3 tháng">1 - 3 tháng</option>
                    <option value="3 - 6 tháng">3 - 6 tháng</option>
                    <option value="trên 6 tháng">Trên 6 tháng</option>
                    </select>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                    </svg>
                </div>
                </div>
          </div>
        </div>
    </form>
  )
}

export default FormSection