import React, { Fragment } from 'react';

class SuperHeroes extends React.PureComponent {
	state = {
		heroes: [
			{
				name: 'All Might',
				skills: [ 'Texas Smash', 'Detroit Smamsh', 'Plus Ultra' ]
			},
			{
				name: 'Mt. Lady',
				skills: [ 'Gigantificación', 'Canyon Cannon', 'Titan Cliff' ]
			}
		],
		counter: 0,
		current: null,
		intervalId: null
	};

	componentDidMount() {
		const intervalId = window.setInterval(() => {
			const { counter, heroes } = this.state;

			const nextCounter = counter + 1;

			const nextIndex = nextCounter % heroes.length;

			this.setState({
				counter: nextCounter,
				current: heroes[nextIndex]
			});
		}, 1000);

		this.setState({ intervalId });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.current.name !== this.state.current.name) {
			const { current } = this.state;

			const joinSkills = [ ...current.skills ].join(', ');

			window.alert(`Hero: ${current.name}. Skills: ${joinSkills}`);
		}
	}

	componentWillUnmount() {
		this.state.intervalId && window.clearInterval(this.state.intervalId);
	}

	render() {
		const { name, skills } = this.state;
		return (
			<Fragment>
				<h1>{name}</h1>
				<span>{skills}</span>
			</Fragment>
		);
	}
}

function FetchingComp(Component) {
	return class extends React.Component {
		state = {
			// Roles Fetching
			admin: fetch('/admin/access'),
			readOnly: fetch('/read/books')
		};

		render() {
			const { role, ...rest } = this.props;

			const fetch = this.state[role];

			return <Component {...rest} fetch={fetch} />;
		}
	};
}
