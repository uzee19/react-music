import React from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay,faAngleLeft,faAngleRight,faPause} from "@fortawesome/free-solid-svg-icons";
 
const Player = ({audioRef, setSongs ,setCurrentSong,currentSong,isPlaying, songs, setisPlaying,setsongInfo,songInfo}) =>{
    
    const activeLibraryHandler = (nextPrev) =>{
        const newSongs = songs.map((song)=>{
            if(song.id === nextPrev.id)
            {
                return{
                    ...song,
                    active:true,
                }
            }
            else{
                return{
                    ...song,
                    active:false, 
                }
            }
        })
        setSongs(newSongs);
    }

    //Event Handlers
    const playSongHandler = () =>{
        if(isPlaying){
            audioRef.current.pause();
            setisPlaying(!isPlaying);
        }
        else{
            audioRef.current.play();
            setisPlaying(!isPlaying);
        }
};
    
    const getTime = (time) =>{
        return(
            Math.floor(time/60) + ":" + ("0" + Math.floor(time%60)).slice(-2)
        );
    };
    
    const dragHandler  = (e)=>{
        audioRef.current.currentTime = e.target.value;
        setsongInfo({...songInfo, currentTime: e.target.value});
    }
    const skipTrackHandler = async (direction) =>{
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction==='skip-forward')
        {
            await setCurrentSong(songs[(currentIndex+1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex+1) % songs.length])
        }
        if(direction==='skip-back')
        {
            if(currentIndex===0)
            {
                currentIndex = songs.length;
            } 
            await setCurrentSong(songs[(currentIndex-1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex-1) % songs.length])
        }
        if(isPlaying) audioRef.current.play()
    }
    //Styles
    const trackAnim ={
        transform: `translateX(${songInfo.animationPercent}%)`
    }
    
    return(
        <div className="player">
            <div className="time-control">
             <p>{getTime(songInfo.currentTime)}</p>
             <div style={{background:`linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
            <input onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" />
            <div style={trackAnim} className="animate-track"> </div>
            </div>
             <p>{songInfo.duration? getTime(songInfo.duration): "0:00"}</p>

            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon ={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" 
                icon ={isPlaying? faPause: faPlay} />
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon ={faAngleRight} />

            </div>
            
        </div>
    );
};

export default Player; 