import React from 'react';
import profilePicture from "./profilePicture.png";

export default function ProfilePicture() {
    return (
        <header className="profilePictureHeader">
            <img src={profilePicture} className="App-profilePicture" alt="profilePicture" />
        </header>
)}