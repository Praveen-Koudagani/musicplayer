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


  const [songsList, setSongsList] = useState([]);
  const getSongsList = () => {
    axios.get("http://localhost:8080/api/music/getSongs").then((res) => {
      const Songs = res.data;
      setSongsList(Songs);
      console.log(Songs);
    });
  };
  useEffect(() => {
    getSongsList();
    const interval = setInterval(() => getSongsList(), 10000000);
    return () => {
      clearInterval(interval);
    };
  }, []);

const data=songsList.map((song)=>{
  song["playing"]=false;
  console.log(song["playing"]);

  return <div key={song["songName"]}><p>{song["songName"]}<span><button></button></span></p>
  {/* <Player url={"songs/"+song["songName"]}/> */}
  </div>;
});

  return (
    <div>
      <div>
        <Navbar/>
        <Outlet/>
        <div>{data}</div>
      </div>
      
    </div>
  );
}

export default Home