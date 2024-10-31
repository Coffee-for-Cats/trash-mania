document.getElementById("cpf-button").addEventListener("click", e => {
  e.preventDefault()
  fetch("./register", {
    method: "POST", headers: { contentType: "application/json" }, body: JSON.stringify({
      cpf: document.getElementById("cpf").value
    })
  }).then(async (content) => {
    const cpf = await content.json()
    window.localStorage.setItem("logged-cpf", cpf)
    window.location.href = "/usuario.html"
  })

})

const isLogged = window.localStorage.getItem("logged-cpf", cpf);
const loggedCpf = JSON.parse(isLogged).cpf

// fetch("./register", {
//   method: "POST", headers: { contentType: "application/json" }, body: JSON.stringify({
//     cpf: loggedCpf
//   })
// }).then(async (content) => {
//   const cpf = await content.json()
//   window.localStorage.setItem("logged-cpf", cpf)
//   window.location.href = "/usuario.html"
// })