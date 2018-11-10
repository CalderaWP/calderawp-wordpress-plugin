import {CALDERA_FORMS_ENTRIES_SLUG,entryStoreFactory} from  './entryStore';
import {dispatch,select} from  '@wordpress/data';
const entryStore = entryStoreFactory(CALDERA_FORMS_ENTRIES_SLUG,{});
describe( 'Entry selectors', () => {

	it( 'Dispatches', () => {
		const mockFn = jest.fn();
		entryStore.subscribe( mockFn );
		dispatch( CALDERA_FORMS_ENTRIES_SLUG ).setEntries( 'cf1',1,{} );
		expect(mockFn.mock.calls.length).toBe(1);
	});


	it( 'Dispatches entries update to state', () => {
		dispatch( CALDERA_FORMS_ENTRIES_SLUG ).setEntries( 'cf1',1,{} );
		expect(entryStore.getState()).toEqual( { cf1: { '1': {} }, forms: [] });
	});

	it( 'Dispatches forms update to state', () => {
		dispatch( CALDERA_FORMS_ENTRIES_SLUG ).setEntries( 'cf1',1,{} );
		const forms = [{ID:'cf1'},{ID:'cf2'} ];
		dispatch( CALDERA_FORMS_ENTRIES_SLUG ).setForms( forms );
		expect(entryStore.getState().forms).toEqual( forms );
	});


	it( 'Dispatches form update to state', () => {
		dispatch( CALDERA_FORMS_ENTRIES_SLUG ).setEntries( 'cf1',1,{} );
		let forms = [{ID:'cf1'},{ID:'cf2'} ];
		dispatch( CALDERA_FORMS_ENTRIES_SLUG ).setForms( forms );
		const updateForm = {ID:'cf2', 'name': 'Mike' };
		dispatch( CALDERA_FORMS_ENTRIES_SLUG ).setForm( updateForm );
		forms[1] = updateForm;
		expect(entryStore.getState().forms).toEqual( forms );
	});

	it( 'Selects forms from state', () => {
		let forms = [{ID:'cf1'},{ID:'cf2'} ];
		dispatch( CALDERA_FORMS_ENTRIES_SLUG ).setForms( forms );
		const selection = select( CALDERA_FORMS_ENTRIES_SLUG ).getForms();
		expect(selection).toEqual(forms);

	});

	it( 'Selects form from state', () => {
		let forms = [{ID:'cf1'},{ID:'cf2'} ];
		dispatch( CALDERA_FORMS_ENTRIES_SLUG ).setForms( forms );
		const selection = select( CALDERA_FORMS_ENTRIES_SLUG ).getForm( 'cf2' );
		expect(selection).toEqual(forms[1]);

	});

	it( 'Has selectors', () => {
		const selectors = select( CALDERA_FORMS_ENTRIES_SLUG );
		expect( typeof selectors.getEntries ).toBe( 'function' );
		expect( typeof selectors.getForms ).toBe( 'function' );
		expect( typeof selectors.getForm ).toBe( 'function' );


	});
	it( 'Selects entries', () => {
		const {setEntries} = select( CALDERA_FORMS_ENTRIES_SLUG );
		const mockFn = jest.fn();

		dispatch( CALDERA_FORMS_ENTRIES_SLUG ).setEntries( 'cf1',1,{1:{a:1}} );

		const selection = select( CALDERA_FORMS_ENTRIES_SLUG ).getEntries( 'cf1',1 );
		expect(selection).toEqual( {1:{a:1} });

	});
});

describe( 'entryStoreFactory', () => {
	it( 'Dispatches', () => {
		const store = entryStoreFactory('FOOD');
		const mockFn = jest.fn();
		store.subscribe( mockFn );
		dispatch( 'FOOD' ).setEntries( 'cf1',1,{} );
		expect(mockFn.mock.calls.length).toBe(1);
	});

});