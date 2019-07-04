import React, { Fragment, useState, useEffect } from 'react';

function useIntervalContent(arr = [], initial = 0, ms = 1000) {
	const [ counter, setCounter ] = useState(initial);
	const [ current, setCurrent ] = useState(arr[initial]);
	const [ intervaldId, setIntervalId ] = useState(null);

	useEffect(() => {
		const intervalIdAux = window.setInterval(() => {
			const nextCounter = counter + 1;

			const nextIndex = nextCounter % arr.length;

			setCounter(nextCounter);
			setCurrent(arr[nextIndex]);
		}, ms);

		setIntervalId(intervalIdAux);
	}, []);

	useEffect(
		() => {
			const joinSkills = [ ...current.skills ].join(', ');

			window.alert(`Hero: ${current.name}. Skills: ${joinSkills}`);
		},
		[ current ]
	);

	useEffect(() => {
		return () => {
			intervaldId && window.clearInterval(intervaldId);
		};
	});

	return current;
}

function Heroes({ heroes }) {
	const { name, skills } = useIntervalContent(heroes, 1, 2000);

	return (
		<Fragment>
			<h1 className="hero__header">{name}</h1>
			<span>{skills}</span>
		</Fragment>
	);
}

function Villains({ villains }) {
	const { name, skills } = useIntervalContent(villains, 0, 3000);

	return (
		<Fragment>
			<h2 className="villains__header">{name}</h2>
			<p>{skills}</p>
		</Fragment>
	);
}
