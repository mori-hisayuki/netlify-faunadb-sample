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
        console.log("update:" + { id: task.id, data: { done: !task.data.done } });
        const changeTask = {
            id: task.id,
            data: {
                id: task.data.id,
                title: task.data.title,
                done: !task.data.done
            }
        }

        setTasks(prev => prev.map(t =>
            t.id === task.id
                ? changeTask
                : t
        ))
        update(task);
    }

    const handleDelete = (task: Task) => {
        setTasks(prev => prev.filter(t =>
            t.id !== task.id
        ))
        deleteOf(task);
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
