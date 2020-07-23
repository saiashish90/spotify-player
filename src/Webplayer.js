function Webplayer() {
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
	};
	return null;
}
export default Webplayer;
