import React from 'react';

export const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientId = 'fd7a287cc4fa479490cd3ee3ccbfb96d';
const redirectUri = 'http://localhost:3000';
const scopes = [
	'user-read-currently-playing',
	'user-read-playback-state',
	'playlist-read-private',
	'playlist-read-collaborative'
];

const hash = window.location.hash.substring(1).split('&').reduce(function(initial, item) {
	if (item) {
		var parts = item.split('=');
		initial[parts[0]] = decodeURIComponent(parts[1]);
	}
	return initial;
}, {});
console.log(hash.access_token);
window.location.hash = '';
var Spotify = require('spotify-web-api-js');
var s = new Spotify();
s.setAccessToken(hash.access_token);

s
	.getUserPlaylists({
		limit  : 5,
		offset : 0
	})
	.then(
		function(data) {
			console.log('User playlists', data);
		},
		function(err) {
			console.error(err);
		}
	);

function App() {
	return (
		<div>
			<a
				className="btn btn--loginApp-link"
				href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
					'%20'
				)}&response_type=token`}
			>
				Login to Spotify
			</a>
		</div>
	);
}

export default App;
