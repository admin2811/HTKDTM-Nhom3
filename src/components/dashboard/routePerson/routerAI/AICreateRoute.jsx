import AIPreview from "./AIPreview";
import FormSection from "./FormSection";
import { Link } from "react-router-dom";
function AICreateRoute () {
    return (
        <div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
            <FormSection />
            <AIPreview />
        </div>
        </div>
    )
}

export default AICreateRoute;