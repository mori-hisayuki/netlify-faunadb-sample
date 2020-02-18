export type FaunaResponse = {
    ref: any
    data: any
}

export type InputTask = {
    id: number
    title: string
    done: boolean

}




export type Task = {
    id: number
    data: {
        id: number
        title: string
        done: boolean
    }
}

