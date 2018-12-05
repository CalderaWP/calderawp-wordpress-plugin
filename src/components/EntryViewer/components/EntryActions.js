import React, {Fragment} from  'react';
export const EntryActions = (props) => {
	const {
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