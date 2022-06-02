import { Label } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import auth from '../auth';

const Home = () => {
  const navigate=useNavigate();
 const handleLogout=(event)=>{
localStorage.clear();
auth.logout();
navigate("/Login");
  }

  const [songsList, setSongsList] = useState([]);
  const getSongsList = () => {
    axios.get("http://localhost:8080/api/music/getSongs").then((res) => {
      const Songs = res.data;
      setSongsList(Songs);
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
  console.log(song["songName"]);
  return <div><p>{song["songName"]}</p>
  <br/>
  <audio controls autoPlay>
  <source src="./Pareshanayya.mp3" type="audio/mpeg"/>
Your browser does not support the audio element.
</audio>
  </div>;
});

  return (
    <div>
      <div>
        <label>welcome to dashboard</label>
        <input type="button" name="logout" value="Logout" onClick={handleLogout}></input>
        <div>{data}</div>
        
      </div>
    </div>
  );
}

export default Home