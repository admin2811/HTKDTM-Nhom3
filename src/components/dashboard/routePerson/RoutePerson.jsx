import { Link } from 'react-router-dom';
import AddRouter from './AddRouter';
import { useState, useEffect } from 'react';
import axios from 'axios';

const RoutePerson = () => {
  const [routers, setRouters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/routers/');
        setRouters(response.data); // Lưu dữ liệu nhận được vào state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleNewDataAdded = (newData) => {
    setRouters(prevRouters => [...prevRouters, newData]);
  };
  return (
    <>
      <div className='p-3 px-5 flex justify-between shadow-sm'>
        <div className="flex gap-2 items-center">
          <h1 className='text-3xl p-5 font-semibold'>Nhóm 3</h1>
        </div>
        <div className="flex items-center justify-end flex-grow">
          <Link to='/dashboard'>
            <button className='bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition'>
              Quay lại
            </button>
          </Link>
        </div>
      </div>
      <div className="p-10 md:px-20 lg:px-32">
        <h2 className='font-bold text-3xl'>My Resume</h2>
        <p>Start Creating AI resume to your next Job role</p>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
        <AddRouter onNewDataAdded={handleNewDataAdded} />
        {routers.map((router) => (
          <div key={router.id} className='p-5 shadow-lg rounded-lg border-t-orange-500 border-t-4 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
            <Link to={`/routePersonal/AICreateRoute/${router.id}`} className="text-lg font-semibold text-center block">
              {router.name}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default RoutePerson;
