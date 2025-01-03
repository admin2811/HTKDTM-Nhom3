import React from 'react'
import "./coursecard.css"
import { CiClock2 } from "react-icons/ci";
import { RiBookShelfLine } from "react-icons/ri";

function CourseCard(props) {
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
            <button className="btn-learn">Học ngay</button>
          </div>
        
        </div>
    </div>
  )
}

export default CourseCard

