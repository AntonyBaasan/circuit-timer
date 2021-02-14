import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Workout } from '../../../models/Workout';
import WorkoutListItem from '../WorkoutListItem';

describe('', () => {});

test('render workout item', () => {
  const mockClickStart = jest.fn();
  const mockClickDetails = jest.fn();
  const mockDelete = jest.fn();
  const mockIsAndroid21 = true;
  const item = {
    title: 'Test workout',
  } as Workout;

  jest.mock('../../../hooks/usePlatformInfo', () => {
    return jest.fn(() => {
      isAndroid21: mockIsAndroid21;
    });
  });

  const { getAllByA11yLabel, getByText } = render(
    <WorkoutListItem
      item={item}
      clickStart={mockClickStart}
      clickDetails={mockClickDetails}
      delete={mockDelete}
    />
  );

  expect(getByText('Test workout')).toBeTruthy();
});
