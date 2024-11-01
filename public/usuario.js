const userjson = window.localStorage.getItem("logged-cpf");

const user = JSON.parse(userjson);
console.log(user)
document.getElementById("points").innerText = user.points.toString();
document.getElementById("username").innerText = user.name;

let rank_html = "";
fetch('./ranking').then(async (content) => {
  const ranking = await content.json();

  const users = ranking.sort((a, b) => {
    return a.points < b.points;
  })

  users.forEach(user => {
    rank_html = rank_html + `
      <div>${user.name} | ${user.points} pontos.</div>
    `;
    document.getElementById("ranking").innerHTML = rank_html;
  })
})
