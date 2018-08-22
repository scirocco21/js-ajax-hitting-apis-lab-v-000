


function getRepositories() {
  const username = document.getElementById('username').value;
  const query =  'https://api.github.com/users/' + username + '/repos'
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", query)
  req.send()
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + '<a href="' + r.html_url + '">' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' + '<br>' + '<a href="#" data-repo="' + r.name + '" data-user="' + username.value + '" onclick="getBranches(this)">Get Branches</a>' +'</li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList
}

function getBranches(el) {
  const name = el.dataset.repo
  const username = el.dataset.user
  const req = new XMLHttpRequest()
  const query =  'https://api.github.com/repos/' + username.value + '/'+ name + '/branches'
  req.addEventListener("load", showBranches)
  req.open("GET", query)
  req.send()
}

function showBranches(event, data) {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML += branchesList
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  const query =  'https://api.github.com/repos/' + username.value + '/'+ name + '/commits'
  req.addEventListener("load", showCommits)
  req.open("GET", query)
  req.send()
}


function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
