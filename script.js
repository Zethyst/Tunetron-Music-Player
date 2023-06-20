const api = "https://api.lyrics.ovh";
//selecting all required elements
const musicPlayer = document.querySelector('.music_player'),
    musicImg = musicPlayer.querySelector('.imgBox img'),
    musicName = musicPlayer.querySelector('.songDetails .title'),
    musicArtist = musicPlayer.querySelector('.songDetails .artist'),
    musicAudio = musicPlayer.querySelector('#Song'),
    playPauseBtn = musicPlayer.querySelector('.play-pause'),
    prevBtn = musicPlayer.querySelector('#prev'),
    nextBtn = musicPlayer.querySelector('#next'),
    progressArea = musicPlayer.querySelector('.progressBox'),
    seek_line = musicPlayer.querySelector('.seek_line'),
    equalizer = musicPlayer.querySelector('#equalizer'),
    musicList = document.querySelector('.music_library'),
    volMuteBtn = musicPlayer.querySelector('#vol');
const output = document.getElementById("lyrics_container");
var blank = document.getElementById("Blank-Sound");
let musicIndex = Math.floor((Math.random() * songlist.length) + 1);
var isPlaying = false;
let smallMusicPlayerContainer = document.querySelector(".small-music-player");
let smallPlayPauseBtn = document.querySelector(".outer");
let svgBtn = document.querySelector("svg");
let libraryBtn = document.querySelector(".music_player .header i");
const followingBox = document.querySelector(".hiddingBanner");
var mobileMode=false;

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector(
          "body").style.visibility = "hidden";
          followingBox.classList.add("hidden");
        document.querySelector(
          "#loader").style.visibility = "visible";
    } 
    else{
        setTimeout(()=>{
            document.querySelector(
              "#loader").style.display = "none";
              followingBox.classList.remove("hidden");
            document.querySelector(
              "body").style.visibility = "visible";
        },4000)
    }
};

var w = window.innerWidth;
if (w < 550) {
    libraryBtn.textContent = "library_music";
    musicList.classList.add("hidden");
    libraryBtn.classList.add("wiggleAnimation");
    mobileMode=true;
}

window.addEventListener("resize", () => {
    w = window.innerWidth;

    if (w < 550) {
        libraryBtn.textContent = "library_music";
        libraryBtn.classList.add("wiggleAnimation");
    }
    else if (w > 550) {
        libraryBtn.textContent = "audiotrack";
        libraryBtn.classList.remove("wiggleAnimation");
    }
});
if (libraryBtn.textContent=="library_music") {
    mobileMode=true;
    libraryBtn.addEventListener("click",()=>{
        musicPlayer.classList.toggle("hidden");
        musicList.classList.toggle("hidden");
    });
    smallMusicPlayerContainer.addEventListener("click",()=>{
        musicPlayer.classList.toggle("hidden");
        musicList.classList.toggle("hidden");
    });
}

function playBlank() {
    blank.play();
}

window.addEventListener('load', () => {
    loadMusic(musicIndex);
    smallPlay(musicIndex);
    playBlank();
    playingNow();
});

const loadMusic = (indexNum) => {
    musicName.textContent = songlist[indexNum - 1].name;
    musicArtist.textContent = songlist[indexNum - 1].artist;
    musicImg.src = `/Assets/Images/${songlist[indexNum - 1].img}.jpg`
    musicAudio.src = `/Assets/Songs/${songlist[indexNum - 1].src}.mp3`
    startSearch(`${musicName.textContent}`);
    // alert(musicImg.src)
    // playMusic();
};
const smallPlay = (indexNum) => {
    smallMusicPlayerContainer.querySelector(".smallimgBox img").src = `/Assets/Images/${songlist[indexNum - 1].img}.jpg`;
    smallMusicPlayerContainer.querySelector(".oneSongContainer span").textContent = songlist[indexNum - 1].name;
    smallMusicPlayerContainer.querySelector(".oneSongContainer p").textContent = songlist[indexNum - 1].artist;
};

// play music function
const playMusic = () => {
    isPlaying = true;
    let urlPath = musicImg.src;
    document.body.style.backgroundImage = `url(${urlPath})`;
    musicPlayer.classList.add('paused');
    playPauseBtn.querySelector('i').textContent = "pause";
    smallPlayPauseBtn.querySelector('i').textContent = "pause";
    playPauseBtn.setAttribute("title", "Pause");
    smallPlayPauseBtn.setAttribute("title", "Pause");
    musicImg.classList.add('anim');
    musicAudio.play();
    equalizer.load("https://assets7.lottiefiles.com/packages/lf20_btTua7.json");
}

// play pause btn event
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = musicPlayer.classList.contains('paused');
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
});

svgBtn.addEventListener("click", () => {
    const isMusicPaused = musicPlayer.classList.contains('paused');
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
    musicPlayer.classList.toggle("hidden");
    musicList.classList.toggle("hidden");
});

// pause music function
const pauseMusic = () => {
    isPlaying = false;
    document.body.style.backgroundImage = '';
    musicPlayer.classList.remove('paused');
    playPauseBtn.querySelector('i').textContent = "play_arrow";
    playPauseBtn.setAttribute("title", "Play");
    smallPlayPauseBtn.querySelector('i').textContent = "play_arrow";
    smallPlayPauseBtn.setAttribute("title", "Play");
    musicImg.classList.remove('anim');
    musicAudio.pause();
    equalizer.load("");
}

// next music function
const nextMusic = () => {
    musicIndex++;
    (musicIndex > songlist.length) ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    smallPlay(musicIndex);
    playMusic();
    playingNow();
}

// prev music function
const prevMusic = () => {
    musicIndex--;
    musicIndex < 1 ? musicIndex = songlist.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    smallPlay(musicIndex);
    playMusic();
    playingNow();
}

// next music btn event
nextBtn.addEventListener('click', () => {
    nextMusic();
});

// prev music btn event
prevBtn.addEventListener('click', () => {
    prevMusic();
});

// vol mute unmute feature
let isMute = false;

const mute = () => {
    isMute = true;
    volMuteBtn.textContent = "volume_off";
    musicAudio.muted = true;
}
const unMute = () => {
    isMute = false;
    volMuteBtn.textContent = "volume_up";
    musicAudio.muted = false;
}
//M key press for mute
document.addEventListener('keydown', (e) => {
    console.log(e);
    if (e.key == 'm') {
        isMute ? unMute() : mute();
    }
})

// vol mute unmute btn event
volMuteBtn.addEventListener('click', () => {
    isMute ? unMute() : mute();
});

// repeat, shuffle song text according to the icon 
const repeatBtn = musicPlayer.querySelector('#repeat-playlist');
repeatBtn.addEventListener('click', () => {
    let getTxt = repeatBtn.textContent;

    switch (getTxt) {
        case "repeat":
            repeatBtn.textContent = "repeat_one";
            repeatBtn.setAttribute('title', 'Song Looped');
            break;

        case "repeat_one":
            repeatBtn.textContent = "shuffle";
            repeatBtn.setAttribute('title', 'Playback Shuffle');
            break;

        case "shuffle":
            repeatBtn.textContent = "repeat";
            repeatBtn.setAttribute('title', 'Playlist Looped');
            break;
    }
});

// repeat shuffle functionality
musicAudio.addEventListener('ended', () => {
    let getTxt = repeatBtn.textContent;

    switch (getTxt) {
        case "repeat":
            nextMusic();
            break;

        case "repeat_one":
            musicAudio.currentTime = 0;
            loadMusic(musicIndex);
            smallPlay(musicIndex);
            playMusic();
            break;

        case "shuffle":
            let randIndex = Math.floor((Math.random() * songlist.length) + 1);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            smallPlay(musicIndex);
            playMusic();
            playingNow();
            break;
    }
});

// update progressbar according to song duration
musicAudio.addEventListener('timeupdate', (e) => {
    // console.log(e);
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    let circle = document.getElementsByTagName("circle")[0];
    let count = Math.trunc(progressWidth) + 1;
    circle.style.strokeDasharray = `${161 + count * 1.25}`;

    seek_line.style.width = `${progressWidth}%`;

    let musicCurrentTime = musicPlayer.querySelector('.current'),
        musicDuration = musicPlayer.querySelector('.duration');

    musicAudio.addEventListener('loadeddata', () => {
        // update song total duration
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalMin < 10) {
            totalMin = `0${totalMin}`;
        }
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.textContent = `${totalMin}:${totalSec}`;
    });
    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentMin < 10) {
        currentMin = `0${currentMin}`;
    }
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.textContent = `${currentMin}:${currentSec}`;
});

// update song current time according to progress 
progressArea.addEventListener('click', (e) => {
    musicAudio.currentTime = (e.offsetX / progressArea.clientWidth) * musicAudio.duration;
    playMusic();
});

// music list set items from song list
const ulTag = document.querySelector('ul');
songlist.forEach((elm, index) => {
    let liTag = `<li liIndex="${index + 1}">
                 <div class="smallimgBox">
                     <img src="/Assets/Images/${elm.img}.jpg" alt="Album Cover" loading="lazy" draggable="false">
                </div>
                 <div class="oneSongContainer">
                 <span>${elm.name}</span>
                 <p>${elm.artist}</p>
                 </div>
                 <audio class="${elm.src}" src="/Assets/Songs/${elm.src}.mp3"></audio>
                 <span id="${elm.src}" class="audio-duration">00:00</span>
                 </li>`;
    ulTag.insertAdjacentHTML('beforeend', liTag);

    let liAudioTagDuration = ulTag.querySelector(`#${elm.src}`);
    let liAudioTag = ulTag.querySelector(`.${elm.src}`);

    liAudioTag.addEventListener('loadeddata', () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalMin < 10) {
            totalMin = `0${totalMin}`;
        }
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        liAudioTagDuration.textContent = `${totalMin}:${totalSec}`;
        liAudioTagDuration.setAttribute('t-duration', `${totalMin}:${totalSec}`);
    });
});

// play particular song on click list item
const allLiTags = ulTag.querySelectorAll('li');


// add class and set duration of playing song
const playingNow = () => {
    allLiTags.forEach((liTag) => {
        let audioDur = liTag.querySelector('.audio-duration');

        if (liTag.classList.contains('playing')) {
            liTag.classList.remove('playing');
            audioDur.textContent = audioDur.getAttribute('t-duration');;
        }

        if (liTag.getAttribute('liIndex') == musicIndex) {
            liTag.classList.add('playing');
            audioDur.textContent = "Playing Now";
        }

        liTag.setAttribute('onclick', "clicked(this)");
    });

}

// play song on click of list item 
const clicked = (el) => {
    let liIndex = el.getAttribute('liIndex');
    musicIndex = liIndex;
    loadMusic(musicIndex);
    smallPlay(musicIndex);
    playMusic();
    playingNow();
}
//Space Key Press
document.addEventListener('keypress', (e) => {
    console.log(e);
    if (e.key === ' ') {
        isPlaying ? pauseMusic() : playMusic();
    }
});

//Left Arrow Key Press
document.addEventListener('keydown', (e) => {
    console.log(e);
    if (e.keyCode == '37') {
        prevMusic();
    }
})
//Right Arrow Key Press
document.addEventListener('keydown', (e) => {
    console.log(e);
    if (e.keyCode == '39') {
        nextMusic();
    }
})

async function startSearch(searchValue) {
    const searchResult = await fetch(`${api}/suggest/${searchValue}`);
    const data = await searchResult.json();
    // console.log(data);
    showData(data);
}
function showData(data) {
    //     output.innerHTML = `<div class="header">
    //                             <span>Lyrics</span>
    //                         </div>
    //     <ul class="lyrics">
    //       ${data.data
    //             .map(song => `<li>
    //                     <div>
    //                         <strong>${song.artist.name}</strong> -${song.title} 
    //                     </div>
    //                     <span class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
    //                 </li>`
    //             )
    //             .join('')}
    //     </ul>
    //     <i class="material-icons" id="showplayerBtn" style="position: absolute;
    //     right: 50%; cursor: pointer;">arrow_drop_down</i>
    //   `;
    output.innerHTML = `<div class="header">
                             <span>Lyrics</span>
                        </div>
    <pre id="lyrics-display">${arr[musicIndex - 1]}</pre>
    <i class="material-icons" id="showplayerBtn" style="position: absolute;
    right: 47%; bottom:4%; cursor: pointer;">arrow_drop_down</i>`
    const showplayerBtn = output.querySelector("#showplayerBtn");
    showplayerBtn.addEventListener("click", () => {
        musicPlayer.classList.toggle("hidden");
        hideLyrics.classList.toggle("hidden");
    });
}
//event listener in get lyrics button
// output.addEventListener('click', e => {
//     const clickedElement = e.target;

//     //checking clicked element is button or not
//     if (clickedElement.tagName === 'SPAN') {
//         const artist = clickedElement.getAttribute('data-artist');
//         const songTitle = clickedElement.getAttribute('data-songtitle');
//         getLyrics(artist, songTitle);
//     }
// });

// async function getLyrics(artist, songTitle) {
//     const response = await fetch(`${api}/v1/${artist}/${songTitle}`);
//     const data = await response.json();
//     const lyrics = data.lyrics;
//     // alert(lyrics)

//     console.log(data)
//     if (!lyrics === undefined) {
//         output.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2></br>
//         <p id="lyrics-display" style="font-size: 1.8;opacity: 0.8;">Lyrics for this song doesn't exist in this api</p>`;
//     }
//     else {
//         output.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
//     <p id="lyrics-display">${lyrics}</p>`
//     }
// }

const hideLyrics = document.querySelector("#hidding_lyrics");
lyricBtn.addEventListener("click", () => {
    musicPlayer.classList.toggle("hidden");
    hideLyrics.classList.toggle("hidden");
});

const Albums = document.querySelector(".allAlbums")
songlist.forEach((elm, index) => {
    let albumTag = `
    <div class="albums" alt="${index + 1}" onclick="albumBtnClicked(this)">
    <div class="albumImg">
        <img src="/Assets/Images/${elm.img}.jpg" loading="lazy"}>
    </div>
        <div class="albumBtn">
            <div id="albumBtnTitle">
            <span>${elm.name}</span>
            <p>${elm.artist}</p>
        </div>
            <i class="material-icons">play_circle</i>
        </div>
    </div>
    `
    Albums.insertAdjacentHTML('beforeend', albumTag);
});
const albumBtnClicked = (el) => {
    let albumIndex = el.getAttribute('alt');
    musicIndex = albumIndex;
    loadMusic(musicIndex);
    smallPlay(musicIndex);
    playMusic();
    playingNow();
}


const hiddingTracks = document.querySelector(".hiddingTracks");
const AlbumSeeAll = document.querySelector("#AlbumTitle p");
AlbumSeeAll.addEventListener("click", () => {
    followingBox.classList.toggle("hidden");
    hiddingTracks.classList.toggle("hidden");
    if (hiddingTracks.classList.contains("hidden")) {
        Albums.style.height = "370px";
        if (mobileMode==true) {
            Albums.style.height = "520px";
        }
        Albums.style.overflowY = "scroll";
        AlbumSeeAll.textContent = "See less";
    }
    else {
        AlbumSeeAll.textContent = "See all";
        Albums.style.height = "100px";
        if(mobileMode==true)
        {
            Albums.style.height = "120px";
        }
        Albums.style.overflowY = "hidden";
        Albums.scroll(0, 0);
    }
});
const hiddingAlbums = document.querySelector(".hiddingAlbums");
const TracksSeeAll = document.querySelector(".allTracks p");
const ul_library = document.querySelector(".music_library ul");
TracksSeeAll.addEventListener("click", () => {
    TracksSeeAll.textContent = "See less";
    followingBox.classList.toggle("hidden");
    hiddingAlbums.classList.toggle("hidden");
    if (hiddingAlbums.classList.contains("hidden")) {
        ul_library.style.maxHeight = "37.3rem";
        if (mobileMode==true) {
            ul_library.style.maxHeight = "53.3rem";
        }
        TracksSeeAll.textContent = "See less";
    }
    else {
        ul_library.style.maxHeight = "10rem";
        if (mobileMode==true) {
            ul_library.style.maxHeight = "22rem";
        }
        ul_library.scroll(0, 0);
        TracksSeeAll.textContent = "See all";
    }
});

setTimeout(()=>{

    var flag = 0;
    followBtn.addEventListener("click", () => {
    if (flag == 1) {
        window.open(
            'https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz',
            '_blank'
        );
    }
    else {
        window.open(
            'https://open.spotify.com/artist/5ZsFI1h6hIdQRw2ti0hz81',
            '_blank'
            );
        }
    });
},5000);

var counter = 1;
setInterval(() => {
    document.getElementById("radio" + counter).checked = true;
    counter++;
    flag = 1;
    if (counter > 2) {
        counter = 1;
        flag = 0;
    }
}, 10000);