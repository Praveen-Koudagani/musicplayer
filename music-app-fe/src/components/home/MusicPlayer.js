import { PauseCircle, PlayCircleSharp, VolumeMuteSharp, VolumeUpSharp } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import styles from './MusicPlayer.module.css';

const MusicPlayer = (props) => {
    const playerButton =useRef();
      const audio = props.audioref;
      const timeline =useRef();
      const soundButton = useRef();
      const playIcon =<PlayCircleSharp/>;
      const pauseIcon =<PauseCircle/>;
      const soundIcon = <VolumeUpSharp/>;
      const muteIcon = <VolumeMuteSharp/>;
      const [muteOrSound,setMuteOrSound]=useState(soundIcon);

const toggleAudio =()=> {
  props.toggleSong([props.song]);
};

const changeTimelinePosition= ()=> {
  const percentagePosition = (100*audio.current.currentTime) / audio.current.duration;
  timeline.current.style.backgroundSize = `${percentagePosition}% 100%`;
  timeline.current.value = percentagePosition;
};
useEffect(()=>{
    audio.current.ontimeupdate = changeTimelinePosition;
    
},[]);



const audioEnded= ()=> {
  props.playing["setPlaying"](false);
  props.changeCurrentSongStatus();
};



const changeSeek= ()=> {
  const time = (timeline.current.value * audio.current.duration) / 100;
  audio.current.currentTime = time;
};


const toggleSound= ()=> {
  audio.current.muted = !audio.current.muted;
  setMuteOrSound(audio.current.muted ? muteIcon : soundIcon);
}

  return (
    <div>

<div className={styles["audio-player"]}>
  <audio ref={audio} src={process.env.PUBLIC_URL+"/songs/"+props.song} onEnded ={ audioEnded}></audio>
  <div className={styles["controls"]}>
    <button ref={playerButton} className={styles["player-button"]} onClick={toggleAudio} >
      {props.playing["playing"]?pauseIcon:playIcon}
    </button>
    <input type="range" ref={timeline} className={styles["timeline"]} max="100" value="0" onChange={changeSeek}/>
    <button ref={soundButton} className={styles["sound-button"]} onClick={toggleSound} >
     {muteOrSound}
    </button>
  </div>
</div>

    </div>
  )
}

export default MusicPlayer