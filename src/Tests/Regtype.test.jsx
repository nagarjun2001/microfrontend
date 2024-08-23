import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Regtype from '../components/Regtype';

describe('Regtype Component', () => {
  test('renders Creators title', () => {
    render(<MemoryRouter><Regtype /></MemoryRouter>);
    expect(screen.getByText('Content Creators')).toBeInTheDocument();
  });

  test('renders Creators text', () => {
    render(<MemoryRouter><Regtype /></MemoryRouter>);
    expect(screen.getByText('Showcase your content and reach a global audience. Share your creative work with the world.')).toBeInTheDocument();
  });

  test('renders Register as Creator button', () => {
    render(<MemoryRouter><Regtype /></MemoryRouter>);
    expect(screen.getByRole('link', { name: /Register as Creator/i })).toBeInTheDocument();
  });

  test('renders Parent Reg title', () => {
    render(<MemoryRouter><Regtype /></MemoryRouter>);
    expect(screen.getByText('Parents')).toBeInTheDocument();
  });

  test('renders Parent Reg text', () => {
    render(<MemoryRouter><Regtype /></MemoryRouter>);
    expect(screen.getByText('Access diverse and engaging content tailored just for you and also get access to Parental Controls!')).toBeInTheDocument();
  });

  test('renders Register parent button', () => {
    render(<MemoryRouter><Regtype /></MemoryRouter>);
    expect(screen.getByRole('link', { name: /Register as Parent/i })).toBeInTheDocument();
  });
});
