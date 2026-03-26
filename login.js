const userName=document.querySelector(".name")
const password=document.querySelector(".password")
const button=document.querySelector(".button")
const form = document.querySelector("#form")

let t;
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const obj={
    name:userName.value,
    password:password.value,
    }
   //  if (userName.value.length > 2 && password.value.length < 10) {
   // }  
      const user=JSON.parse(localStorage.getItem("users"))
      let r= user.find((us)=>{
      return  us.name==obj.name && us.password==obj.password 
      })
  
       if (r) {
  
        localStorage.setItem("user", JSON.stringify(r))
        window.location.href="./lobi.html"
        }
        else{
        alert("dont found ")
        window.location.href="./rishum.html"
        }
  
})
