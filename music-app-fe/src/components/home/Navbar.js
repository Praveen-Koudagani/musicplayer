import { Menu, Search } from '@mui/icons-material';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import auth from '../auth';
import styles from './navbar.module.css';

const Navbar = () => {
    const [showLinks,setShowLinks]=useState(false);
    const navigate=useNavigate();
 const handleLogout=()=>{
localStorage.clear();
auth.logout();
navigate("/Login");
  }
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
        <input type="text" placeholder='search...' name="searchdata"></input>
        <button o><Search/></button>
        <button className={styles.whitetext} onClick={handleLogout}>Logout</button>
        </div>
    </div>
    </div>
  );
}

export default Navbar;