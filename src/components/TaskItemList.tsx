import React from 'react'
import { Task } from "./Types";
import TaskItem from './TaskItem';
import { deleteOf, update } from '../utils/api';

type Props = {
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}


const TaskItemList: React.FC<Props> = ({ tasks, setTasks }) => {
    const handleDone = (task: Task) => {
        console.log("update:" + task);
        update(task);
        setTasks(prev => prev.map(t =>
            t.id === task.id
                ? { ...task, done: !task.data.done }
                : t
        ))
    }

    const handleDelete = (task: Task) => {
        deleteOf(task);
        setTasks(prev => prev.filter(t =>
            t.id !== task.id
        ))
    }

    return (
        <div className="inner">
        {
            tasks.length <= 0 ? '登録されたTODOはありません。' :
            <ul className="task-list">
            { tasks.map( task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    handleDelete={handleDelete}
                    handleDone={handleDone}
                />
            )) }
            </ul>
        }
        </div>
    )

}

export default TaskItemList
