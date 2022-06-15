import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from './Home';
import PlayCircleSharpIcon from '@mui/icons-material/PlayCircleSharp';
import StopCircleSharpIcon from '@mui/icons-material/StopCircleSharp';
import { FavoriteBorder, FavoriteOutlined } from '@mui/icons-material';


const Favourites = () => {
  const [songsList, setSongsList] = useState({});
  const context=useContext(Context);
  let data;
  const getFavourites=()=>{
    axios.post("http://localhost:8080/api/music/getFavouriteSongs",{"username":localStorage.getItem('username')}).then((res) => {
      const Songs = res.data;
      //console.log(context);
      Songs.forEach(songname => {
      
       const song=context["songsList"][songname];
       console.log(songname);
        const newsong= {};
        newsong[song["songName"]]=song;
     
        Object.assign(songsList,newsong);
        
      });
      setSongsList({...songsList});
      
    });
  };

  useEffect(() => {
    getFavourites();
  }, [setSongsList]);

data=Object.entries(songsList).map(song=>{
  if(song[1].isFav && (song[0].toLowerCase().includes(context["searchWord"].toLowerCase()) || context["searchWord"]==="")){
      return <div key={song[0]}><p>{song[1].songName}<span>{
        songsList[song[0]]["playing"] ?
        <button onClick={()=>{context["toggleSong"](song)}}>
          <StopCircleSharpIcon/></button>:
        <button onClick={()=>{context["toggleSong"](song)}}>
         <PlayCircleSharpIcon/></button>}
        </span><span>
          <button onClick={()=>{context["toggleFavourite"](song);
          setSongsList(...songsList);
        }}>{songsList[song[0]]["isFav"]?<FavoriteOutlined/>:<FavoriteBorder/>}</button></span></p>
      {/* <Player url={"songs/"+song["songName"]}/> */}
      </div>}
    });
  
  return (
    <div>
     {data}
    </div>
  )
}

export default Favourites