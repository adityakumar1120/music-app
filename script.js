let songs = [
    {
    songName : '1000 Hours',
    url: "./songs/1000 hours.mp3",
    img: './imgs/1000 hours.jpeg'
    },
    {
    songName : 'Blinding Lights',
    url: "./songs/blinding lights.mp3",
    img: "./imgs/blinding lights.jpeg"
    },
    {
    songName : 'Die with a smile',
    url: "./songs/die with a smile.mp3",
    img: "./imgs/die with a smile.jpeg"
    },
    {
    songName : 'Perfect',
    url: "./songs/perfect.mp3",
    img: "./imgs/perfect.jpeg"
    },
    {
    songName : 'save your tears',
    url: "./songs/save your tears.mp3",
    img: "./imgs/save your tears.jpg"
    },

]

const coverImg = document.querySelector('.coverImg')
const play = document.querySelector('#play')
const backward = document.querySelector('#backward')
const forward = document.querySelector('#forward')
// const shuffle = document.querySelector('#shuffle')
let seekBar = document.querySelector('#seekBar')
let audio = new Audio()
const allSongsEl =document.querySelector('#all-songs')
let selectedSong = 0

// seekBar.value = 0
function mainFunction(){
    let clutter = ``
songs.forEach((e, index)=>{
    clutter += `<div class="song-card" id=${index}>
                    <div id="part-1">
                        <img src="${e.img}" alt="die with a smile">
                    <h2 class="yo">${e.songName}</h2>
                    </div>
                    <button class="add-to-queue black" data-id="0">Add to Queue</button>

                    <h6 class="duration">03:00</h6>
                    </div>`
})


// duration.innerHTML = '12'
// h2.innerText = 'perfect'
// console.log(audio.src);
// console.log(audio.duration);
allSongsEl.innerHTML = clutter


audio.src = songs[selectedSong].url
coverImg.src = `${songs[selectedSong].img}`
if(selectedSong > 0){
    backward.style.opacity = 1
}
audio.load()
}
mainFunction()

// let head = document.querySelectorAll('.yo')
// head[0].innerText = 'lover'

let duration = document.querySelectorAll('.duration')

//seekbar
let playedPercentage;
let min
let sec
audio.addEventListener('timeupdate', ()=>{
    // console.log(audio.currentTime, audio.duration);
    if(audio.currentTime){
    playedPercentage = parseInt(audio.currentTime / audio.duration*100)
    console.log(playedPercentage);
    seekBar.value = playedPercentage
//    console.log(songs[selectedSong]);
//    console.log(duration[selectedSong].innerText = 23);
        min = Math.floor(audio.currentTime/60)
    sec = Math.floor(audio.currentTime%60)
    document.querySelector('h1').innerText =` ${min} : ${sec}`
    }
})

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

let playedSeconds
seekBar.addEventListener('input', ()=>{
    playedSeconds = playedPercentage/100 * audio.duration
    console.log(playedSeconds);
    // seekBar.value = playedPercentage
    audio.currentTime = seekBar.value/100 * audio.duration
})
//seekbar


allSongsEl.addEventListener('click', (e)=>{
    play.innerHTML = `<i class="ri-pause-fill"></i>`
    isPlaying = 1
    selectedSong = parseInt(e.target.id)
    mainFunction()
    audio.play()
    console.log(e);
    // if(e.target.classList.contains('add-to-queue')){
    //     console.log('grishma');
    // }
})
audio.addEventListener('loadeddata',()=>{
    console.log(audio.duration, audio.currentTime,(seekBar.value / 100) * audio.duration);
})
function EventListeners(){
    forward.addEventListener('click' ,()=>{
        if(selectedSong < songs.length -1){
            selectedSong+= 1
        mainFunction()
        audio.play()
        console.log(selectedSong);
        } else{
            forward.style.opacity = 0.4
        }
    })
    let isPlaying = 0
    play.addEventListener('click', ()=>{
        if(isPlaying == 0){
        mainFunction()
        play.innerHTML = `<i class="ri-pause-fill"></i>`
        // seekBar.value = playedPercentage
        let seekValue = parseInt(seekBar.value);
        
        // if (isNaN(audio.duration)) audio.currentTime = 0; // Fallback to 0 if seekBar.value is invalid
        // audio.currentTime = (seekBar.value / 100) * audio.duration || 0;
        
        console.log(audio.duration, audio.currentTime,(seekBar.value / 100) * audio.duration);
        audio.play()
        isPlaying = 1
        
    
    } else{
        mainFunction()
        audio.pause()
        play.innerHTML = `<i class="ri-play-fill"></i>`
        isPlaying = 0
        seekBar.value = playedPercentage
         document.querySelector('h1').innerText =` ${min} : ${sec}`
        }
    })
    backward.addEventListener('click' ,()=>{
      if(selectedSong > 0){
        selectedSong -= 1
        mainFunction()
        audio.play()
        console.log(selectedSong);
        backward.style.opacity = 1
      } else{
        backward.style.opacity = 0.4
      }
    })
    
}

EventListeners()