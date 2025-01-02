import { useState } from "react";
import './slider.css'

const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const goToPrevious = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
  
    const goToNext = () => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };
  
    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };
  
    return (
      <div className="slider-section">
        {/* Arrow Buttons */}
        <div className="arrow left" onClick={goToPrevious}>
          ❰
        </div>
        <div className="arrow right" onClick={goToNext}>
          ❱
        </div>
  
        {/* Current Slide */}
        <div
          className="slide"
          style={{
            backgroundImage: `url(${slides[currentIndex].url})`,
          }}
        ></div>
  
        {/* Dots */}
        <div className="dots">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              className={`dot ${slideIndex === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(slideIndex)}
            ></div>
          ))}
        </div>
      </div>
    );
  };
  

export default ImageSlider;
 