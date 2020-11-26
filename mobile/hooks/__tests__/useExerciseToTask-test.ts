import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { ExerciseType } from '../../models/ExcerciseType';
import { Exercise } from '../../models/Exercise';

import useExerciseToTask from '../useExerciseToTask';

describe('useExerciseToTask', () => {
  let exercises: Exercise[] = [];
  beforeEach(() => {
    exercises = [
      {
        id: 'aaa',
        exerciseType: ExerciseType.Cardio,
        title: 'title1',
        description: 'description1',
        sets: 1,
        duration: 60,
        reps: 10,
      },
    ];

  });
  it('should return empty array if empty exercises', () => {
    const taskList = useExerciseToTask([]);
    expect(taskList.length).toBe(0);
  });
  it('should return empty array if null exercises', () => {
    const taskList = useExerciseToTask(null);
    expect(taskList.length).toBe(0);
  });
  it('should convert Exercise object to ExerciseType', () => {
    const taskList = useExerciseToTask(exercises);

    expect(taskList.length).toBe(1);
    expect(taskList[0].exerciseId).toBe('aaa');
    expect(taskList[0].exerciseType).toBe(ExerciseType.Cardio);
    expect(taskList[0].title).toBe('title1');
    expect(taskList[0].description).toBe('description1');
    expect(taskList[0].duration).toBe(60);
    expect(taskList[0].reps).toBe(10);
  });
  it('should convert Exercise object to ExerciseType', () => {
    exercises[0].sets = 3;

    const taskList = useExerciseToTask(exercises);

    expect(taskList.length).toBe(3);
    expect(taskList[0].exerciseId).toBe('aaa');
    expect(taskList[1].exerciseId).toBe('aaa');
    expect(taskList[2].exerciseId).toBe('aaa');
    // different IDs
    expect(taskList[0].id).not.toBe(taskList[1].id);
    expect(taskList[1].id).not.toBe(taskList[2].id);
  });
});
