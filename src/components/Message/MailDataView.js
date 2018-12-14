import React from "react";
function createMarkup(message) {
	return {__html: message};
}

function MyComponent() {
	return <div dangerouslySetInnerHTML={createMarkup()} />;
}

export const MailDataView = ({mailData}) => (

	<div className={'wp-block-columns has-2-columns'}>
		<div className={'wp-block-column'}>
			<h3>Headers</h3>
			<ul>
				{Object.keys(mailData).map(key => {
					if (mailData.hasOwnProperty(key) && ![
						'message',
						'headers',
						'attachments'
					].includes(key)) {
						const datum = mailData[key];
						let display = datum;
						if( 'html' === key ){
							display = datum ? 'HTML' : 'Plain text';
						}
						if (datum) {
							return (<li key={key}><span>{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {display}</li>);
						}
					}

				})}
			</ul>
		</div>
		<div className={'wp-block-column'}>
			<h3>Message</h3>
			<div dangerouslySetInnerHTML={createMarkup(mailData.message)} />
		</div>
	</div>


)
