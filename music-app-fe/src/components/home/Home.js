import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Outlet, Route, Router, Routes, useNavigate } from 'react-router-dom';
import auth from '../auth';
import Player from './MusicPlayer';
import Navbar from './Navbar';
import { ResponsiveAppBar, SongsPage } from './SongsPage';
import PlayCircleSharpIcon from '@mui/icons-material/PlayCircleSharp';
import StopCircleSharpIcon from '@mui/icons-material/StopCircleSharp';
import { Favorite } from '@mui/icons-material';

const Context=createContext();
const Home = () => {

let data;
let songsdir="/songs/";
  const [songsList, setSongsList] = useState({});
  const [csong,setCsong]=useState();
  
 
  const getSongsList = () => {
    axios.get("http://localhost:8080/api/music/getSongs").then((res) => {
      const Songs = res.data;
      Songs.forEach(song => {
        song["playing"]=false;
        song["isFav"]=false;
      
        const newsong= {};
        newsong[song["songName"]]=song;
        Object.assign(songsList,newsong);
        
      });
      favouriteSongs(songsList);
      

    });
  };
  const favouriteSongs=(songsList)=>{
    axios.post("http://localhost:8080/api/music/getFavouriteSongs",{"username":localStorage.getItem('username')}).then((res) => {
      const Songs = res.data;
      
      Songs.forEach(songname => {
      songsList[songname]["isFav"]=true;  
      });
      setSongsList({...songsList});
      console.log(songsList);
    });

  };

  useEffect(() => {
    getSongsList();
  }, [setSongsList]);

  const toggleFavourite=(song)=>{
    if(songsList[song[0]]["isFav"]){
      axios.delete("http://localhost:8080/api/music/UnFavouriteSong",{data:{username:localStorage.getItem('username'),songName:song[0]}});
    }else{
      axios.post("http://localhost:8080/api/music/saveFavouriteSong",{"username":localStorage.getItem('username'),"songName":song[0]});
    }
    songsList[song[0]]["isFav"]=!songsList[song[0]]["isFav"];
    setSongsList({...songsList});
  };
  
  const toggleSong=(song)=>{
    if(csong && csong!==song[0] && songsList[csong]["playing"]){
      songsList[csong]["playing"]=!songsList[csong]["playing"];}
    songsList[song[0]]["playing"]=!songsList[song[0]]["playing"];
    console.log(csong);
setSongsList({...songsList});
console.log(songsList[song[0]]);
setCsong(song[0]);
console.log(csong+"hi");
  };


const audiotag=[csong].map(()=>{
return <audio controls src={process.env.PUBLIC_URL+songsdir+csong} type="audio/mpeg" autoPlay loop>
  Your browser does not support the audio element.
</audio>
});

  return (
    <div>
        <Navbar/>
        <div style={{paddingTop:70,position:"relative"}}>
        <Context.Provider value={{"songsList": songsList, "data" : data, "toggleSong" : toggleSong,"toggleFavourite":toggleFavourite} }>
          <Outlet/>
        </Context.Provider>
        </div>
        <div style={{position:"fixed",bottom:0}}>{audiotag}</div>
        <div>{csong}</div>
          <br></br>
      
    </div>
  );
}

export default Home
export {Context};