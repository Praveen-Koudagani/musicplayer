import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import { ProtectedRoute } from './components/protected.route';
import Register from './components/register/Register';
import {SongsPage} from './components/home/SongsPage';
import Favourites from './components/home/Favourites';

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route exact path="/" element={<Register/>} />
          <Route exact path="/Login" element={<Login/>} />
          <Route exact path="/Home" element={<ProtectedRoute><Home/></ProtectedRoute>} >
             <Route exact path="SongsPage" element={<SongsPage/>}/>
             <Route exact path="Favourites" element={<Favourites/>}/>
          </Route>
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
