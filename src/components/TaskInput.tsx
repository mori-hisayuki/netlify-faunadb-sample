import React, { useState } from 'react'
import { Task, InputTask } from './Types'
import {create } from '../utils/api';

type Props = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    tasks: Task[]
}

const TaskInput: React.FC<Props> = ({ setTasks, tasks }) => {
    const [ inputTitle, setInputTitle ] = useState<string>('')
    const [ count, setCount ] = useState<number>(tasks.length + 1)


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputTitle(e.target.value)


    const handleSubmit = async () => {
        setCount(count + 1)

        const newTask: InputTask = {
            id: count,
            title: inputTitle,
            done: false
        }

        await create(newTask).then((task: Task) => setTasks([task, ...tasks]))
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
                    <button onClick={handleSubmit} className="btn is-primary">追加</button>
                </div>
            </div>
        </div>
    )
}

export default TaskInput
