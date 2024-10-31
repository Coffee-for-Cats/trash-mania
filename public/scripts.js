document.getElementById("cpf-button").addEventListener("click", e => {
  e.preventDefault()
  fetch("./register", {
    method: "POST", headers: { contentType: "application/json" }, body: JSON.stringify({
      name: document.getElementById("cpf").value
    })
  }).then(async (content) => {
    const resp = await content.json()
    alert(resp.points || 'teste')
    window.localStorage.setItem("logged-cpf", resp.points)
    window.location.href = "/usuario.html"
  })

})

// const isLogged = window.localStorage.getItem("logged-cpf", cpf);
// const loggedCpf = JSON.parse(isLogged).cpf