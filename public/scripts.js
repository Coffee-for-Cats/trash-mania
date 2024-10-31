document.getElementById("cpf-button").addEventListener("click", e => {
  e.preventDefault()
  fetch("./register", {
    method: "POST", headers: { contentType: "application/json" }, body: JSON.stringify({
      name: document.getElementById("cpf").value.trim()
    })
  }).then(async (content) => {
    const resp = await content.json()
    const json = JSON.stringify(resp);
    alert(json)
    window.localStorage.setItem("logged-cpf", json)
    window.location.href = "/usuario.html"
  })
})

document.getElementById("cnpj-button").addEventListener("click", e => {
  e.preventDefault()
  window.location.href = "/cnpj"
})

// const isLogged = window.localStorage.getItem("logged-cpf", cpf);
// const loggedCpf = JSON.parse(isLogged).cpf