const AIPreview = () => {
  const aiResponse = localStorage.getItem('aiResponse');
  console.log(aiResponse)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'>
        <h1 className="text-center text-2xl font-semibold mb-20">Lộ trình học của bạn</h1>
        <div style={{ whiteSpace: 'pre-line' }}>
          {aiResponse}
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition mt-10">Save</button>
    </div>
  )
}

export default AIPreview