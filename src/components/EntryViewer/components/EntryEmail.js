import Iframe from 'react-iframe'
import React, {	Fragment} from 'react';
import {entryViewUrl} from "./entryViewUrl";


export const EntryEmail = (props) => {
	const {
		formId,
		entryId,
	} = props;

	return(
		<Fragment>
			<Iframe url={entryViewUrl(entryId,formId)}
					width="90%"
					height="100%"
					id="myId"
					className="myClassname"
					display="initial"
					position="relative"
					allowFullScreen
			/>

		</Fragment>
	)
}