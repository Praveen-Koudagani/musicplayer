import axios from 'axios';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { Outlet,useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import MusicPlayer from './MusicPlayer';

const Context=createContext();
const Home = () => {

let data;
const audio = useRef();
let songsdir="/songs/";
  const [songsList, setSongsList] = useState({});
  const [csong,setCsong]=useState();
  const [searchWord,setSearchWord]=useState("");
  const [playing,setPlaying]=useState(false);
  const [playflag,setPlayFlag]=useState(false);
  
 
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
      //console.log(songsList);
    });

  };

  useEffect(() => {
    getSongsList();
  }, [setSongsList]);
  useEffect(()=>{
    toggleAudio();
  },[playflag]);

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
    if(csong && csong!==song[0] ){
      if(songsList[csong]["playing"]){
      songsList[csong]["playing"]=!songsList[csong]["playing"];}
      songsList[song[0]]["playing"]=!songsList[song[0]]["playing"];
      if(!playing){
      setPlaying(true);
      setPlayFlag(!playflag);}
      else{
        setPlayFlag(!playflag);
      }
    }
    if(csong==song[0] || !csong){
    songsList[song[0]]["playing"]=!songsList[song[0]]["playing"];
    setPlaying(!playing);
    setPlayFlag(!playflag);
    }
    setSongsList({...songsList});
     //console.log(songsList[song[0]]);
    setCsong(song[0]);
    //console.log(csong);
    
  };
  const changeCurrentSongStatus=()=>{
    console.log(songsList);
    songsList[csong]["playing"]=!songsList[csong]["playing"];
    setSongsList({...songsList});
    console.log("gopi");
  };
  const toggleAudio=()=>{
    //console.log("in audio ");
  if(audio.current.paused){
    audio.current.play();}
    else{
      audio.current.pause();
    }};


// const audiotag=[csong].map(()=>{
// return <audio controls src={process.env.PUBLIC_URL+songsdir+csong} type="audio/mpeg" autoPlay loop>
//   Your browser does not support the audio element.
// </audio>
// });

  return (
    <div>
        <Navbar searchWord={searchWord} setSearchWord={setSearchWord}/>
        <div style={{paddingTop:70,paddingBottom:"5%",position:"relative"}}>
        <Context.Provider value={{"songsList": songsList, "data" : data, "toggleSong" : toggleSong,
        "toggleFavourite":toggleFavourite,
        "searchWord":searchWord} }>
          <Outlet/>
        </Context.Provider>
        </div>
        {/* <div style={{position:"fixed",bottom:0}}>{audiotag}</div> */}
        <div style={{position:"fixed",bottom:0,width:"100%",zIndex:"auto",backgroundColor:"white"}}>
        <MusicPlayer song={csong} toggleSong={toggleSong} songsList={songsList} 
        audioref={audio} playing={{"playing":playing,"setPlaying":setPlaying}} changeCurrentSongStatus={changeCurrentSongStatus}/>
        <div style={{marginBottom:3}}>{csong}</div>
        </div>
        
      
    </div>
  );
}

export default Home
export {Context};