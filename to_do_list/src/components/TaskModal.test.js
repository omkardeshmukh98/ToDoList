import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskModal from './TaskModal';

// Describe the TaskModal component
describe('<TaskModal />', () => {
  // Mock functions for onClose and onSubmit events
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  // Sample task data
  const task = {
    title: 'Sample Task',
    description: 'This is a sample description.',
  };

  // Render the TaskModal component before each test
  beforeEach(() => {
    render(<TaskModal task={task} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
  });

  // Test 1: Verify the modal renders with task details
  it('renders the modal with task details', () => {
    // Expect the "Edit Task" text to be in the document
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    // Expect the title input field to have the task title value
    expect(screen.getByLabelText('Title')).toHaveValue(task.title);
    // Expect the description input field to have the task description value
    expect(screen.getByLabelText('Description')).toHaveValue(task.description);
  });

  // Test 2: Verify onSubmit is called with new task data
  it('calls onSubmit with the new task data', () => {
    // Simulate changing the title input field value
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Title' } });
    // Simulate changing the description input field value
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'New Description' } });
    
    // Simulate clicking the "Save" button
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    // Expect onSubmit to be called with the new task data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'New Title',
      description: 'New Description',
    });
  });

  // Test 3: Verify onClose is called when the modal is closed
  it('calls onClose when the modal is closed', () => {
    // Simulate clicking the "Close" button
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    // Expect onClose to be called
    expect(mockOnClose).toHaveBeenCalled();
  });
});