import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Player()
{
    const auth_token='Bearer BQBn4rTHrendJxPfPdwPLBUnHFvAOKbHPLVzUT9rvOy-h67FZYPxawGTcWmtZNtyY5XOFHZUGqrOY7-ySbmJ8dJM2uuoB0E2yJPtt5Fy_qiZDeKwfNXgC1lGtrgBqVCJeZXbiWJLl5uT6v263161HDxnK3eEDbnuAYdH5itGomJIcJ5blg'
    const[Query, setInput]= useState('');
    const [artists, setArtists]= useState([]);
    const [tracks, setTracks]= useState([]);
    const [albums, setAlbums]= useState([]);

    function handleForm(e){
        e.preventDefault();
        fetchItems();
    }

   function fetchItems() {
        let fetch_url=`https://api.spotify.com/v1/search?q=${Query}&type=artist,album,track&limit=5`;
        fetch(fetch_url,{
         headers: {
           'Content-Type' :'application/json',
           'Authorization': auth_token,
           },
         mode: 'cors',
         cache:'default'
       })
       .then (res => res.json())
       .then(data => {
           console.log(data);
           setArtists(data.artists.items);
           setTracks(data.tracks.items);
           setAlbums(data.albums.items);
       })
    }

    return(
    <div className="row">
        <div className="col-lg-3 margin">
            <img src="https://www.stickpng.com/assets/images/59b5bb466dbe923c39853e00.png" id="spotifyLogo"></img>
            <div className="marginElement">
                <img src="https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png" className="icon"></img>
                <span className="marginText">Vanshay Gupta</span>
            </div>
            <div className="marginElement">
                <img src="https://www.stickpng.com/assets/images/588a6758d06f6719692a2d22.png" id="home" className="icon"></img>
                <span className="marginText">Home</span>
            </div>
            <div className="marginElement">
                <img src="https://cdn1.iconfinder.com/data/icons/communication-vol-3/48/115-512.png" id="library" className="icon"></img>
                <span className="marginText">Library</span>
            </div>
        </div>
        <div className="col-lg-9">
        <a href="http://localhost:8888"><h3 className="login">Login with Spotify</h3></a> 
        <form onSubmit={handleForm}>
            <input id="searchBar" className="form-control" type="text" placeholder="Search for any track, album or artist" value ={Query} onChange={e => setInput(e.target.value)}/>
            <button className="btn btn-outline-success">Search</button>
        </form> 

        <h1 className="heading">Artists</h1>
        <div className="grid-container">
            {artists.map((artist, index)=> (
                <div key={index}>
                    <a href={artist.external_urls.spotify} target="_blank"><h2>{artist.name}</h2></a>
                </div>
            ))}
        </div>
        <h1 className="heading">Tracks</h1>
        <div className="grid-container">
            {tracks.map((track, index)=> (
                <div key={index} className="element">
                    <a className="playTrack" href={track.external_urls.spotify} target="_blank"><img src={track.album.images[0].url}/><h2>{track.name}</h2></a>
                </div>
            ))}
        </div>
        <h1 className="heading">Albums</h1>
        <div className="grid-container">
            {albums.map((album, index)=> (
                <div key={index} className="element">
                    <a href={album.external_urls.spotify} target="_blank"><img src={album.images[0].url}/><h2>{album.name}</h2></a>
                </div>
            ))}
        </div>
        </div>
        
    </div>
    )
}
export default Player;
