import { Close, Menu, Search } from '@mui/icons-material';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import auth from '../auth';
import styles from './navbar.module.css';

const Navbar = (props) => {
    const [showLinks,setShowLinks]=useState(false);
    const navigate=useNavigate();
 const handleLogout=()=>{
  localStorage.clear();
  auth.logout();
  navigate("/Login");
  }
  const handleSearch=(event)=>{
props.setSearchWord(event.target.value);
  };
  const clearSearchdata=()=>{
    props.setSearchWord("");
  };
  return (
    <div>
    <div className={styles.Navbar}>
        <div className={styles.leftSide}>
            <div className={[styles.links,styles.hide].join(" ")} id={showLinks ? styles.hidden:""}>
                <Link className={styles.Link} to="/Home">Home</Link>
                <Link className={styles.Link} to="/Home/SongsPage">Songs</Link>
                <Link className={styles.Link} to="/Home/favourites">Favourites</Link>
              
        </div>
        <button className={styles.visible} onClick={()=>setShowLinks(!showLinks)}><Menu/></button>
        </div>
        <div className={styles.rightSide}>
        <input type="text" placeholder='search...' name="searchdata" onChange={handleSearch} value={props.searchWord}></input>
        <button>{props.searchWord.length>0?<Close onClick={clearSearchdata}/>:<Search/>}</button>
        <button className={styles.whitetext} onClick={handleLogout}>Logout</button>
        </div>
    </div>
    </div>
  );
}

export default Navbar;