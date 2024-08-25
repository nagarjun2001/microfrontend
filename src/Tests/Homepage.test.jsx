import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Homepage from '../components/Homepage';

jest.mock("axios");

jest.mock("react-router-dom");

describe('Homepage', () => {
    
    beforeEach(() => {
        render(<Homepage />);
    });

    test('renders app name', () => {
        const headlineElement = screen.getByText(/Welcome to KidsTube!/i);
        expect(headlineElement).toBeInTheDocument();
    });

    test('renders main text', () => {
        const paragraphElement = screen.getByText(/Discover fun and educational videos just for you./i);
        expect(paragraphElement).toBeInTheDocument();
    });

    test('renders explore button', () => {
        const buttonElement = screen.getByRole('link', { name: /Sign up now to Explore!/i });
        expect(buttonElement).toBeInTheDocument();
    });

    test('renders text of first section', () => {
        const sectionHeadline = screen.getByText(/Explore More Learning Opportunities!/i);
        expect(sectionHeadline).toBeInTheDocument();
        
        const sectionParagraph = screen.getByText(/Dive into our latest content designed to make learning fun and engaging for kids./i);
        expect(sectionParagraph).toBeInTheDocument();
    });

    test('renders text of second section', () => {
        const sectionHeadline = screen.getByText(/Engage with New Features!/i);
        expect(sectionHeadline).toBeInTheDocument();

        const sectionParagraph = screen.getByText(/Discover the latest features and updates on our platform./i);
        expect(sectionParagraph).toBeInTheDocument();
    });

    test('renders text of the third section', () => {
        const sectionHeadline = screen.getByText(/Discover More Content!/i);
        expect(sectionHeadline).toBeInTheDocument();

        const sectionParagraph = screen.getByText(/Explore our diverse range of videos and interactive content designed to keep kids engaged and learning./i);
        expect(sectionParagraph).toBeInTheDocument();
    });

    test('renders text of fourth section', () => {
        const sectionHeadline = screen.getByText(/Experience Interactive Learning!/i);
        expect(sectionHeadline).toBeInTheDocument();

        const sectionParagraph = screen.getByText(/Our interactive content helps kids learn through play and exploration./i);
        expect(sectionParagraph).toBeInTheDocument();
    });
});
