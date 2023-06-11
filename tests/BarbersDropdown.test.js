import React from 'react';
import DropdownBarbers from '../src/Components/Dropdown';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';


// afterEach(cleanup())
test('renders dropdown with correct users', async () => {
  // Mock the response from the fetch request
  const mockUsers = [
    { Id: 1, Name: 'Barber 1' },
    { Id: 2, Name: 'Barber 2' }
  ];

  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(mockUsers),
  });

  // Render the dropdown component with props
  render(
    <DropdownBarbers
      users={mockUsers}
      selectedUserId={2}
      setSelectedUserId={jest.fn()}
      getFinishedSchedule={jest.fn()}
      setTimeSlot={jest.fn()}
      selectedTs={''}
    />
  );

  const dropdownButton = screen.getByTestId("dropdown-button");
  expect(dropdownButton).toHaveTextContent("Barber 2");

  // Open the dropdown menu
  fireEvent.click(dropdownButton);

  // Wait for the dropdown to populate with users
  const dropdownItems = await screen.findAllByTestId('dropdown-item');

  // Check if the correct number of items is displayed
  expect(dropdownItems).toHaveLength(mockUsers.length);

  // Check if the dropdown items display the correct user names
  expect(dropdownItems[0]).toHaveTextContent('Barber 1');
  expect(dropdownItems[1]).toHaveTextContent('Barber 2');

  // Cleanup
  global.fetch.mockRestore();
});

test('calls the proper functions when a dropdown item is clicked', async () => {
  const mockUsers = [
    { Id: 1, Name: 'Barber 1' },
    { Id: 2, Name: 'Barber 2' }
  ];

  // Create mock functions
  const setSelectedUserIdMock = jest.fn();
  const getFinishedScheduleMock = jest.fn();
  const setTimeSlotMock = jest.fn();

  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(mockUsers),
  });

  render(
    <DropdownBarbers
      users={mockUsers}
      selectedUserId={2}
      setSelectedUserId={setSelectedUserIdMock}
      getFinishedSchedule={getFinishedScheduleMock}
      setTimeSlot={setTimeSlotMock}
      selectedTs={''}
    />
  );

  const dropdownButton = screen.getByTestId("dropdown-button");
  fireEvent.click(dropdownButton); // Open the dropdown menu

  const dropdownItems = await screen.findAllByTestId('dropdown-item');

  // Simulate clicking the first dropdown item
  fireEvent.click(dropdownItems[0]);

  // Assert that the proper functions have been called with the expected arguments
  expect(setSelectedUserIdMock).toHaveBeenCalledWith(1);
  expect(getFinishedScheduleMock).toHaveBeenCalledWith(1);
  expect(setTimeSlotMock).toHaveBeenCalledWith('');

  // Cleanup
  global.fetch.mockRestore();
});