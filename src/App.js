import React, { useState, useImperativeHandle, forwardRef } from 'react';

const App = forwardRef((props, ref) => {
	const [ playlist, setplaylist ] = useState({});
	useImperativeHandle(ref, () => {
		return {
			setplaylist : setplaylist
		};
	});
	let playlists = [];
	for (let i = 0; i < playlist.length; i++) {
		let item = {
			name     : playlist[i]._name,
			href     : playlist[i]._href,
			id       : playlist[i]._id,
			uri      : playlist[i]._uri,
			albumArt : playlist[i]._images[0]
		};
		playlists.push(item);
	}
	console.log(playlists);

	return (
		<div>
			<h4>helo</h4>
		</div>
	);
});

export default App;
