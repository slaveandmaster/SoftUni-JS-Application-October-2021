function attachEvents() {
  document.getElementById("btnLoadPosts").addEventListener("click", getPosts);
  document.getElementById("btnViewPost").addEventListener("click", viewPost);
}
attachEvents();

async function viewPost() {
  const commentUl = document.getElementById("post-comments");
  const postBody = document.getElementById("post-body");
  const postTitle = document.getElementById("post-title");

  const selectedPostId = document.getElementById("posts").value;
  const [post, comments] = await Promise.all([
    getPostById(selectedPostId),
    getCommentsPostId(selectedPostId),
  ]);

  postTitle.textContent = post.title;
  postBody.textContent = post.body;
  commentUl.replaceChildren();
  Object.values(comments).map((x) => {
    let liElement = document.createElement("li");
    liElement.textContent = x.text;
    liElement.id = x.id;
    commentUl.appendChild(liElement);
  });
  //console.log(post,Object.values(comments));
}

async function getPosts() {
  const url = "http://localhost:3030/jsonstore/blog/posts";
  const data = await fetch(url);
  let response = await data.json();
  let options = document.getElementById("posts");
  options.replaceChildren();
  Object.values(response).forEach((post) => {
    let selectOption = document.createElement("option");
    selectOption.textContent = post.title;
    selectOption.value = post.id;
    options.appendChild(selectOption);
  });
}

async function getPostById(postId) {
  const urlPost = "http://localhost:3030/jsonstore/blog/posts/" + postId;
  const postInfo = await fetch(urlPost);
  let dataPost = await postInfo.json();
  return dataPost;
}
async function getCommentsPostId(postId) {
  const urlComment = "http://localhost:3030/jsonstore/blog/comments";
  const allComments = await fetch(urlComment);
  let dataComments = await allComments.json();
  let comment = Object.values(dataComments).filter((x) => x.postId == postId);
  return comment;
}

attachEvents();
