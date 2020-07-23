import React from 'react';
import ReactDOM from 'react-dom';
import { Client } from 'spotify-sdk';

import './index.css';
import App from './App';

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
let button = (
	<button id="login" onClick={login}>
		Login
	</button>
);

function session() {
	if (sessionStorage.token) {
		client.token = sessionStorage.token;
		console.log(client.token);
		button = <p>Logged in</p>;
	} else if (window.location.hash.split('&')[0].split('=')[1]) {
		sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
		client.token = sessionStorage.token;
		button = <p>Logged in</p>;
		console.log(client.token);
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
		<App token={client.token} />
		{button}
	</React.StrictMode>,
	document.getElementById('root')
);
