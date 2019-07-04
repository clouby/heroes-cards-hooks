import React, { useState } from 'react';
import { usePalette } from 'react-palette';

import AppCard from 'emerald-ui/lib/AppCard';

import './Card.css';

function useLoadingImage(defaultStatus = true) {
	const [ loading, setLoading ] = useState(defaultStatus);

	const onLoad = (e) => void setLoading(false);

	const onError = (e) => void setLoading(true);

	return {
		onLoad,
		onError,
		loading
	};
}

function CardMovie({ movie }) {
	const img = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

	const { data } = usePalette(img);

	const { loading, ...handleImage } = useLoadingImage(true);

	return (
		<AppCard
			color={data.lightVibrant || 'transparent'}
			caption={movie.original_title}
			inactive={loading}
			image={img}
			style={{ marginBottom: 10, marginTop: 10, marginLeft: 30 }}
			className={loading ? 'loading' : ''}
			{...handleImage}
		/>
	);
}

export default CardMovie;
