import React from 'react';
import App from './App';
var SpotifyWebApi = require('spotify-web-api-js');
var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(sessionStorage.token);

function Webplayer(props) {
	let playerElement = React.createRef();
	props.user.me().then((userEntity) => {
		console.log(userEntity);
		props.user.playlists(userEntity._id).then((playlistCollection) => {
			console.log('playlist api request');
			playerElement.current.setplaylist(playlistCollection);
		});
	});
	window.onSpotifyWebPlaybackSDKReady = () => {
		var player = new window.Spotify.Player({
			name          : 'Laptop',
			getOAuthToken : (callback) => {
				callback(sessionStorage.token);
			},
			volume        : 1
		});

		// COnnect and print device id
		player.connect().then((success) => {
			if (success) {
				console.log('The Web Playback SDK successfully connected to Spotify!');
			}
		});
		player.addListener('ready', ({ device_id }) => {
			console.log('Connected with Device ID', device_id);
		});

		// Listen to change in songs
		try {
			player.addListener('player_state_changed', ({ position, duration, track_window: { current_track } }) => {
				document.getElementById('track').innerHTML = current_track.name;
				console.log('Position in Song', position);
				console.log('Duration of Song', duration);
			});
		} catch (e) {
			console.log('cant get nme');
		}

		// Change track functions
		function prevTrack() {
			player.previousTrack().then(() => {
				console.log('Set to previous track!');
			});
		}
		function playPause() {
			player.togglePlay().then(() => {
				console.log('Toggled playback!');
			});
		}
		function nextTrack() {
			player.nextTrack().then(() => {
				console.log('Skipped to next track!');
			});
		}

		function playURI(linkToSong) {
			spotifyApi.transferMyPlayback([ '43947e023a721d4e1cebe2578df782cd4d8d5301' ]);
			spotifyApi.play({
				context_uri : linkToSong,
				offset      : {
					position : 5
				},
				position_ms : 0
			});
		}

		document.querySelector('#prevTrack').onclick = prevTrack;
		document.querySelector('#playPause').onclick = playPause;
		document.querySelector('#nextTrack').onclick = nextTrack;
		document.querySelector('#playTrack').onclick = () => playURI('spotify:playlist:6dkVKLZ20LN3zfaxRv7Efx');
	};

	return (
		<div>
			<App ref={playerElement} />
			<h3 id="track">NO SONG</h3>
			<button id="prevTrack">Prev</button>
			<button id="playPause">Play/Pause</button>
			<button id="nextTrack">Next</button>
			<button id="playTrack">URI</button>
		</div>
	);
}
export default Webplayer;
