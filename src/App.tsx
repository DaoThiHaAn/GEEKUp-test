import './App.css'
import geekupLogo from './assets/geekup-logo-general.svg';
import User from './user/user.tsx'
import Album from './album/album.tsx';
import AlbumDetails from './album/album_detail.tsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); // Get the current URL

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <>
      <nav>
        <Link to='/albums'>
          <img src={geekupLogo} alt="GEEK Up logo" />
        </Link>
      </nav>
      <main>
        <aside className={isCollapsed ? 'collapsed' : ''}>
          <Link to='/albums' className={`tab-btn ${location.pathname === '/albums' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faRectangleList} className='tab-icon' />
            {!isCollapsed && <p>Albums</p>}
          </Link>

          <Link to='/users' className={`tab-btn ${location.pathname === '/users' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faAddressCard} className='tab-icon' />
            {!isCollapsed && <p>Users</p>}
          </Link>

          <button className="toggle-tab-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} className='tab-icon' />
          </button>
        </aside>

        <section className='content'>
          <Routes>
            <Route path='/' element={<Album />} />
            <Route path='/users' element={<User />} />
            <Route path='/albums' element={<Album />} />
            <Route path="/albums/:id" element={<AlbumDetails />} /> {/* id is dynamically changed */}
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
