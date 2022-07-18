export const API = "http://localhost:8081";




export function GET_INDEX_ID(route, idUser){
    return {
        url: `${API}/${route}/${idUser}`,
        options: {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }
    }
}
export function GET_INDEX(route) {
    return {
        url: `${API}/${route}`,
        options: {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }
    }
}
export function DELL_INDEX(route, idUser) {
    return {
        url: `${API}/${route}/${idUser}`,
        options: {
            method: 'DELETE',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }
    }
}

export function POST_INDEX(route, body) {
    return {
        url: `${API}/${route}`,
        options: {
            method: 'POST',
            body: JSON.stringify(body),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }
    }
}

export function GET_INDEX_PERPAGE(route, numberPage){
    return {
        url: `${API}/${route}/${numberPage}`,
        options: {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }
    }
}

export function PUT_INDEX(route, body) {
    return {
        url: `${API}/${route}`,
        options: {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }
    }
}

