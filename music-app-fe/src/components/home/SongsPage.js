import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from './Home';
import PlayCircleSharpIcon from '@mui/icons-material/PlayCircleSharp';
import StopCircleSharpIcon from '@mui/icons-material/StopCircleSharp';
import { FavoriteBorder, FavoriteOutlined } from '@mui/icons-material';


export const SongsPage = () => {
  const context=useContext(Context);
 let data=Object.entries(context["songsList"]).map(song=>{
  
    console.log("hi");
  
    return <div key={song[0]}><p>{song[1].songName}<span>{
      context["songsList"][song[0]]["playing"] ?
      <button onClick={()=>{context["toggleSong"](song)}}>
        <StopCircleSharpIcon/></button>:
      <button onClick={()=>{context["toggleSong"](song)}}>
       <PlayCircleSharpIcon/></button>}
      </span><span>
          <button onClick={()=>{context["toggleFavourite"](song)}}>{context["songsList"][song[0]]["isFav"]?<FavoriteOutlined/>:<FavoriteBorder/>}</button></span></p>
    {/* <Player url={"songs/"+song["songName"]}/> */}
    </div>
  });
  return (
    <div>
     {data}
    </div>
    )
}
