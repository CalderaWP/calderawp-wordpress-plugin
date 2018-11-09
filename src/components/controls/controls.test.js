import renderer from 'react-test-renderer';
descibe( 'Choosing controls', () => {
	const form = {};
	const forms = [];
	const entries = {};
	const entry = {};
	const instanceId = '54fds'
	const beforeText = '';
	const afterText = '';
	const onSetForm = () => {};
	const onSetEntry = () => {};
	const onSetEntryField = () => {};
	const setBefore = () => {};
	const setAfter = () => {};
	test( 'Choose form', () => {
		expect(
			renderer.create(
				<ChooseForm
					forms={forms}
					currentFormId={formId}
					onSetForm={onSetForm}
					instanceId={instanceId}
				/>
			)
		).toMatchSnapshot();
	});

	test( 'Choose form', () => {
		expect(
			renderer.create(
				<ChooseForm
					forms={forms}
					currentFormId={formId}
					onSetForm={onSetForm}
					instanceId={instanceId}
				/>
			)
		).toMatchSnapshot();
	});

	test( 'Choose form', () => {
		expect(
			renderer.create(
				<ChooseForm
					forms={forms}
					currentFormId={formId}
					onSetForm={onSetForm}
					instanceId={instanceId}
				/>
			)
		).toMatchSnapshot();
	});


	test( 'Choose entry', () => {
		expect(
			renderer.create(
				<ChooseEntry
					entries={entries}
					currentEntry={entryId}
					onSetEntry={onSetEntry}
					instanceId={instanceId}
				/>
			)
		).toMatchSnapshot();
	});

	test( 'Choose entry field', () => {
		expect(
			renderer.create(
				<ChooseEntryField
					currentEntry={entryId}
					form={form}
					onSetField={onSetField}
					instanceId={instanceId}
					entries={entries}
					entryFieldId={entryFieldId}
				/>
			)
		).toMatchSnapshot();
	});

	test( 'Entry before editor', () => {
		expect(
			renderer.create(
				<EntryBeforeEdit
					before={before}
					setBefore={setBefore}
				/>
			)
		).toMatchSnapshot();
	});

	test( 'Entry after editor', () => {
		expect(
			renderer.create(
				<EntryAfterEdit
					before={before}
					setBefore={setBefore}
				/>
			)
		).toMatchSnapshot();
	});
});