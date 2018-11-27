import {CALDERA_FORMS_ENTRIES_SLUG, entryStoreFactory,initalState} from './entryStore';
import {dispatch, select} from '@wordpress/data';

const entryStore = entryStoreFactory(CALDERA_FORMS_ENTRIES_SLUG, {});
describe('Entry selectors', () => {

	it('Dispatches', () => {
		const mockFn = jest.fn();
		entryStore.subscribe(mockFn);
		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setEntries('cf1', 1, {});
		expect(mockFn.mock.calls.length).toBe(1);
	});


	it('Dispatches entries update to state', () => {
		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setEntries('cf1', 1, {});
		expect(entryStore.getState()).toEqual(
			{"cf1": {"1": {}}, "forms":  [], "previewEntryId": 0, "previewFormId": ""}

		);
	});

	it('Dispatches forms update to state', () => {
		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setEntries('cf1', 1, {});
		const forms = [{ID: 'cf1'}, {ID: 'cf2'}];
		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setForms(forms);
		expect(entryStore.getState().forms).toEqual(forms);
	});


	it('Dispatches form update to state', () => {
		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setEntries('cf1', 1, {});
		let forms = [{ID: 'cf1'}, {ID: 'cf2'}];
		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setForms(forms);
		const updateForm = {ID: 'cf2', 'name': 'Mike'};
		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setForm(updateForm);
		forms[1] = updateForm;
		expect(entryStore.getState().forms).toEqual(forms);
	});

	it('Selects forms from state', () => {
		let forms = [{ID: 'cf1'}, {ID: 'cf2'}];
		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setForms(forms);
		const selection = select(CALDERA_FORMS_ENTRIES_SLUG).getForms();
		expect(selection).toEqual(forms);

	});

	it('Selects form from state', () => {
		let forms = [{ID: 'cf1'}, {ID: 'cf2'}];
		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setForms(forms);
		const selection = select(CALDERA_FORMS_ENTRIES_SLUG).getForm('cf2');
		expect(selection).toEqual(forms[1]);

	});

	it('Has selectors', () => {
		const selectors = select(CALDERA_FORMS_ENTRIES_SLUG);
		expect(typeof selectors.getEntries).toBe('function');
		expect(typeof selectors.getForms).toBe('function');
		expect(typeof selectors.getForm).toBe('function');


	});
	it('Selects entries', () => {
		const {setEntries} = select(CALDERA_FORMS_ENTRIES_SLUG);
		const mockFn = jest.fn();

		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setEntries('cf1', 1, {1: {a: 1}});

		const selection = select(CALDERA_FORMS_ENTRIES_SLUG).getEntries('cf1', 1);
		expect(selection).toEqual({1: {a: 1}});

	});

	it('Selects an entry', () => {
		const {setEntries} = select(CALDERA_FORMS_ENTRIES_SLUG);
		const mockFn = jest.fn();
		const e2 = {a:2, b:4};
		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setEntries('cf1', 1, {1: {a: 1}, 2: e2, 3:{a:11, b:4}});

		const selection = select(CALDERA_FORMS_ENTRIES_SLUG).getEntry('cf1', 2,1);
		expect(selection).toEqual(e2);

	});

	it('selector getFormFieldsForEntry', () => {
		const fld1 = {
			id: 'fld1'
		};
		const field_details = {
			order:
				{
					fld_8768091: {id: 'fld_8768091', label: 'First Name'},
					fld_9970286: {id: 'fld_9970286', label: 'Last Name'},
					fld_6009157: {id: 'fld_6009157', label: 'Email Address'},
					fld_7683514: {id: 'fld_7683514', label: 'Comments / Questions'}
				},
			entry_list:
				{
					id: {id: 'id', label: 'ID'},
					datestamp: {id: 'datestamp', label: 'Submitted'}
				}
		};

		let forms = [{ID: 'cf1'}, {
			ID: 'cf2',
			field_details

		}];

		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setForms(forms);
		const fields = select(CALDERA_FORMS_ENTRIES_SLUG).getFormFieldsForEntry('cf2');
		expect( {
			...field_details.entry_list,
			...field_details.order
		}).toEqual(fields);

	});

	it( 'updates the preview form Id ', () => {
		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setEntryPreviewFormId('cf1');
		expect( entryStore.getState().previewFormId).toEqual('cf1');

	});

	it( 'updates the preview entry Id ', () => {
		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setEntryPreviewEntryId(2);
		expect( entryStore.getState().previewEntryId).toEqual(2);

	});

	it( 'updates and selects the preview form Id ', () => {
		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setEntryPreviewFormId('cf1');
		const selection = select(CALDERA_FORMS_ENTRIES_SLUG).getPreviewFormId();
		expect( selection ).toEqual('cf1');

	});

	it( 'updates and selects the preview entry Id ', () => {
		dispatch(CALDERA_FORMS_ENTRIES_SLUG).setEntryPreviewEntryId(2);
		const selection = select(CALDERA_FORMS_ENTRIES_SLUG).getPreviewEntryId();
		expect( selection ).toEqual(2);

	});
});

describe('entryStoreFactory', () => {
	it('Dispatches', () => {
		const store = entryStoreFactory('FOOD');
		const mockFn = jest.fn();
		store.subscribe(mockFn);
		dispatch('FOOD').setEntries('cf1', 1, {});
		expect(mockFn.mock.calls.length).toBe(1);
	});

});