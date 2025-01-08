/* eslint-disable react/prop-types */
import { PlusSquare } from 'lucide-react'
import { useState,useEffect } from 'react'
import FormUser from './FormRoute';

const AddRouter = ({ onNewDataAdded }) => {
  const [addSection, setAddSection] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setAddSection(false);
        }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
        window.removeEventListener("keydown", handleKeyDown);
    };
}, []);
const handleFormClose = (newData) => {
    setAddSection(false);
    if (newData) {
      onNewDataAdded(newData); // Gọi callback khi có dữ liệu mới
    }
  };
  return (
    <>
    <div onClick={() => setAddSection(true)}>
        <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px]
        hover:scale-105 transition-all hover:shadow-md
        cursor-pointer border-dashed ml-32'>
            <PlusSquare/>
        </div>
    </div>
    {addSection && (
        <FormUser onClose={handleFormClose} />
    )}
    </>
  )
}

export default AddRouter