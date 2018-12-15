import {
	FormChooserForEntriesWithSelect,
	ChooseEntryWithSelect
} from "../../blocks/entryControlsWithState";
import {Fragment} from '@wordpress/element';
import {withState} from '@wordpress/compose';
import {dispatch,select} from '@wordpress/data';
import {CALDERA_FORMS_ENTRIES_SLUG} from "../../blocks/entryStore";
import {ENTRY_VALUE_BLOCK_NAME} from "../../blocks/entryValue";

const {
	getBlocks,
} = select( 'core/editor' );

const {
	updateBlockAttributes
} = dispatch( 'core/editor' );


export const maybeUpdateBlocks = (allblocks,formId,entryId) => {
	if( allblocks.length){
		const entryValueBlocks = [];
		allblocks.forEach( block => {
			if( ENTRY_VALUE_BLOCK_NAME === block.name ){
				updateBlockAttributes(block.clientId,{
					formId,
					entryId
				})
			}
		});

	}
};
export const SidebarContent = ({formId, entryId, instanceId,setState}) => {
	const {
		setEntryPreviewFormId,
		setEntryPreviewEntryId
	} = dispatch(CALDERA_FORMS_ENTRIES_SLUG);
	return (
		<Fragment>
			<FormChooserForEntriesWithSelect
				instanceId={instanceId}
				currentFormId={formId}
				onSetForm={(formId) => {

					setEntryPreviewFormId(formId);
					setState({entryId:0,formId});
				}}
			/>
			{formId &&
				<ChooseEntryWithSelect
					instanceId={instanceId}
					currentEntry={entryId}
					currentFormId={formId}
					onSetEntry={
						(entryId) => {
							setEntryPreviewEntryId(entryId);
							setState({entryId});
							maybeUpdateBlocks(getBlocks(),formId, entryId);
						}
					}
				/>

			}
		</Fragment>

	);
};

export const SidebarContentWithState = withState({
	formId: '',
	entryId: 0
})(SidebarContent);
