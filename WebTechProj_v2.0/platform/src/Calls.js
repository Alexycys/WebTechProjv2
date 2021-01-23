import axios from 'axios';

async function getUser(name) {
        let newUrl = "http://localhost:8000/api/username/"+name;
        return (await axios.get(newUrl)).data;
}

async function get(url, id = null){
        try{
                let newUrl = !id ? url : url + "/" + id;
                return (await axios.get(newUrl)).data;
        } catch (e) {
                return e.response.data;
        }
}

async function post(url, item) {
        try {
            return (await axios.post(
                url,
                item,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )).data;
        } catch (e) {
            return e.response.data;
        }
    }
    
    async function put(url, id, item) {
        try {
            return (await axios.put(
                url + "/" + id,
                item,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )).data;
        } catch (e) {
            return e.response.data;
        }
    }
    
    async function remove(url, id) {
        try {
                console.log(url + "/" + id);
            return (await axios.delete(
                url + "/" + id
            )).data;
        } catch (e) {
            return e.response.data;
        }
    }

    async function createNote(post) {
        let newUrl = "http://localhost:8000/api/note";
        let response = (await axios.post(
                newUrl,
                post,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )).data;
                
            return response;
}

async function getNoteAttach(id) {
    let newUrl = "http://localhost:8000/api/note/"+id;
    return (await axios.get(newUrl)).data;
}
    

export {getUser, get, post, put, remove, getNoteAttach, createNote}