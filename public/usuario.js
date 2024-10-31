const isLogged = window.localStorage.getItem("logged-cpf");
const loggedCPF = JSON.parse(isLogged);

document.getElementById("points").innerText = loggedCPF.points.toString();

let rank_html = "";
fetch('./ranking').then(async (content) => {
  const ranking = await content.json();

  const users = ranking.users.sort((a, b) => {
    return a.points > b.points;
  })

  ranking.users.forEach(user => {
    rank_html = rank_html + `
    <div>${user.cpf} | ${user.points} pontos.</div>
    `;
    document.getElementById("ranking").innerHTML = rank_html;
  })
})
