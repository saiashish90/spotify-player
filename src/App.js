import React, { useState } from 'react';

var Spotify = require('spotify-web-api-js');

function App(props) {
	var spotifyAPI = new Spotify();
	spotifyAPI.setAccessToken(props.token);
	function pausePlayTrack() {
		console.log(document.getElementById('isPlaying').innerHTML);
		if (document.getElementById('isPlaying').innerHTML === 'Pause') {
			spotifyAPI.pause();
			document.getElementById('isPlaying').innerHTML = 'Play';
		} else if (document.getElementById('isPlaying').innerHTML === 'Play') {
			spotifyAPI.play();
			document.getElementById('isPlaying').innerHTML = 'Pause';
		}
	}
	function getSong() {
		spotifyAPI.getMyCurrentPlayingTrack().then(
			function(data) {
				console.log(data);
				if (data) {
					document.getElementById('playing').innerHTML = data.item.name;
					document.getElementById('isPlaying').innerHTML =
						data.is_playing ? 'Pause' :
						'Play';
					document.getElementById('isPlaying').style.display = 'block';
				} else {
					document.getElementById('playing').innerHTML = 'No song';
					document.getElementById('isPlaying').style.display = 'none';
				}
			},
			function(err) {
				console.error(err);
			}
		);

		setTimeout(getSong, 5000);
	}

	getSong();

	return (
		<div>
			<h1 id="playing">Fetching</h1>
			<button style={{ display: 'none' }} id="isPlaying" onClick={pausePlayTrack} />
		</div>
	);
}

export default App;
