// @flow

import React from 'react';

import {FakeGutenbergEditorWrap,FakeGutenbergPostTitle} from "./FakeGutenberg";
// Gutenberg JS Style
import '@frontkom/gutenberg-js/build/css/block-library/style.css';
import '@frontkom/gutenberg-js/build/css/components/style.css';
import '@frontkom/gutenberg-js/build/css/nux/style.css';
import '@frontkom/gutenberg-js/build/css/editor/style.css';
import '@frontkom/gutenberg-js/build/css/block-library/theme.css';
import '@frontkom/gutenberg-js/build/css/block-library/edit-blocks.css';
import '@frontkom/gutenberg-js/build/css/style.css';


import EntryBlocks from './EntryBlocks';
type Props = {

}

type State = {
}





class App extends React.Component<Props,State> {



	render () {

	return (

			<FakeGutenbergEditorWrap>
				<FakeGutenbergPostTitle title={'Caldera WordPress Plugin'}/>
				<EntryBlocks/>
			</FakeGutenbergEditorWrap>
		)

	}
}

export default App;
