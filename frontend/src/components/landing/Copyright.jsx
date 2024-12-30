import React from 'react';
import { copyright } from './data';

const Copyright = () => {
  const { link1, link2, copyText, social } = copyright;

  return (
    <div
      className="flex flex-col items-center gap-y-2 lg:flex-row lg:justify-between"
      data-aos="fade-up"
      data-aos-offset="0"
      data-aos-delay="200"
    >
      {/* Links */}
      <div className="flex gap-x-6">
        <a
          className="hover:text-accent transition"
          href={link1.href}
          aria-label={link1.name}
        >
          {link1.name}
        </a>
        <a
          className="hover:text-accent transition"
          href={link2.href}
          aria-label={link2.name}
        >
          {link2.name}
        </a>
      </div>

      {/* Copyright Text */}
      <div className="text-center lg:text-left">{copyText}</div>

      {/* Social Icons */}
      {social && social.length > 0 && (
        <ul className="flex gap-x-[12px]">
          {social.map((item, index) => {
            const { href, icon } = item;
            return (
              <li key={index}>
                <a href={href} aria-label={`Social Link ${index + 1}`}>
                  <img src={icon} alt={`Social Icon ${index + 1}`} />
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Copyright;
