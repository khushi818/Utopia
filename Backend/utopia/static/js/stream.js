const App_Id = "50aa357a11604d798b12088f413a4efa"
const Channel = 'main'
const Token = "007eJxTYOC1Y9jcp7dEauf6GENekcy/n0RW7L2UVcnndSr1wNmVvVcVGEwNEhONTc0TDQ3NDExSzC0tkgyNDCws0kwMjRNNUtMSvx7kSmkIZGQ4peLMzMgAgSA+C0NuYmYeAwMA7ececA=="

let UID;

const client = AgoraRTC.createClient({mode:'rtc',codec:'vp8'})

let localTracks =[]
let remoteUsers = {}

let joinAndDisplayLocalStream = async () =>{

    client.on("user-published", handleUserJoined) 

    UID = await client.join(App_Id,Channel,Token,UID)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    console.log(localTracks[0])
     
    player = `<div class = "video-container" id = "user-container-${UID}">
        <div class= "username-wrapper"><span class = "user-name">My Name</span></div>
        <div class = "video-player" id = "user-${UID}"></div>
        </div>  `

    document.getElementById('video-streams').insertAdjacentHTML('beforeend',player)
     
    localTracks[1].play(`user-${UID}`)

    await client.publish(localTracks[0],localTracks[1])
}

let handleUserJoined = async (user,mediaType) =>{
    remoteUsers[user.uid] = user
    
    await client.subscribe(user,mediaType)
    if(mediaType === 'video')
    {
      let player = document.getElementById(`user-container-${user.uid}`)
      console.log(player) 
    //    if(player != null)
    //    {
    //      player.remove()
    //    }
         player = `<div class = "video-container" id = "user-container-${user.uid}">
        <div class= "username-wrapper"><span class = "user-name">My Name</span></div>
        <div class = "video-player" id = "user-${user.uid}"></div>
        </div>  `

    document.getElementById('video-streams').appendChild(player)
     
    user.videoTrack.play()
    }

    if(mediaType ===  'audio')
    {
        user.audioTrack.play();
    }
}

joinAndDisplayLocalStream()
console.log("stream connected")