export const playAudio = (isPlaying,audioRef) =>{
    if(isPlaying)
        {
            const playPromise= audioRef.current.play();
            if(playPromise!==undefined){
                playPromise.then((audion)=>{
                    audioRef.current.play();
                });
            }
        }
}

