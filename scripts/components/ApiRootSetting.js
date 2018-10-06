import { TextControl } from '@wordpress/components';
export const ApiRootSetting = props => (
	<TextControl
		label="Set Product API Root Url"
		value={ props.value }
		onChange={ props.onChange}
	/>

)


