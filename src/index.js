import React from 'react';
import ReactDOM from 'react-dom';
import { Client, UserHandler } from 'spotify-sdk';

import './index.css';
import Webplayer from './Webplayer';

const scopes = [
	'streaming',
	'user-read-currently-playing',
	'user-read-playback-state',
	'playlist-read-private',
	'playlist-read-collaborative',
	'user-read-currently-playing',
	'user-modify-playback-state'
];

const clientId = 'fd7a287cc4fa479490cd3ee3ccbfb96d';
const redirectUri = 'http://localhost:3000';

let client = Client.instance;

let button = (
	<button id="login" onClick={login}>
		Login
	</button>
);

function session() {
	if (sessionStorage.token) {
		button = <p>Logged in</p>;
	} else if (window.location.hash.split('&')[0].split('=')[1]) {
		sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
		window.history.replaceState('/', 'Spotify', '/');
		button = <p>Logged in</p>;
	}
}
session();
function login() {
	let url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
		'%20'
	)}&response_type=token&show_dialog=true`;
	window.location.href = url;
}

var user = new UserHandler();

ReactDOM.render(
	<React.StrictMode>
		<Webplayer user={user} />
		{button}
	</React.StrictMode>,
	document.getElementById('root')
);
