import React, { useState, useImperativeHandle, forwardRef } from 'react';

const App = forwardRef((props, ref) => {
	const [ playlist, setplaylist ] = useState({});
	useImperativeHandle(ref, () => {
		return {
			setplaylist : setplaylist
		};
	});
	let playlists = [];
	let renderItems = [];
	for (let i = 0; i < playlist.length; i++) {
		let item = {
			name     : playlist[i]._name,
			href     : playlist[i]._href,
			id       : playlist[i]._id,
			uri      : playlist[i]._uri,
			albumArt : playlist[i]._images[0]
		};
		renderItems.push(
			<div key={playlist[i]._id}>
				<h5>{playlist[i]._name}</h5>
				<button>Play</button>
				<img src={playlist[i]._images[0].url} alt="albumart" width="100" />
			</div>
		);
		playlists.push(item);
	}
	return <div>{renderItems}</div>;
});

export default App;
