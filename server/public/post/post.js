Promise.all([fetch('post/post.html'), fetch('api/posts')]).then(values => {
    let container = document.querySelector(".app-container main");

    postElement = stringToHtmlElement(values[0]);
    for (let post of JSON.parse(values[1])) {
        let clonedPost = postElement.cloneNode(true);
        // Set details
        clonedPost.querySelector('.post-user').textContent = post.userName;
        clonedPost.querySelector('.post-price').textContent = post.price;
        clonedPost.querySelector('.post-location').textContent = post.location;
        clonedPost.querySelector('.post-description').textContent = post.description;

        // Set background & video
        fetch("https://api.rawg.io/api/games?page_size=5&search=" + post.game).then(res => {
            var obj = JSON.parse(res);
            // Set background image
            var background = clonedPost.querySelector('.post-container-background');
            background.style.backgroundImage = `url(${obj['results'][0]['background_image']})`;
            background.style.backgroundSize = 'cover';

            // Set video
            if (obj['results'][0]['clip']) {
                var video = clonedPost.querySelector('.post-game-vid');
                video.src = obj['results'][0]['clip']['clips']['320'];
                video.addEventListener('mouseenter', function () {
                    video.controls = true;
                    video.play();
                });
                video.addEventListener('mouseleave', function () {
                    video.controls = false;
                    video.pause();
                });
            }

            // TODO: Set image
        });

        container.appendChild(clonedPost);
    }
})