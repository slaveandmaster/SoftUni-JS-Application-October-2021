import { deleteById, getMovieById } from "../api/data.js";
import { e } from "../api/dom.js";
const section = document.getElementById("movie-example");
section.addEventListener('click', (e) =>{
  if (e.target.tagName == 'A' && e.target.textContent == 'Edit') {
    e.preventDefault();
    let id = e.target.id;
    ctx.goTo('edit',id);

  }

});
section.remove();
let ctx = null;

export async function showDetailsPage(ctxTarget, id) {
  ctx = ctxTarget;
  ctx.showSection(section);
  getMovie(id);
}

async function getMovie(id) {
  //get likes and creator Likes;
  //create request array
  let req = [
    fetch('http://localhost:3030/data/movies/'+ id),
    fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
  ]
  //check if userData.id == ownerId  and show likes
  let userData = JSON.parse(sessionStorage.getItem('userData'));
  if (userData && userData !=null) {
    req.push(fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userData.id}%22`))
  }
 // let data = await getMovieById(id);
  let [movieData, hasLikes, userLikes] = await Promise.all(req);
  let [ data, hasLikesData, userLikesData ] = await Promise.all([
    movieData.json(),
    hasLikes.json(),
    userLikes && userLikes.json()
  ]
  )
  section.replaceChildren(createDetails(data, hasLikesData, userLikesData));
 //console.log(data);
}

function createDetails(movie,likes, usersLikes) {
  let userData = JSON.parse(sessionStorage.getItem('userData'));
  let controls = e("div",{ className: "col-md-4 text-center" },
  e("h3", { clasName: "my-3" }, "Movie Description"),
  e("p", {}, `${movie.description}`));
  if (userData !=null) {
    if (userData.id == movie._ownerId) {
      controls.appendChild(e("a", { className: "btn btn-danger" ,href: '', onClick: onDelete}, "Delete"));
      controls.appendChild(e("a", { className: "btn btn-warning" , id : `${movie._id}`, href: '' }, "Edit"));
    } else {
      if (usersLikes.length > 0 ) {
          controls.appendChild(e("a", { className: "btn btn-primary" , href: '', onClick: onUnLike}, "Unlike"));
      } else {
        controls.appendChild(e("a", { className: "btn btn-primary" , href: '', onClick: onLike}, "Like"));
      }
    }
  }
  controls.appendChild(e("span", { className: "enrolled-span" }, `Likes ${likes}`));
  const element =
  e("div",{ className: "container" },
    e("div",{ className: "row bg-light text-dark" },
      e("h1", {}, `Movie title: ${movie.title}`) ,
      e("div", { className: "col-md-8" },
      e("img", {className: "img-thumbnail",src: `${movie.img}`,alt: "Movie",})
    ),
    controls
    )    
  );
  return element;
  //closure functions
  async function onDelete(e){
    e.preventDefault();
    const confirmed = confirm('Are you sure you want to delete');
    if (confirmed) {
       await deleteById(movie._id);
       ctx.goTo('home');
    }
  }
 async function onLike(e) {
   e.preventDefault();

   await fetch('http://localhost:3030/data/likes',{
     method: 'post',
     headers: {
       'X-Authorization': userData.token
     },
     body: JSON.stringify({movieId: movie._id})
   })
   showDetailsPage(ctx,movie._id)
  
 }
 async function onUnLike(e) {
  e.preventDefault();
  await fetch('http://localhost:3030/data/likes/'+ usersLikes[0]._id,{
    method: 'delete',
    headers: {
      'X-Authorization': userData.token
    }
  })
  showDetailsPage(ctx,movie._id)
   
}
}

