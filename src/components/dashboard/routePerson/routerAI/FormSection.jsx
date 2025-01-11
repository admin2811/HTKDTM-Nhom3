import { Home , Brain} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CohereClient } from 'cohere-ai'

const FormSection = () => {
    const cohere = new CohereClient({
        token: "wqTgBWBhOoI9Ufc6BjyH9ksus6eRa2Dp7pXZzT5l"
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
            model: 'command-xlarge', 
            prompt: `Hãy cung cấp một lộ trình chi tiết và link video cho: ${path}, kết nối tất cả các phần lại với nhau trong một câu văn liền mạch, đừng tách thành các câu riêng biệt. Hãy luôn luôn bắt đầu với phần giới thiệu: "Dưới đây là một vài bài học trong các khoá học của tôi, hãy tham khảo và học theo nhé!"`,
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
        setIsLoading(false);
        try {
          console.log(formData)
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
          await getDetailedPathFromAI(data.predicted_path);
        } catch (error) {
          console.error('Error:', error);
        } finally {
            setIsLoading(true);
          }
      };
      
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    console.log(predictedPath)
    console.log(aiResponse)
    localStorage.setItem('aiResponse', aiResponse)
    const aiResponseData = localStorage.getItem('aiResponse');
    console.log(aiResponseData)
    const getLanguageOptions = () => {
        if (formData.target === 'Xây dựng website') {
          return ['PHP', 'JavaScript'];
        }
        if (formData.target === 'Phát triển ứng dụng điện thoại di động') {
          return ['Java', 'Kotlin'];
        }
        if (formData.target === 'Làm việc trong lĩnh vực AI') {
          return ['Python'];
        }
        return [];
      };
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
                    <option value="Xây dựng website">Xây dựng Website</option>
                    <option value="Phát triển ứng dụng điện thoại di động">Phát triển ứng dụng điện thoại di động</option>
                    <option value="Làm việc trong lĩnh vực AI">Làm việc trong lĩnh vực AI</option>
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
                    <option value="Có">Có</option>
                    <option value="Không">Không</option>
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
                    <option value="Hoàn toàn mới">Hoàn toàn mới</option>
                    <option value="Trung cấp (biết làm việc với API, giải bài toán phức tạp)">Trung cấp</option>
                    <option value="Nâng cao (có kinh nghiệm xây dựng dự dán thực tế)">Nâng cao</option>
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
                {getLanguageOptions().map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))}
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
                    <option value="Dưới 1 tháng">Dưới 1 tháng</option>
                    <option value="1-3 tháng">1 - 3 tháng</option>
                    <option value="3-6 tháng">3 - 6 tháng</option>
                    <option value="Hơn 6 tháng">Trên 6 tháng</option>
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