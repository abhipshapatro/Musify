let audioElement = new Audio("songs/1.mp3");
// audioElement.play();



let songIndex = 0;
let playBtn = document.querySelector("#play-btn");
let musicBar = document.querySelector("#music-bar");
let gif = document.querySelector("#gif");
let songItems = Array.from(document.getElementsByClassName("song"));
let songPlay = Array.from(document.getElementsByClassName("song-play"));
let nextSong = document.getElementById("next");
let previousSong = document.getElementById("previous");
let masterSongName = document.getElementById("master-song-name");

let songs = [
    {songName : "abc" , songPath : "songs/1.mp3",coverPath : "covers/1.jpg"} ,
    {songName : "def" , songPath : "songs/2.mp3",coverPath : "covers/2.jpg"} ,
    {songName : "ghi" , songPath : "songs/3.mp3",coverPath : "covers/3.jpg"} ,
    {songName : "jkl" , songPath : "songs/4.mp3",coverPath : "covers/4.jpg"} ,
    {songName : "mno" , songPath : "songs/5.mp3",coverPath : "covers/5.jpg"} ,
    {songName : "pqr" , songPath : "songs/6.mp3",coverPath : "covers/6.jpg"} 
]

//changing song name
songItems.forEach( (element , i )=>{
    // console.log(element , i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("song-name")[0].innerText = songs[i].songName;
});


//handle play/pause click
playBtn.addEventListener("click" , playPauseSong );

function playPauseSong(){
    
    if( audioElement.paused || audioElement.currentTime == 0){
        // console.log("playing");
        audioElement.play();
        playBtn.classList.remove("fa-play-circle");
        playBtn.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    }
    else{
        // console.log("pause");
        audioElement.pause();
        playBtn.classList.remove("fa-pause-circle");
        playBtn.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
}

audioElement.addEventListener("timeupdate" , updateSeekBar );

function updateSeekBar(){
    // console.log("update");
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    musicBar.value = progress;
}

musicBar.addEventListener("change" , updateAudioOnMusicBar );

function updateAudioOnMusicBar(){
    audioElement.currentTime = musicBar.value*audioElement.duration/100;
}




//make all play btns to pause
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("song-play")).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
}

songPlay.forEach((element)=>{
    element.addEventListener("click" , (e)=>{
        // console.log(e.target);
        console.log("hekllo")
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        playBtn.classList.remove("fa-play-circle");
        playBtn.classList.add("fa-pause-circle");
    });
});



//next song
nextSong.addEventListener("click" , PlayNextSong );
function PlayNextSong(){
    if(songIndex>=5){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    // gif.style.opacity = 1;
    playBtn.classList.remove("fa-play-circle");
    playBtn.classList.add("fa-pause-circle");
}

//previous song
previousSong.addEventListener("click" , PlayPreviousSong );
function PlayPreviousSong(){
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    // gif.style.opacity = 1;
    playBtn.classList.remove("fa-play-circle");
    playBtn.classList.add("fa-pause-circle");
}