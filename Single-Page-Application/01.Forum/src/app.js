import {createPost, getPosts, getCommentsByTopic, createComment,} from "./requests.js";
import {checkIsValid, commentTemplate, createCommentForm, createPostForm, showPost, topicTemplate} from "./dom.js";
const main = document.querySelector("main");
//main.querySelector('.topic-title');
//get and load all topics
async function displayPost() {
  let fragment = document.createDocumentFragment();
  fragment.appendChild(createPostForm());
  let allTopics = await getPosts();
  let posts = Object.entries(allTopics).map((x, i) => showPost(x[1]));
  [...posts].forEach((x) => fragment.appendChild(x));
  main.appendChild(fragment); 
}
displayPost();
//create eventListener for all forms and check form id

main.addEventListener("submit", async (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  let fields = [...formData.entries()].reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  let forms = {
    formAdd: async (e) => {
      let isEmpty = Object.values(fields).some((x) => x == "");
      if (isEmpty) {
        alert("All fields are required!!!");
      }
      await createPost(fields, Date.now());
      e.target.reset();
      displayPost();
    },
    commentForm: async (e) => {
       e.preventDefault()
      if (checkIsValid(fields)) {
        return alert("All fields are required!!!");
      } else {
        let formData = new FormData(e.target);
        let fields = [...formData.entries()].reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
        let title = document.querySelector("h2");
        let postName = title.getAttribute("data-id");
        main.replaceChildren();
        await createComment({ ...fields, creatinonDate: Date.now() }, postName);
        displayPostComments(postName, fields);
      }
    },
  };
  forms[e.target.id](e);
});
async function displayPostComments(postName, fields) {
  let posts = await getPosts();
  let post = Object.entries(posts).find((x) => x[1].topicName == postName);
  let comments = await getCommentsByTopic();
  let postComments = Object.entries(comments)
    .map((x) => x)
    .filter((x) => x[1].topicName == postName);
    
  let section = topicTemplate(post);
  if (comments != undefined) {
    postComments.forEach((x) => section.appendChild(commentTemplate(x)));
  }
  let formComment = createCommentForm();

  section.appendChild(formComment);

  //show comment form and all comments for topic
  main.replaceChildren(section);
}
document.addEventListener("click", async (e) => {
  if (e.target.tagName == "H2" && e.target.parentElement.className == "normal") {
    let postTitle = e.target.textContent;
    main.replaceChildren();
    displayPostComments(postTitle)
 
  }
  if(e.target.tagName == "A" && e.target.textContent == 'Home') {
    
    main.replaceChildren();
    displayPost();
  }
});
