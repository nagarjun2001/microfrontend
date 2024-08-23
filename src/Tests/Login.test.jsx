import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Login/Login';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
 
const mock = new MockAdapter(axios);
 
const mockNavigate = jest.fn();
useNavigate.mockReturnValue(mockNavigate);
 
afterEach(() => {
    mock.reset();
});


test('renders all login text', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    const loginElements = screen.getAllByText('Login');
    expect(loginElements).toHaveLength(3); // Adjust based on your component
  });

test('renders select user type label', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    expect(screen.getByText('Select User Type')).toBeInTheDocument();
});

test('renders email label', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    expect(screen.getByText('Email')).toBeInTheDocument();
});

test('renders password label', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    expect(screen.getByText('Password')).toBeInTheDocument();
});
