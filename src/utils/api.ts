import { Task, FaunaResponse, InputTask } from "../components/Types";

export const readAll = async (): Promise<Array<Task>> => {
    var initialState: Task[] = Array<Task>();
    return fetch('./.netlify/functions/fauna-crud')
        .then((response: Response) => {
            return response.json().then((faunaResponse: Array<FaunaResponse>) => {
                faunaResponse.map((item: FaunaResponse) => {
                    console.log(item.ref['@ref'].id)
                    console.log(item.data)
                    console.log({ "id": item.ref['@ref'].id, "data": item.data })
                    initialState.push({ "id": item.ref['@ref'].id, "data": item.data })
                    console.log(initialState.length)
                })
                return Promise.resolve(initialState);
            })

        })
        .catch((error: Error) => { throw error });

    console.log("readAll:" + initialState)
}

export const create = (task: InputTask): Promise<Task> => {

    const method = "POST";
    const body = JSON.stringify(task);
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    return fetch('./.netlify/functions/fauna-crud', {method, headers, body})
        .then((response: Response) =>  response.json());
}

export const update = (task: Task): Promise<void> => {

    const method = "PUT";
    const body = JSON.stringify({done: !task.data.done});
    console.log(body);
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    return fetch('./.netlify/functions/fauna-crud/'+task.id, {method, headers, body})
        .then((response: Response) => {
            response
                .json()
                .then(json => {
                    // jsonが取得できた場合だけresolve
                    return Promise.resolve(json);
                })
                .catch(console.log)
                .finally(() => {
                    console.log('finally');
                    return Promise.resolve();
                } )
        });
}

export const deleteOf = (task: Task): Promise<void> => {

    const method = "DELETE";
    const body = JSON.stringify(task);
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    return fetch('./.netlify/functions/fauna-crud/'+task.id, {method, headers, body})
        .then((response: Response) => {
            response
                .json()
                .then(json => {
                    // jsonが取得できた場合だけresolve
                    return Promise.resolve(json);
                })
                .catch(console.log)
                .finally(() => {
                    console.log('finally');
                    return Promise.resolve();
                } )
        });
}
