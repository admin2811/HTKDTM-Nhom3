const AIPreview = () => {
  const aiResponse = localStorage.getItem('aiResponse');

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'>
        <h1 className="text-center text-2xl font-semibold">Lộ trình học của bạn</h1>
        <div>
          {aiResponse}
        </div>
    </div>
  )
}

export default AIPreview