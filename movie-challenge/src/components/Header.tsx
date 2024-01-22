import React from 'react';
import './Header.css';

interface HeaderProps {
  onSearch: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => (
  <nav>
    <form className='search-container'>
      <input type="text" onChange={(e) => onSearch(e.target.value)} />
    </form>
  </nav>
);

export default Header;
