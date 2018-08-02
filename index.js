function callRequest(apiQuery, callback) {
  const req = new XMLHttpRequest()
  req.addEventListener("load", callback)
  req.open("GET", apiQuery)
  req.send()
}

function getRepositories() {
  const username = document.getElementById('username').value
  const query =  'https://api.github.com/users/' + username + '/repos')
  callRequest(query, showRepositories)
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
