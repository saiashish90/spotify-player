import React from 'react';

var Spotify = require('spotify-web-api-js');

function App(props) {
	var spotifyAPI = new Spotify();
	spotifyAPI.setAccessToken(props.token);
	function getSong() {
		spotifyAPI.getMyCurrentPlayingTrack().then(
			function(data) {
				console.log(data);
				if (data) {
					document.getElementById('playing').innerHTML = data.item.name;
				} else {
					document.getElementById('playing').innerHTML = 'No song';
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
		</div>
	);
}

export default App;
