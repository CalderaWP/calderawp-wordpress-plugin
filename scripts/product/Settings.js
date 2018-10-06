import React from 'react';
import {ApiRootSetting} from "../components/ApiRootSetting";
import {ProductChooserWithSelect} from "../components/ProductChooser";


export  const Settings = (props) => {
	return(
		<React.Fragment>
			<ApiRootSetting
				value={props.apiRoot}
				onChange={props.onChangeApiRoot}
			/>
			{props.apiRoot &&
				<ProductChooserWithSelect
					value={props.product}
					onChange={props.onChangeProduct}
				/>

			}


		</React.Fragment>

	)
}