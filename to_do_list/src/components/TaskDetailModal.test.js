import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskDetailModal from './TaskDetailModal';

describe('<TaskDetailModal />', () => {
  // Mock functions for testing
  const mockOnHide = jest.fn();
  const mockOnSave = jest.fn();

  // Sample task data for testing
  const task = {
    assignedTo: 'Alice',
    status: 'NOT_STARTED',
    dueDate: '2024-10-01',
    priority: 'HIGH',
    comments: 'Initial comments',
  };

  // Render the modal before each test
  beforeEach(() => {
    render(
      <TaskDetailModal task={task} show={true} onHide={mockOnHide} onSave={mockOnSave} />
    );
  });

  // Test that the modal renders with the correct task details
  it('renders the modal with task details', () => {
    expect(screen.getByText('Edit Task')).toBeInTheDocument(); // Check modal title
    expect(screen.getByLabelText('Assigned To')).toHaveValue(task.assignedTo); // Check assignedTo value
    expect(screen.getByLabelText('Status')).toHaveValue(task.status); // Check status value
    expect(screen.getByLabelText('Due Date')).toHaveValue(task.dueDate); // Check dueDate value
    expect(screen.getByLabelText('Priority')).toHaveValue(task.priority); // Check priority value
    expect(screen.getByLabelText('Comments')).toHaveValue(task.comments); // Check comments value
  });

  // Test that input fields update state correctly when changed
  it('updates state when input values change', () => {
    fireEvent.change(screen.getByLabelText('Assigned To'), { target: { value: 'Bob' } }); // Change assignedTo
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'IN_PROGRESS' } }); // Change status
    fireEvent.change(screen.getByLabelText('Due Date'), { target: { value: '2024-10-05' } }); // Change dueDate
    fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'NORMAL' } }); // Change priority
    fireEvent.change(screen.getByLabelText('Comments'), { target: { value: 'Updated comments' } }); // Change comments

    // Check that the inputs have the updated values
    expect(screen.getByLabelText('Assigned To')).toHaveValue('Bob');
    expect(screen.getByLabelText('Status')).toHaveValue('IN_PROGRESS');
    expect(screen.getByLabelText('Due Date')).toHaveValue('2024-10-05');
    expect(screen.getByLabelText('Priority')).toHaveValue('NORMAL');
    expect(screen.getByLabelText('Comments')).toHaveValue('Updated comments');
  });

  // Test that onSave is called with the updated task data when Save Changes is clicked
  it('calls onSave with the updated task when Save Changes is clicked', () => {
    fireEvent.change(screen.getByLabelText('Assigned To'), { target: { value: 'Bob' } }); // Change assignedTo
    fireEvent.click(screen.getByRole('button', { name: /save changes/i })); // Click Save Changes

    // Check if onSave was called with the updated task data
    expect(mockOnSave).toHaveBeenCalledWith({
      assignedTo: 'Bob',
      status: task.status,
      dueDate: task.dueDate,
      priority: task.priority,
      comments: task.comments,
    });
  });

  // Test that onHide is called when the Close button is clicked
  it('calls onHide when the Close button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /close/i })); // Click Close
    expect(mockOnHide).toHaveBeenCalled(); // Check if onHide was called
  });
});
