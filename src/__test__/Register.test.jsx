/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Register from '../pages/Register';

// Test to check if the Register component renders correctly and contains the "Register" button
test('renders Register component with "Register" button', () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  // Kiểm tra xem button với text "Register" có trong component không
  const registerButton = screen.getByRole('button', { name: /Đăng Ký/i });
  
  // Kiểm tra nếu button được render
  expect(registerButton).toBeInTheDocument();
});
