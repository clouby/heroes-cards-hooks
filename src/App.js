import React, { useEffect, useState, lazy, Suspense } from 'react';

import client from './api';

import './App.css';
import 'emerald-ui/lib/styles.css';

import Panel from 'emerald-ui/lib/Panel';

const Card = lazy(() => import('./components/Card'));

const SUPER_HERO = 'batman';

function App() {
	const [ movies, setMovies ] = useState([]);

	useEffect(() => {
		const fetchTest = async () => {
			const { results } = await client.fetchMovie('/search/movie', { query: SUPER_HERO });
			setMovies(results);
			console.log({ results });
		};

		fetchTest();
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<Panel>
					<Panel.Body>
						<h1 style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>Batman </h1>
						<p>All movies, all the time.</p>
					</Panel.Body>
				</Panel>
				<div className="wrapper">
					<Suspense fallback={<div>loading</div>}>
						{movies.map((movie, index) => <Card movie={movie} key={index} />)}
					</Suspense>
				</div>
			</header>
		</div>
	);
}

export default App;
