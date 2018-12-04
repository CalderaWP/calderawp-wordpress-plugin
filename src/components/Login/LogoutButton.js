import React from 'react';
import {Button} from '@wordpress/components';

export const LogoutButton = ({onLogout}) => {
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