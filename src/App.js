import React, { useState } from 'react';
import { Client, TrackHandler, PlaylistHandler } from 'spotify-sdk';

var Spotify = require('spotify-web-api-js');

let client = Client.instance;

client.settings = {
	clientId     : 'fd7a287cc4fa479490cd3ee3ccbfb96d',
	secretId     : 'fd7a287cc4fa479490cd3ee3ccbfb96d',
	scopes       : [
		'user-read-currently-playing',
		'user-read-playback-state',
		'playlist-read-private',
		'playlist-read-collaborative',
		'user-read-currently-playing'
	],
	redirect_uri : 'http://localhost:3000'
};

/*
 * Login user
 * This is a way, you can do it however you want
 */
function session() {
	if (sessionStorage.token) {
		client.token = sessionStorage.token;
	} else if (window.location.hash.split('&')[0].split('=')[1]) {
		sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
		client.token = sessionStorage.token;
	}
}
session();
function login() {
	client.login().then((url) => {
		window.location.href = url;
	});
}

var spotifyAPI = new Spotify();
spotifyAPI.setAccessToken(client.token);

function App() {
	const [ playing, setPlaying ] = useState('Fetching');

	spotifyAPI.getMyCurrentPlayingTrack().then(
		function(data) {
			console.log(data);
			if (data) {
				setPlaying(data.item.name);
			} else {
				setPlaying('No song');
			}
		},
		function(err) {
			console.error(err);
		}
	);

	return (
		<div>
			<h1 id="playing">{playing} </h1>
			<button onClick={login}>Login</button>
		</div>
	);
}

export default App;
