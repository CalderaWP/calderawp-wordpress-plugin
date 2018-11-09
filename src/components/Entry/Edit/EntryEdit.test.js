import renderer from 'react-test-renderer';
import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

describe( 'Controls component', ()  => {
	it( '',() => expect(1).toBe(1) );
});

describe( 'Inline component', ()  => {
	it( '',() => expect(1).toBe(1) );

});


describe( 'After editor', ()  => {
	it( '',() => expect(1).toBe(1) );

});

describe( 'Before editor', ()  => {
	it( '',() => expect(1).toBe(1) );
});