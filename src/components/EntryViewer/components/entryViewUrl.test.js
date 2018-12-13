import {entryViewUrl} from "./entryViewUrl";
describe( 'entryViewUrl' , () => {
	it( 'returns the right url', () => {
		expect( entryViewUrl(7,'cf1234') ).toBe( "http://localhost:8218/Layout/162?entryId=7&formId=cf1234" );
	})
});
