import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import UserHomepage from '../User/UserHomepage';

describe('UserHomepage Component', () => {
  test('renders the Featured Videos title', () => {
    render(
      <Router>
        <UserHomepage />
      </Router>
    );
    const featuredVideosTitle = screen.getByText(/Featured Videos/i);
    expect(featuredVideosTitle).toBeInTheDocument();
  });

  test('renders the Filter by Category label', () => {
    render(
      <Router>
        <UserHomepage />
      </Router>
    );
    const filterByCategoryLabel = screen.getByText(/Filter by Category:/i);
    expect(filterByCategoryLabel).toBeInTheDocument();
  });

  test('renders category filter options', () => {
    render(
      <Router>
        <UserHomepage />
      </Router>
    );
  });
});
