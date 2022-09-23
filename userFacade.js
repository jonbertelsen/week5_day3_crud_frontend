/* Utility functions for fetching data */

function makeOptions(method, body) {
  const opts =  {
    method: method,
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  }
  if(body){
    opts.body = JSON.stringify(body);
  }
  return opts;
}

function handleHttpErrors(res){
  if(!res.ok){
    return Promise.reject({status: res.status, fullError: res.json() })
  }
  return res.json();
}

/* facade functions */


function getAllUsers(){
  return fetch("http://localhost:3333/api/users/")
      .then(handleHttpErrors)
}

function getUserById(id){
  return fetch("http://localhost:3333/api/users/" + id)
      .then(handleHttpErrors)
}

function addUser(user){
  const options = makeOptions("POST",user);
  return fetch("http://localhost:3333/api/users/", options)
      .then(handleHttpErrors)
}

function updateUser(user, id){
  const options = makeOptions("PUT",user);
  return fetch("http://localhost:3333/api/users/" + id, options)
      .then(handleHttpErrors)
}

function deleteUser(id){
  const options = makeOptions("DELETE");
  return fetch("http://localhost:3333/api/users/" + id, options)
      .then(handleHttpErrors)
}

/* Make sure you understand what we create here, it involves VITAL JavaScript knowledge */
const userFacade = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
}

export default userFacade;
