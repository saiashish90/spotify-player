import React, { useState, useImperativeHandle, forwardRef } from 'react';

const App = forwardRef((props, ref) => {
	const [ playing, setplaying ] = useState('No song is playing');
	const [ isPlaying, setisPlaying ] = useState(false);

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
		</div>
	);
});

export default App;
