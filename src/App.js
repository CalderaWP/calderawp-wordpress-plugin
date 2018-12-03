//import { BrowserRouter as Router, Link } from "react-router-dom";
import React from 'react';
import Entries from "./Pages/Entries";
import "./app.css";



class App extends React.Component {


	render() {
		const {
			getForms,
			getEntries,

		} = this.props;

		return (
			<div>
				<Entries getForms={getForms} getEntries={getEntries}/>
			</div>
		)

	}
}

export default App;
