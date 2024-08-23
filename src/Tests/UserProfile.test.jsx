import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import UserProfile from '../User/UserProfile';

jest.mock('axios');

describe('UserProfile', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        uname: 'nagarjun',
        fname: 'Nagarjun',
        lname: 'N S',
        email: 'nagarjun@gmail.com',
        password: 'password123',
        mobno: '9894374742',
        childAge: '5 Years',
      }
    });
    axios.put.mockResolvedValue({ data: 'Success' });
  });

  test('renders profile information and buttons', async () => {
    render(
      <Router>
        <UserProfile />
      </Router>
    );
    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
      expect(screen.getByText('Go Back')).toBeInTheDocument();
      expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });
  });
});
