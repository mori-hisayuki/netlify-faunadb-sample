import { Task, FaunaResponse } from "../components/Types";

export function readAll(): any {
    var initialState: Task[] = Array<Task>();
    fetch('./.netlify/functions/fauna-crud')
        .then((response: Response) => {
            response.json().then((faunaResponse: Array<FaunaResponse>) => {
                faunaResponse.map((item: FaunaResponse) => {
                    console.log(item.data)
                    initialState.push(item.data)
                })
            })
            return initialState
        })
        .catch((error: Error) => { throw error });

}

export function create(task: Task): void {

    const method = "POST";
    const body = JSON.stringify(task);
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    fetch('./.netlify/functions/fauna-crud', {method, headers, body})
        .then((response: Response) => {
            if (response.ok) {
                response
                    .json()
                    .then(json => {
                        // jsonが取得できた場合だけresolve
                        console.log(json)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        });
}
