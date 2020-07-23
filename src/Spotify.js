import React from 'react';
import App from './App';

var Spotify = require('spotify-web-api-js');

function SpotifyController(props) {
	console.log(props.token);
	var spotifyAPI = new Spotify();

	let playerElement = React.createRef();

	spotifyAPI.setAccessToken(props.token);

	function playPauseTrack() {
		let isPlaying = playerElement.current.isPlaying;


			isPlaying ? spotifyAPI.pause() :
			spotifyAPI.play();
		playerElement.current.setisPlaying(!playerElement.current.isPlaying);
	}
	function getSongTimer() {
		spotifyAPI.getMyCurrentPlayingTrack().then(
			function(data) {
				console.log(data);
				if (data) {

						data.is_playing ? playerElement.current.setisPlaying(true) :
						playerElement.current.setisPlaying(false);
					playerElement.current.setplaying(data.item.name);

					console.log(data.item.name);
				} else {
					playerElement.current.setisPlaying(false);
					playerElement.current.setplaying('No song is playing');
				}
			},
			function(err) {
				console.error(err);
			}
		);

		setTimeout(getSongTimer, 5000);
	}
	function updateSong() {
		spotifyAPI.getMyCurrentPlayingTrack().then(
			function(data) {
				console.log(data);
				if (data) {

						data.is_playing ? playerElement.current.setisPlaying(true) :
						playerElement.current.setisPlaying(false);
					playerElement.current.setplaying(data.item.name);

					console.log(data.item.name);
				} else {
					playerElement.current.setisPlaying(false);
					playerElement.current.setplaying('No song is playing');
				}
			},
			function(err) {
				console.error(err);
			}
		);
	}

	getSongTimer();
	return <App ref={playerElement} updateSong={updateSong} />;
}
export default SpotifyController;
