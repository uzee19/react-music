import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";

const Nav = ({ setLibraryStatus, LibraryStatus }) => {
    const openLibraryHandler = () => {
      setLibraryStatus(!LibraryStatus);
    };
  
    return (
      <nav> 
        <h1>OST</h1> 
        <button
          className={LibraryStatus ? "library-active" : ""}
          onClick={openLibraryHandler}
        >
          Library
          <FontAwesomeIcon icon={faMusic}/>
        </button>
      </nav>
    );
  };

export default Nav;