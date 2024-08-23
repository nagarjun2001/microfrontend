import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import UserRegister from '../Registration/UserRegister'; 

describe('UserRegister Component', () => {
  test('displays the registration title', () => {
    render(
      <Router>
        <UserRegister />
      </Router>
    );
    
    expect(screen.getByText(/Create Your Account/i)).toBeInTheDocument();
  });

  test('renders Register button', () => {
    render(
      <Router>
        <UserRegister />
      </Router>
    );
    
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  test('shows terms and conditions link', () => {
    render(
      <Router>
        <UserRegister />
      </Router>
    );
    
    expect(screen.getByText(/Terms and Conditions/i)).toBeInTheDocument();
  });
});
