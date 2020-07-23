import React from 'react';
import ReactDOM from 'react-dom';
import { Client } from 'spotify-sdk';

import './index.css';
import SpotifyController from './Spotify';
import Webplayer from './Webplayer';

let client = Client.instance;

client.settings = {
	clientId     : 'fd7a287cc4fa479490cd3ee3ccbfb96d',
	secretId     : 'fd7a287cc4fa479490cd3ee3ccbfb96d',
	scopes       : [
		'streaming',
		'user-read-currently-playing',
		'user-read-playback-state',
		'playlist-read-private',
		'playlist-read-collaborative',
		'user-read-currently-playing',
		'user-modify-playback-state'
	],
	redirect_uri : 'http://localhost:3000'
};
let button = (
	<button id="login" onClick={login}>
		Login
	</button>
);

function session() {
	if (sessionStorage.token) {
		client.token = sessionStorage.token;
		button = <p>Logged in</p>;
	} else if (window.location.hash.split('&')[0].split('=')[1]) {
		console.log(window.location.hash);
		sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
		client.token = sessionStorage.token;
		button = <p>Logged in</p>;
	}
}
session();
function login() {
	client.login().then((url) => {
		window.location.href = url;
	});
}
ReactDOM.render(
	<React.StrictMode>
		<Webplayer />
		<SpotifyController token={client.token} />
		{button}
	</React.StrictMode>,
	document.getElementById('root')
);
