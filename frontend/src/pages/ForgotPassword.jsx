import { useState } from 'react'
import AxiosInstance from '../utils/AxiosInstance'

const PasswordResetRequest = () => {
    const [email, setEmail]=useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if (email) {
          const res = await AxiosInstance.post('forgot_password/', { email })
           if (res.status === 200) {
            console.log(res.data)
            alert('Password reset link has been sent to your email')
            
           } 
           setEmail("")
        }
        


    }

  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Enter your email address
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-accent text-white rounded-md hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent-dark"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordResetRequest