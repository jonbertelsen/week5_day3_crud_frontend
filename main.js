import "./style.css";
import jokeFacade from "./jokeFacade.js";
import userFacade from "./userFacade.js";

document.getElementById("all-content").style.display = "block";

/*
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */

const jokes = jokeFacade.getJokes()
const jokeList = document.getElementById("jokes")
jokeList.innerHTML = jokes.map((joke) => `<li>${joke}</li>`).join("")

/* JS For Exercise-2 below */

const joketext = document.getElementById("joketext")
const hourlyjoketext = document.getElementById("hourlyjoketext")

document.getElementById("getJokeButton")
    .addEventListener("click", () => {
        jokeFacade.getChuckJoke()
            .then(joke => joketext.innerText = joke.value)
    })

const hourlyInterval = setInterval(() => {
    jokeFacade.getChuckJoke()
        .then(joke => hourlyjoketext.innerText = joke.value)
}, 2000)

setTimeout(() => {
    clearInterval(hourlyInterval)
    hourlyjoketext.innerText = "Så stopper vi ...."
}, 11000)

/* JS For Exercise-3 below */

const errorMessages = document.getElementById("errors")

/* Show all users ********************************************* */

const allUserRows = document.getElementById("allUserRows")

function showAllUsers() {
    userFacade.getAllUsers()
        .then(users => {
            // allUserRows.innerHTML = users.reduce((acc, curr) => acc + `<tr><td>${curr.id}</td>
            //                     <td>${curr.age}</td>
            //                     <td>${curr.name}</td>
            //                     <td></td>
            //                     <td>${curr.gender}</td>
            //                     <td>${curr.email}</td></tr>`, "")
            allUserRows.innerHTML = users.map((curr) => `<tr><td>${curr.id}</td>
                                <td>${curr.age}</td>
                                <td>${curr.name}</td>
                                <td></td>
                                <td>${curr.gender}</td>
                                <td>${curr.email}</td></tr>`).join("")
        })
        .catch(err => {
            if (err.status) {
                err.fullError.then(e => errorMessages.innerText = e.msg)
            } else {
                errorMessages.innerText = "Network error";
            }
        })
}

showAllUsers()

/* Get user by id ********************************************* */

const findUser = document.getElementById("find_user")
const findUserText = document.getElementById("find_user_text")

document.getElementById("find_user_button").addEventListener("click", () => {

    errorMessages.innerText = ""
    let findUserValue = findUser.value
    if (findUserValue.length > 0) {
        console.log("userid", findUserValue)
        userFacade.getUserById(findUserValue)
            .then(user => {
                findUserText.innerText = JSON.stringify(user)
                document.getElementById("edit_id").value = user.id
                document.getElementById("edit_age").value = user.age
                document.getElementById("edit_name").value = user.name
                document.getElementById("edit_email").value = user.email
                console.log("gender", user.gender)
                if (user.gender === "male") {
                    document.getElementById("edit_gender_female").checked = false
                    document.getElementById("edit_gender_male").checked = true
                } else {
                    document.getElementById("edit_gender_male").checked = false
                    document.getElementById("edit_gender_female").checked = true
                }
            })
            .catch(err => {
                if (err.status) {
                    err.fullError.then(e => errorMessages.innerText = e.msg)
                } else {
                    errorMessages.innerText = "Network error";
                }
            })
    }
})

/* Add user ********************************************* */

document.getElementById("input_button").addEventListener("click", () => {

    errorMessages.innerText = ""
    const input_age = document.getElementById("input_age").value
    const input_name = document.getElementById("input_name").value
    const input_email = document.getElementById("input_email").value
    const input_radio = document.querySelector('input[name="gender"]:checked')
    const input_result = document.getElementById("input_result")

    const user = {"age": input_age, "name": input_name, "gender": input_radio.value, "email": input_email}
    console.log("Ny bruger:", user)

    userFacade.addUser(user)
        .then(user => {
            input_result.innerText = "Added user: " + JSON.stringify(user)
            showAllUsers()
        })
        .catch(err => {
            if (err.status) {
                err.fullError.then(e => errorMessages.innerText = e.msg)
            } else {
                errorMessages.innerText = "Network error";
            }
        })
})

/* Update user ********************************************* */

document.getElementById("edit_button").addEventListener("click", () => {

    errorMessages.innerText = ""
    const edit_id = document.getElementById("edit_id").value
    const edit_age = document.getElementById("edit_age").value
    const edit_name = document.getElementById("edit_name").value
    const edit_email = document.getElementById("edit_email").value
    const edit_radio = document.querySelector('input[name="gender"]:checked')
    const edit_result = document.getElementById("edit_result")

    const user = {"age": edit_age, "name": edit_name, "gender": edit_radio.value, "email": edit_email}

    userFacade.updateUser(user, edit_id)
        .then(user => {
            edit_result.innerText = "Updated user: " + JSON.stringify(user)
            showAllUsers()
        })
        .catch(err => {
            if (err.status) {
                err.fullError.then(e => errorMessages.innerText = e.msg)
            } else {
                errorMessages.innerText = "Network error";
            }
        })

})

/* Delete user ********************************************* */

document.getElementById("delete_button").addEventListener("click", () => {

    errorMessages.innerText = ""
    let findUserValue = findUser.value
    if (findUserValue.length > 0) {
        console.log("delete: ", findUserValue)
        userFacade.deleteUser(findUserValue)
            .then((user) => showAllUsers())
            .catch(err => {
                if (err.status) {
                    err.fullError.then(e => errorMessages.innerText = e.msg)
                } else {
                    errorMessages.innerText = "Network error";
                }
            })
    }
})

/*
 If you do not understand the code below, don´t worry, it is not necessary for completing the exercises
*/

function hideAllShowOne(idToShow) {
    document.getElementById("about_html").style = "display:none";
    document.getElementById("ex1_html").style = "display:none";
    document.getElementById("ex2_html").style = "display:none";
    document.getElementById("ex3_html").style = "display:none";
    document.getElementById(idToShow).style = "display:block";
}

function menuItemClicked(evt) {
    const id = evt.target.id;
    switch (id) {
        case "ex1":
            hideAllShowOne("ex1_html");
            break;
        case "ex2":
            hideAllShowOne("ex2_html");
            break;
        case "ex3":
            hideAllShowOne("ex3_html");
            break;
        default:
            hideAllShowOne("about_html");
            break;
    }
    evt.preventDefault()
}

document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");
