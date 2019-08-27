var container;

fetch('post/post.html').then(html => {
    container = document.querySelector(".app-container main");
    container.insertAdjacentHTML('beforeend', html);
});

fetch("https://api.rawg.io/api/games?page_size=5&search=gtav").then(res => {
    var obj = JSON.parse(res);
    var background = document.querySelector('.post-container-background');
    background.style.backgroundImage = `url(${obj['results'][0]['background_image']})`;
    background.style.backgroundSize = 'cover';

    var video = document.querySelector('.post-game-vid');
    video.src = obj['results'][0]['clip']['clips']['320'];

    // Set hover video functionality
    video.addEventListener('mouseenter', function() {
        video.controls = true;
        video.play();
    });
    video.addEventListener('mouseleave', function() {
        video.controls = false;
        video.pause();
    })
});