// @flow

import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as cfApi from '@caldera-labs/api-client';

import {FakeGutenbergEditorWrap,FakeGutenbergPostTitle} from "./FakeGutenberg";
// Gutenberg JS Style
import '@frontkom/gutenberg-js/build/css/block-library/style.css';
import '@frontkom/gutenberg-js/build/css/components/style.css';
import '@frontkom/gutenberg-js/build/css/nux/style.css';
import '@frontkom/gutenberg-js/build/css/editor/style.css';
import '@frontkom/gutenberg-js/build/css/block-library/theme.css';
import '@frontkom/gutenberg-js/build/css/block-library/edit-blocks.css';
import '@frontkom/gutenberg-js/build/css/style.css';


import Entries from './Entries';
type Props = {

}

type State = {
}

const API_URL = 'http://localhost:8218/wp-json/cf-api/v2';
const NONCE = false;

const formsAdminApiClient = new cfApi.WpClient(API_URL );
formsAdminApiClient.setCorsMode(true);
const entryApiClient =  new cfApi.EntriesClient(API_URL );
entryApiClient.setCorsMode(true);

function getForms(page:number) : Promise<any>{
	return formsAdminApiClient.makeRequest( 'forms', {full:true,page});
}

function getEntries(formId:string,page:number) : Promise<any>{
	return entryApiClient.makeRequest( `entries/${formId}`, {page});
}

function getEntry( formId:string,entryId:number): Promise<any>{
	return entryApiClient.makeRequest( `entries/${formId}/${entryId}`);
}



const Index = () => <h2>Home</h2>;

class App extends React.Component<Props,State> {



	render () {

	return (

		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/entries/">Entries</Link>
						</li>

					</ul>
				</nav>
				<FakeGutenbergEditorWrap>
					<FakeGutenbergPostTitle title={'Caldera WordPress Plugin'}/>
					<Entries
						getEntries={getEntries}
						getEntry={getEntry}
						getForms={getForms}

					/>

				</FakeGutenbergEditorWrap>
			</div>
		</Router>


		)

	}
}

export default App;
