/* eslint-disable react/prop-types */
import "../home/coursecard.css"
import { CiClock2 } from "react-icons/ci";
import { RiBookShelfLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState } from "react";

function CourseCardPayement(props) {
    const [response, setResponse] = useState(null);

    const createPaymentLink = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/create_payment_link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setResponse(data);
        console.log('Payment link:', response);
      } catch (error) {
        console.error('Error creating payment link:', error);
      }
    };
  return (
    <div className='coursecard'>
      <div className="courseBox">
          <img src={props.image} alt="" />
          <div className="description">
            <p className='title'>{props.title}</p>
            <p className="price"><span>{props.price}</span>{props.discount_price}</p>
            <div className='detail-course'>
              <div className='number-of-lessions'>
                <RiBookShelfLine className='icon'/>
                <p className='number'>{props.number_of_lessions}</p>
              </div>
              <div className='total-time'>
                <CiClock2 className='icon'/>
                <p className='time'>{props.total_time}</p>
              </div>
            </div>
            <Link  className="btn-learn" to='https://pay.payos.vn/web/da634d9e57364680afdbd74ca20af746' target="_blank">
                <button onClick={createPaymentLink}>{props.category === 'vip' ? 'Mua Ngay' : 'Học Ngay'}</button>
            </Link>
          </div>
      </div>
    </div>
  )
}

export default CourseCardPayement
