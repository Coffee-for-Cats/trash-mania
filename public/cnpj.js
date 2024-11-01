document.getElementById("aplicar").addEventListener("click", e => {
  e.preventDefault();

  fetch("./darpontos", {
    method: "POST", headers: { contentType: "application/json" }, body: JSON.stringify({
      name: document.getElementById("name").value.trim(),
      points: Number.parseInt(document.getElementById("points").value)
    })
  }).then(async (content) => {
    const resp = await content.json()
    alert(`Usuário agora tem ${resp.points}`)
  })
})