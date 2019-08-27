function fetch(url) {
    var httpRequest = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
        httpRequest.onreadystatechange = function () {
            if (this.readyState != XMLHttpRequest.DONE) return;
            if (this.status != 200) reject(this.status);
            resolve(this.responseText);
        }
        
        httpRequest.open('GET', url);
        httpRequest.send();
    })
}