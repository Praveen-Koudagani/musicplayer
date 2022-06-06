import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Outlet, Route, Router, Routes, useNavigate } from 'react-router-dom';
import auth from '../auth';
import Player from './MusicPlayer';
import Navbar from './Navbar';
import { ResponsiveAppBar, SongsPage } from './SongsPage';
import PlayCircleSharpIcon from '@mui/icons-material/PlayCircleSharp';
import StopCircleSharpIcon from '@mui/icons-material/StopCircleSharp';

const Home = () => {
  const navigate=useNavigate();

let data;
let currentsong;
  const [songsList, setSongsList] = useState({});
  const getSongsList = () => {
    axios.get("http://localhost:8080/api/music/getSongs").then((res) => {
      const Songs = res.data;
      Songs.forEach(song => {
        song["playing"]=false;
      
        const newsong= {};
        newsong[song["songName"]]=song;
        Object.assign(songsList,newsong);
        
      });
      setSongsList({...songsList});
      console.log(songsList);

    });
  };
  useEffect(() => {
    getSongsList();
    const interval = setInterval(() => getSongsList(), 10000000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const toggleSong=(song)=>{
    songsList[song[0]]["playing"]=!songsList[song[0]]["playing"];
setSongsList({...songsList});
console.log(songsList[song[0]]);
currentsong="songs/"+song[0];
console.log(currentsong);
  };

data=Object.entries(songsList).map(song=>{
  
  console.log("hi");

  return <div key={song[0]}><p>{song[1].songName}<span>{
    songsList[song[0]]["playing"] ?
    <button onClick={()=>{toggleSong(song)}}>
      <StopCircleSharpIcon/></button>:
    <button onClick={()=>{toggleSong(song)}}>
     <PlayCircleSharpIcon/></button>}
    </span></p>
  {/* <Player url={"songs/"+song["songName"]}/> */}
  </div>
});
const audiotag=[currentsong].map(()=>{
return <audio controls src={currentsong} type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
});

  return (
    <div>
      <div>
        <Navbar/>
        <Outlet/>
        <div>{data}</div>
        <div>{audiotag}</div>
      </div>
      
    </div>
  );
}

export default Home