import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

export default function Header() {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header-container'>
          <Link to='/' className='header-logo'>
            <h2>GreenBook</h2>
          </Link>
          <div className='header-search'>
            <div className='header-icon'>
              <ion-icon name='search-outline'></ion-icon>
            </div>
            <input className='header-input' type='text' placeholder='Tìm truyện...' />
          </div>
        </div>
      </div>
    </header>
  );
}
