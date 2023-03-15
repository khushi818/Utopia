const App_Id = "50aa357a11604d798b12088f413a4efa"
const Channel = 'main'
const Token = "007eJxTYIi8L3//8uz1ChsEvv4OmLpSL2S9xYO85v39iw23nq5R4OlWYDA1SEw0NjVPNDQ0MzBJMbe0SDI0MrCwSDMxNE40SU1LjD8tkNIQyMjg/WsWMyMDBIL4LAy5iZl5DAwAm9IgJQ=="
let UID;

const client = AgoraRTC.createClient({mode:'rtc',codec:'vp8'})

let localTracks =[]
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
//    document.getElementById('room-name').innerText = CHANNEL

    client.on('user-published', handleUserJoined)
   client.on('user-left', handleUserLeft)

    try{
        UID = await client.join(App_Id, Channel , Token , UID)
    }catch(error){
        console.error(error)
        window.open('/join', '_self')
    }
    
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    //let member = await createMember()

    let player = `<div  class="video-container" id="user-container-${UID}">
                     <div class="video-player" id="user-${UID}"></div>
                     <div class="username-wrapper"><span class="user-name">Name</span></div>
                  </div>`
    
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
    localTracks[1].play(`user-${UID}`)
    await client.publish([localTracks[0], localTracks[1]])
}

let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user
    await client.subscribe(user, mediaType)

    if (mediaType === 'video'){
        let player = document.getElementById(`user-container-${user.uid}`)
        if (player != null){
            player.remove()
        }

        //let member = await getMember(user)

        player = `<div  class="video-container" id="user-container-${user.uid}">
            <div class="video-player" id="user-${user.uid}"></div>
            <div class="username-wrapper"><span class="user-name">Name</span></div>
        </div>`

        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
        user.videoTrack.play(`user-${user.uid}`)
    }

    if (mediaType === 'audio'){
        user.audioTrack.play()
    }
}

let handleUserLeft = async(user) =>{
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}

let leaveAndRemoveLocalStream = async() =>{
   for(let i = 0 ; i < localTracks.length ; i++)
   {
    localTracks[i].stop()
    localTracks[i].close()
   }

   await client.leave()
   window.open('/join','_self')
}

let toggleCamera = async (e) =>{
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
    }
    else{
        await localTracks[1].setMuted(false)
    }
    console.log("stream btn")
}

document.getElementById('leave-button').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('camera-btn').addEventListener('click', toggleCamera)

joinAndDisplayLocalStream()
console.log("stream connected")