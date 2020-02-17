import React, { useState } from 'react'
import { Task } from './Types'
import {create } from '../utils/api';

type Props = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    tasks: Task[]
}

const TaskInput: React.FC<Props> = ({ setTasks, tasks }) => {
    const [ inputTitle, setInputTitle ] = useState<string>('')
    const [ count, setCount ] = useState<number>(tasks.length + 1)


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.target.value)
    }

    const handleSubmit = () => {
        setCount(count + 1)

        const newTask: Task = {
            id: count,
            title: inputTitle,
            done: false
        }

        create(newTask);

        setTasks([newTask, ...tasks])
        setInputTitle('')

    }

    return (
        <div>
            <div className="input-form">
                <div className="inner">
                    <input
                        type="text"
                        className="input"
                        value={inputTitle}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSubmit} className="btn is-primary">??</button>
                </div>
            </div>
        </div>
    )
}

export default TaskInput
