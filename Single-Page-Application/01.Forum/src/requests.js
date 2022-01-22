async function request(url, options) {
    try {
        let res =  await fetch(url, options);
        if (res.ok !=true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        return await res.json();
    } catch (error) {
        alert(error.message);
    }
}
function createOptions(method = 'get', data) {
    let options = {
        method,
        headers: {}
    }
    if (data && data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    return options;
}

async function get(url) {
    return request(url, createOptions());
  }
  async function post(url, data) {
    return request(url, createOptions("post", data));
  }
  async function put(url, data) {
    return request(url, createOptions("put", data));
  }
  async function del(url) {
    return request(url, createOptions("delete"));
  }
  

export async function getPosts() {
 return await get('http://localhost:3030/jsonstore/collections/myboard/posts')
}

export async function getCommentsByTopic() {
    return await get(`http://localhost:3030/jsonstore/collections/myboard/comments`);
}

export async function createPost(data,  date) {
    console.log({...data, date});
    return await post('http://localhost:3030/jsonstore/collections/myboard/posts', {...data,creatinonDate: date});

}

export async function createComment(data, topicName) {
  return await post('http://localhost:3030/jsonstore/collections/myboard/comments', { ...data, topicName});
}