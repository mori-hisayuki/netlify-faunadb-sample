export type Task = {
    id: number
    title: string
    done: boolean
}

export type FaunaResponse = {
    ref: any
    ts: number
    data: Task
}
