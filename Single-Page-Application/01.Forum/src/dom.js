export function e(type, attributes, ...content) {
  const result = document.createElement(type);

  for (let [attr, value] of Object.entries(attributes || {})) {
    if (attr.substring(0, 2) == "on") {
      result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
    } else {
      result[attr] = value;
    }
  }

  content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

  content.forEach((e) => {
    if (typeof e == "string" || typeof e == "number") {
      const node = document.createTextNode(e);
      result.appendChild(node);
    } else {
      result.appendChild(e);
    }
  });

  return result;
}

export function topicTemplate(topic) {
    
    let date = new Date(topic[1].creatinonDate);
  let post = e("div", { className: "topic-content" });
  post.innerHTML = `
        <div class="topic-title">
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <a href="#" class="normal">
                    <h2 data-id="${topic[1].topicName}">${topic[1].topicName}</h2>
                </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${date.toLocaleString()}</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${topic[1].username}</span></p>
                        </div>
                    </div>
    
    
                </div>
            </div>
        </div>
    </div>
        `;
  return post;
}

export function createCommentForm() {
  let element = e("div", { className: "answer-comment" });
  element.innerHTML = `<p><span>currentUser</span> comment:</p>
<div class="answer">
    <form id="commentForm">
        <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
        <div>
            <label for="username">Username <span class="red">*</span></label>
            <input type="text" name="username" id="username">
        </div>
        <button>Post</button>
    </form>
</div>`;
  return element;
}

export function createPostForm() {
  let element = e("div", { className: "answer-comment" });
  element.innerHTML = `<div class="new-topic-border">
  <div class="header-background">
      <span>New Topic</span>
  </div>
  <form id="formAdd">
      <div class="new-topic-title">
          <label for="topicName">Title <span class="red">*</span></label>
          <input type="text" name="topicName" id="topicName">
      </div>
      <div class="new-topic-title">
          <label for="username">Username <span class="red">*</span></label>
          <input type="text" name="username" id="username">
      </div>
      <div class="new-topic-content">
          <label for="postText">Post <span class="red">*</span></label>
          <textarea type="text" name="postText" id="postText" rows="8" class="height"></textarea>
      </div>
      <div class="new-topic-buttons">
          <button class="cancel">Cancel</button>
          <button class="public">Post</button>
      </div>

  </form>
</div>
`;
  return element;
}

export function commentTemplate(comments) {
  const date = new Date(comments[1].creatinonDate);
  let element = e("div", { className: "comment" });

  element.innerHTML = `<header class="header">
<p><span>${
    comments[1].username
  }</span> posted on <time>${date.toLocaleString()}</time></p>
</header>
<div class="comment-main">
    <div class="userdetails">
        <img src="./static/profile.png" alt="avatar">
    </div>
    <div class="post-content">
        <p>${comments[1].postText}</p>
    </div>
</div>
`;

  return element;
}

export function createPostCommentTemplate(postData,commentsData) {
    
    //populate post data
    let topic = topicTemplate(postData);
    //show comments for postTopic
    if (commentsData != undefined) {
        
        commentsData.forEach((x) => topic.appendChild(commentTemplate(x)));
    }
}

export function showPost(topic) {
  
  let date = new Date(topic.creatinonDate);
  let element = e("div", { className: "topic-name-wrapper" });
  element.innerHTML = `
    <div class="topic-name">
    <a href="javascript:void(0)" class="normal">
    <h2>${topic.topicName}</h2>
    </a>
    <div class="columns">
    <div>
    <p>Date:
    <time>${date.toLocaleString()}</time>
    </p>
    <div class="nick-name">
    <p>Username: <span>${topic.username}</span></p>
    </div>
    </div>
    <div class="subscribers">
    <!-- <button class="subscribe">Subscribe</button> -->
    <p>Subscribers: <span></span></p>
    </div>
    </div>
    </div>
    </div>`;
  const post = e("div", { className: "topic-container" });
  post.id = topic._id;
  post.appendChild(element);
  
  return post;
}

export function checkIsValid(data) {
    let isValid = Object.values(data).some((x) => x == '');
    return isValid;
}
