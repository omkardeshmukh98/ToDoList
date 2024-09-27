import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Taskbar from './Taskbar';

describe('<Taskbar />', () => {
  // Mock functions for testing
  const mockOnRefreshClick = jest.fn();
  const mockOnTaskSubmit = jest.fn();

  // Render the component before each test
  beforeEach(() => {
    render(
      <Taskbar onRefreshClick={mockOnRefreshClick} onTaskSubmit={mockOnTaskSubmit} />
    );
  });

  // Test that the Taskbar renders correctly
  it('renders the Taskbar with buttons', () => {
    expect(screen.getByText('Tasks')).toBeInTheDocument(); // Check for brand name
    expect(screen.getByRole('button', { name: /new task/i })).toBeInTheDocument(); // Check for New Task button
    expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument(); // Check for Refresh button
  });

  // Test that the modal opens when New Task button is clicked
  it('opens modal when New Task button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /new task/i })); // Click New Task button
    expect(screen.getByText('Create New Task')).toBeInTheDocument(); // Check if modal title is present
  });

  // Test that the modal closes when the close button is clicked
  it('closes modal when close button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /new task/i })); // Open the modal
    fireEvent.click(screen.getByRole('button', { name: /close/i })); // Click the close button
    expect(screen.queryByText('Create New Task')).not.toBeInTheDocument(); // Modal should not be present
  });

  // Test that form input fields are updated correctly
  it('updates form fields when input values change', () => {
    fireEvent.click(screen.getByRole('button', { name: /new task/i })); // Open the modal

    fireEvent.change(screen.getByLabelText('Assigned To'), { target: { value: 'Alice' } }); // Change Assigned To
    fireEvent.change(screen.getByLabelText('Due Date'), { target: { value: '2024-10-01' } }); // Change Due Date
    fireEvent.change(screen.getByLabelText('Comments'), { target: { value: 'This is a new task' } }); // Change Comments

    expect(screen.getByLabelText('Assigned To')).toHaveValue('Alice'); // Check updated value
    expect(screen.getByLabelText('Due Date')).toHaveValue('2024-10-01'); // Check updated value
    expect(screen.getByLabelText('Comments')).toHaveValue('This is a new task'); // Check updated value
  });

  // Test that onTaskSubmit is called with the correct data when the form is submitted
  it('calls onTaskSubmit with correct data when form is submitted', async () => {
    fireEvent.click(screen.getByRole('button', { name: /new task/i })); // Open the modal

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText('Assigned To'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'NOT_STARTED' } });
    fireEvent.change(screen.getByLabelText('Due Date'), { target: { value: '2024-10-01' } });
    fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'HIGH' } });
    fireEvent.change(screen.getByLabelText('Comments'), { target: { value: 'Task details' } });

    fireEvent.click(screen.getByRole('button', { name: /add task/i })); // Submit the form

    // Check if onTaskSubmit was called with the correct task details
    expect(mockOnTaskSubmit).toHaveBeenCalledWith({
      assignedTo: 'Alice',
      status: 'NOT_STARTED',
      dueDate: '2024-10-01',
      priority: 'HIGH',
      comments: 'Task details',
    });
  });

  // Test that onRefreshClick is called when Refresh button is clicked
  it('calls onRefreshClick when Refresh button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /refresh/i })); // Click Refresh button
    expect(mockOnRefreshClick).toHaveBeenCalled(); // Check if onRefreshClick was called
  });
});
