import React, { useState, DependencyList, useEffect } from 'react';
import './App.css';
import { Task } from './components/Types';
import TaskItemList from './components/TaskItemList';
import TaskInput from './components/TaskInput';
import { readAll } from './utils/api';

function useEffectAsync(
  effect: () => void,
  deps?: DependencyList
) {
  useEffect(() => {
    effect();
  }, deps);
}

const App: React.FC = () => {

  const [tasks, setTasks] = useState(Array<Task>())

  useEffectAsync(async () => {
    console.log('start');
    await readAll().then((initialState: Array<Task>) => setTasks(initialState));
    console.log('end');
  }, [])


  console.log("tasks:" + tasks)
  console.log('render start')
  return (
    <div>
      <TaskInput setTasks={setTasks} tasks={tasks} />
      <TaskItemList setTasks={setTasks} tasks={tasks} />
    </div>
  )

}

export default App;
