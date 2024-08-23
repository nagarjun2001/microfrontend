import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CreatorRegister from '../Registration/CreatorRegister';

describe('CreatorRegister Component', () => {
  test('renders Creator Name input field with correct placeholder', () => {
    render(
      <Router>
        <CreatorRegister />
      </Router>
    );

    expect(screen.getByPlaceholderText(/Enter Creator Name/i)).toBeInTheDocument();
  });

  test('renders Channel Name input field with correct placeholder', () => {
    render(
      <Router>
        <CreatorRegister />
      </Router>
    );

    expect(screen.getByPlaceholderText(/Enter Channel Name/i)).toBeInTheDocument();
  });

  test('renders Email Id input field with correct placeholder', () => {
    render(
      <Router>
        <CreatorRegister />
      </Router>
    );

    expect(screen.getByPlaceholderText(/Enter Email Id/i)).toBeInTheDocument();
  });

  test('renders Password input field with correct placeholder', () => {
    render(
      <Router>
        <CreatorRegister />
      </Router>
    );

    expect(screen.getByPlaceholderText(/Enter Password/i)).toBeInTheDocument();
  });

  test('renders Confirm Password input field with correct placeholder', () => {
    render(
      <Router>
        <CreatorRegister />
      </Router>
    );

    expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
  });

  test('renders Register button', () => {
    render(
      <Router>
        <CreatorRegister />
      </Router>
    );

    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });
});
