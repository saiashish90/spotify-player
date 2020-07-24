import React, { useState, useImperativeHandle, forwardRef } from 'react';
var SpotifyWebApi = require('spotify-web-api-js');
var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(sessionStorage.token);

const App = forwardRef((props, ref) => {
	const [ playlist, setplaylist ] = useState({});
	const [ deviceID, setDeviceID ] = useState(0);

	function playURI(linkToSong) {
		spotifyApi.setAccessToken(sessionStorage.token);
		spotifyApi.play({
			device_id   : deviceID,
			context_uri : linkToSong,
			offset      : {
				position : 5
			},
			position_ms : 0
		});
	}
	function shuffle(state) {
		spotifyApi.setAccessToken(sessionStorage.token);
		spotifyApi.setShuffle(!state);
	}

	useImperativeHandle(ref, () => {
		return {
			setplaylist : setplaylist,
			setDeviceID : setDeviceID,
			shuffle     : shuffle
		};
	});
	let renderItems = [];
	for (let i = 0; i < playlist.length; i++) {
		// name     : playlist[i]._name,
		// href     : playlist[i]._href,
		// id       : playlist[i]._id,
		// uri      : playlist[i]._uri,
		// albumArt : playlist[i]._images[0]
		renderItems.push(
			<div key={playlist[i]._id}>
				<h5>{playlist[i]._name}</h5>
				<button onClick={() => playURI(playlist[i]._uri)}>Play</button>
				<img src={playlist[i]._images[0].url} alt="albumart" width="50" />
			</div>
		);
	}
	return <div>{renderItems}</div>;
});

export default App;
