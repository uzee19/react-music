import React ,{useState,useRef} from 'react';
//importing styles
import './styles/app.scss';
//importing components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
//import data
import data from "./data";
function App() {
  //Ref
  const audioRef = useRef(null);
  //State
  const [songs,setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying , setisPlaying] = useState(false);
  const [songInfo, setsongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercent:0, 
});
  const [LibraryStatus, setLibraryStatus] = useState(false);
  const timeUpdateHandler = (e) =>{
  const current = e.target.currentTime;
  const duration = e.target.duration;
  const animation = Math.round((current)*100/(duration));
  
  setsongInfo({...songInfo,
    currentTime:current, 
    duration:duration,
  animationPercent:animation})
};
const  songEndHandler = async () =>{
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  
  
      await setCurrentSong(songs[(currentIndex+1) % songs.length]);
      if(isPlaying) audioRef.current.play() 
}
  return (
    <div className={`App ${LibraryStatus ? "library-active" :""}`}>
      <Nav LibraryStatus={LibraryStatus} setLibraryStatus={setLibraryStatus}/>
     <Song currentSong={currentSong} isPlaying={isPlaying}/>
     <Player 
     audioRef={audioRef}
      setisPlaying={setisPlaying}
      isPlaying={isPlaying} 
      currentSong={currentSong}
      setsongInfo={setsongInfo}
      songInfo={songInfo}
      songs={songs}
      setCurrentSong={setCurrentSong}
      setSongs={setSongs}/>
      <Library songs = {songs} setCurrentSong={setCurrentSong}
      audioRef={audioRef}
      isPlaying={isPlaying}
      setSongs={setSongs}
      LibraryStatus={LibraryStatus}/>
      <audio 
             onLoadedMetadata={timeUpdateHandler}
             onTimeUpdate={timeUpdateHandler} 
             ref={audioRef}
              src={currentSong.audio}
              onEnded={songEndHandler}
              ></audio>
    </div>
  );
}

export default App;
