async function runVersion() {
  var version = await new Promise((res, rej) => {
    fetch('info.json').then(response => {
      if (response.ok) return response.json();
      else rej(response.status);
    }).then(data => res(data.version))
  }).catch(e => alert("Couldn't retrieve current version number. Error: " + e));

  var body = document.getElementsByTagName("body")[0];
  body.innerHTML = body.innerHTML.replace(/v0.0/g, version);
}
runVersion();