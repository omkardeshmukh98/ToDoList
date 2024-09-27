import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskTable from './TaskTable';

describe('<TaskTable />', () => {
  // Sample tasks data for testing
  const tasks = [
    { id: 1, assignedTo: 'Alice', status: 'NOT_STARTED', dueDate: '2024-10-01', priority: 'HIGH', comments: 'First task' },
    { id: 2, assignedTo: 'Bob', status: 'IN_PROGRESS', dueDate: '2024-10-05', priority: 'NORMAL', comments: 'Second task' },
  ];

  // Mock functions for handling edit and delete actions
  const onEditMock = jest.fn();
  const onDeleteMock = jest.fn();

  // Render the TaskTable component before each test
  beforeEach(() => {
    render(<TaskTable tasks={tasks} onEdit={onEditMock} onDelete={onDeleteMock} />);
  });

  // Test to check if the correct number of rows is rendered
  it('renders the correct number of rows', () => {
    const rows = screen.getAllByRole('row'); // Get all rows
    expect(rows).toHaveLength(tasks.length + 1); // +1 for the header row
  });

  // Test to ensure onEdit is called with the correct task when the Edit button is clicked
  it('calls onEdit when the Edit button is clicked', () => {
    const editButtons = screen.getAllByText('Edit'); // Get all Edit buttons
    fireEvent.click(editButtons[0]); // Click the first Edit button
    expect(onEditMock).toHaveBeenCalledWith(tasks[0]); // Check if onEdit was called with the first task
  });

  // Test to ensure onDelete is called with the correct task when the Delete button is clicked
  it('calls onDelete when the Delete button is clicked', () => {
    const deleteButtons = screen.getAllByText('Delete'); // Get all Delete buttons
    fireEvent.click(deleteButtons[0]); // Click the first Delete button
    expect(onDeleteMock).toHaveBeenCalledWith(tasks[0]); // Check if onDelete was called with the first task
  });
});
