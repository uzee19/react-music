import React from "react";
import LibrarySong from './LibrarySong'

const Library = ({songs ,setCurrentSong,audioRef,isPlaying,setSongs,LibraryStatus}) => {

    return(
        <div className = {`library ${LibraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song)=>(
                    <LibrarySong id = {song.id} key={song.id} 
                    songs ={songs} song = {song} 
                    setCurrentSong={setCurrentSong}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    setSongs={setSongs}/>
                ))} 
                {/* react req to pass id with a key */}
            </div>
        </div>
    )
}

export default Library;