import Iframe from 'react-iframe'
import React, {	Fragment} from 'react';


export const EntryEmail = (props) => {
	const {
		formId,
		entryId,
	} = props;
	const iFrameUrl = `http://localhost:8218/Layout/162?entryId=${entryId}&formId=${formId}`
	return(
		<Fragment>
			<Iframe url={iFrameUrl}
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