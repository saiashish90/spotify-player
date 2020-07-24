import React from 'react';
import App from './App';
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
			volume        : 0.5
		});
		player.connect().then((success) => {
			if (success) {
				console.log('The Web Playback SDK successfully connected to Spotify!');
			}
		});

		function prevTrack() {
			player.previousTrack().then(() => {
				console.log('Set to previous track!');
			});
			player.getCurrentState().then((state) => {
				if (!state) {
					console.error('User is not playing music through the Web Playback SDK');
					return;
				}
				let previous_track = state.track_window.previous_tracks[1].name;
				console.log('Playing Next', previous_track);
				document.getElementById('track').innerHTML = previous_track;
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
			player.getCurrentState().then((state) => {
				if (!state) {
					console.error('User is not playing music through the Web Playback SDK');
					return;
				}

				let next_track = state.track_window.next_tracks[0].name;
				console.log('Playing Next', next_track);
				document.getElementById('track').innerHTML = next_track;
			});
		}
		document.querySelector('#prevTrack').onclick = prevTrack;
		document.querySelector('#playPause').onclick = playPause;
		document.querySelector('#nextTrack').onclick = nextTrack;
	};

	return (
		<div>
			<App ref={playerElement} />
			<h3 id="track">NO SONG</h3>
			<button id="prevTrack">Prev</button>
			<button id="playPause">Play/Pause</button>
			<button id="nextTrack">Next</button>
		</div>
	);
}
export default Webplayer;
