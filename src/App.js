import React, { useState, useImperativeHandle, forwardRef } from 'react';

const App = forwardRef((props, ref) => {
	const [ playing, setplaying ] = useState('No song is playing');
	const [ isPlaying, setisPlaying ] = useState(false);
	let button =
		isPlaying ? <button onClick={props.playPauseTrack}>Pause</button> :
		<button onClick={props.playPauseTrack}>Play</button>;
	useImperativeHandle(ref, () => {
		return {
			setplaying   : setplaying,
			setisPlaying : setisPlaying,
			isPlaying    : isPlaying
		};
	});
	return (
		<div>
			<h4>{playing}</h4>
			<button onClick={props.previousTrack}>Prev</button>
			{button}
			<button onClick={props.nextTrack}>Next</button>
		</div>
	);
});

export default App;
