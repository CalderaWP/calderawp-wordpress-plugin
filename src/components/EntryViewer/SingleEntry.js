import React, {Component, Fragment} from 'react';
import ReactModal from "react-modal";
import {EntryRow} from "./EntryRow";


export class SingleEntry extends Component {



	render() {

		const {
			entry
		} = this.props;
		return (
			<Fragment>
				<EntryRow
					entry={entry}
				/>

			</Fragment>
		)
	}
}

