//Grab form input 

document.addEventListener("DOMContentLoaded",()=> {

const searchForm =document.getElementById("github-form")
searchForm.addEventListener('submit', function(event){
  event.preventDefault()
  const nameInput = document.getElementById("search").value;
  getUsers(nameInput)
})


//fetch users  probably using GET 

function getUsers(nameInput) {
    return fetch(`https://api.github.com/search/users?q=${nameInput}`, {

    headers:{
        Accept: "application/vnd.github.v3+json"
    }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        renderUsers(response.items);
      });
  }

//render users 
//add event listener to users rendered 

function renderUsers(user) {
    const userContainer  = document.querySelector('#user-list');
    user.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = user.login;
      userContainer.appendChild(li);
      
      li.addEventListener('click', function (event) {
        const liClickedText = event.target.innerHTML
        liClicked=event.target
        getRepositories (liClickedText);
    });

  })

}


//fetch repos 

function getRepositories (liClicked) {

    return fetch(`https://api.github.com/users/${liClicked}/repos`, {

    headers:{
        Accept: "application/vnd.github.v3+json"
    }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
       renderRepos(response);
       console.log(response)
      });

}

//render repos

function renderRepos(response) {
    const repoList = liClicked
    response.forEach(repo => {
      const p = document.createElement('p');
      p.innerHTML = repo.html_url 

      liClicked.appendChild(p);
      
      repoList.addEventListener('click', function () {

        console.log(repo)
    });

  })

}













})