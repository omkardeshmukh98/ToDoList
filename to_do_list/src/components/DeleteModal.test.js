import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteModal from './DeleteModal';

describe('<DeleteModal />', () => {
  // Mock functions for testing
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockTask = { title: 'Test Task' }; // Sample task for testing

  // Render the component before each test
  beforeEach(() => {
    render(
      <DeleteModal task={mockTask} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );
  });

  // Test that the modal renders correctly
  it('renders the DeleteModal with the correct task title', () => {
    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument(); // Check for modal title
    expect(screen.getByText('Do you want to delete the task "Test Task"?')).toBeInTheDocument(); // Check task title in message
  });

  // Test that the modal closes when the "No" button is clicked
  it('closes modal when "No" button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /no/i })); // Click the "No" button
    expect(mockOnClose).toHaveBeenCalled(); // Check if onClose was called
  });

  // Test that the confirmation function is called when the "Yes" button is clicked
  it('calls onConfirm when "Yes" button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /yes/i })); // Click the "Yes" button
    expect(mockOnConfirm).toHaveBeenCalled(); // Check if onConfirm was called
  });

  // Test that the modal handles undefined task correctly
  it('handles undefined task gracefully', () => {
    render(<DeleteModal task={undefined} onClose={mockOnClose} onConfirm={mockOnConfirm} />); // Render with no task
    expect(screen.getByText('Do you want to delete the task "undefined"?')).toBeInTheDocument(); // Check for undefined task handling
  });
});
