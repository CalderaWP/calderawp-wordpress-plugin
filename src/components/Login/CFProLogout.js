import React from 'react';
import {Button} from '@wordpress/components';

export const CFProLogout = ({onLogout}) => {
	return (<Button
		onClick={
			(event) => {
				event.preventDefault();
				onLogout();
			}
		}
	>Logout
	</Button>);
};