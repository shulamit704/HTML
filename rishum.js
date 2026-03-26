const userName = document.querySelector(".name")
const password = document.querySelector(".password")
const button = document.querySelector(".button")
const mail = document.querySelector(".mail")
const form = document.querySelector("#form")


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const obj = {
        name: userName.value,
        password: password.value,
        mail: mail.value,
        win:0,
        lose:0
    }
let users=JSON.parse(localStorage.getItem("users"))
// let userExists=users.find(u=>u.name===obj.name)
// if(userExists){
//     alert("קיים משתמש בשם זה")
//     return
// }
    if (userName.value.length > 2 ) {
        if (!localStorage.getItem("users")) {
            localStorage.setItem("users", "[]")
        }
        pushToStorage(obj)
        window.location.href="./login.html"

    } else {
        alert("Enter full name!!")
    }
})

const pushToStorage = (obj) => {
    let usersFromStorage = JSON.parse(localStorage.getItem("users"))
    usersFromStorage.push(obj)
    localStorage.setItem("users", JSON.stringify(usersFromStorage))
}
