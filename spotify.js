


async function getsongs() {


    let a =  await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text()
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML= response;
    let as = div.getElementsByTagName("a")
    let songs =[]
    for(let index = 0; index < as.length ; index++){
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}

const playMusic = (track)=>{
    let audio = new Audio("/songs/" + track)
    audio.play()

}



 async function main(){
    let currentSong;
    let songs =  await getsongs()
    console.log(songs)


    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs){
        songUL.innerHTML = songUL.innerHTML + `  <li> <img class="invert" src = "music (1).svg" alt="">
                            <div class="info">      
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div>Song Artist</div>
                            </div>
                           <div class="Playnow">
                               <span>Play Now</span>
                               <img class="invert" src="play.svg" alt="">
                           </div></li>` ;
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element =>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

}
 
main() 
