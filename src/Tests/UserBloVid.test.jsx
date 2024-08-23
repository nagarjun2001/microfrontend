import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import BlockedVid from '../User/BlockedVid';

test('renders text and buttons correctly', () => {
    render(
        <Router>
            <BlockedVid />
        </Router>
    );
    expect(screen.getByText('Go Back')).toBeInTheDocument();
    expect(screen.getByText('Blocked Videos')).toBeInTheDocument();
    expect(screen.queryAllByText('Preview')).toHaveLength(0);
    expect(screen.queryAllByText('Unblock')).toHaveLength(0);
});
