import React, { useState, useEffect, DependencyList } from 'react';
import './App.css';
import { Task, FaunaResponse } from './components/Types';
import TaskItemList from './components/TaskItemList';
import TaskInput from './components/TaskInput';

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
    var initialState: Array<Task> = Array<Task>();
    const res = await fetch(
      './.netlify/functions/fauna-crud'
      ).then((response: Response) => {
        response.json().then((faunaResponse: Array<FaunaResponse>) => {
            faunaResponse.map((item: FaunaResponse) => {
                console.log(item.data)
              initialState.push(item.data)
              console.log(initialState.length)
            })
            console.log('useEffectAsync:' + initialState)
            setTasks(initialState);
            console.log('useEffectAsync end')
        })

    })
    .catch((error: Error) => { throw error });
  },[])

  console.log('effect start')
  return (
    <div>
      <TaskInput setTasks={setTasks} tasks={tasks} />
      <TaskItemList setTasks={setTasks} tasks={tasks} />
    </div>
  )
}

export default App;
