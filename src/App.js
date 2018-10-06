// @flow

import React from 'react';
import {
	HelloEdit,
	HelloDisplay
}  from './components/Hello';
type Props = {
	name: string,
	salutation: string
}

type State = {
	...Props
}


class App extends React.Component<Props,State> {


	constructor(props:Props){
		super(props);
		this.state = {
			...props,
			salutation: props.salutation ? props.salutation : 'Hi'
		}
	}

	setName = (name:string) => {
		this.setState({name})
	};

	setSalutation = (salutation:string) => {
		this.setState({salutation})
	};

	render() {
		const {
			name,
			salutation
		} = this.state;
		return (
			<div>
				<HelloDisplay
					name={name}
					salutation={salutation}
				/>
				<HelloEdit
					name={name}
					salutation={salutation}
					salutationControlLabel={'Salutation'}
					onChangeSalutation={this.setSalutation}
					nameControlLabel={'Name'}
					onChangeName={this.setName}
				/>
			</div>
		)
	}
}

export default App;