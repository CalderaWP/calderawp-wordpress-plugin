import React, {Fragment} from  'react';
import ReactModal from 'react-modal';

//ReactModal.setAppElement('#app');

export const EntryActions = (props) => {
	const {
		formId,
		entryId,
		onView,
		onDownload,
		onResend
	} = props;
	return(
		<Fragment>
			<button
				onClick={onView}
			>
				View
			</button>
			<button
				onClick={onDownload}
			>
				Download
			</button>
			<button
				onClick={onResend}
			>
				Resend
			</button>

		</Fragment>
	)
}