import React, { useState } from 'react';
import { pricing } from './data';
import { HiCheck, HiOutlineArrowNarrowRight } from 'react-icons/hi';

const Pricing = () => {
  const [index, setIndex] = useState(1);
  const { title, cards } = pricing;

  return (
    <section className="section" data-aos="fade-up" data-aos-offset="200">
      <div className="container mx-auto">
        {/* Title */}
        <h2 className="h2 mb-10 lg:mb-20 text-center">{title}</h2>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row lg:gap-x-[30px] gap-y-[30px] lg:gap-y-0 justify-center items-center">
          {cards.map((card, cardIndex) => {
            const { icon, title, services, price, userAmount, btnText, delay } = card;
            return (
              <div key={cardIndex}>
                <div
                  data-aos="fade-up"
                  data-aos-delay={delay}
                  data-aos-offset="300"
                  onClick={() => setIndex(cardIndex)}
                  className={`${
                    cardIndex === index
                      ? 'bg-white shadow-2xl'
                      : 'border border-grey'
                  } w-[350px] h-[500px] rounded-[12px] p-[40px] cursor-pointer transition-all bg-pink-50`}
                >
                  {/* Icon */}
                  <div className="mb-8">
                    <img src={icon} alt={title} />
                  </div>

                  {/* Title */}
                  <div className="text-[32px] font-semibold mb-8">{title}</div>

                  {/* Services */}
                  <div className="flex flex-col gap-y-2 mb-6">
                    {services.map((service, serviceIndex) => (
                      <div
                        className="flex items-center gap-x-[10px]"
                        key={serviceIndex}
                      >
                        <HiCheck className="text-light" />
                        <div>{service.name}</div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="mb-10">
                    <div>
                      <span className="text-2xl font-semibold">{price}</span>
                      <span className="text-xl text-light font-light">
                        / year
                      </span>
                    </div>
                    <div className="text-base text-light">{userAmount}</div>
                  </div>

                  {/* Button */}
                  <button
                    className={`${
                      cardIndex === index
                        ? 'bg-accent hover:bg-accentHover text-white'
                        : 'border border-accent text-accent'
                    } btn btn-sm space-x-[14px]`}
                  >
                    <span>{btnText}</span>
                    <HiOutlineArrowNarrowRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
