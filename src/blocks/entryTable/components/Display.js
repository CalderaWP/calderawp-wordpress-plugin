import {Title} from "./Title";
import {EntryViewer} from "../../../components/EntryViewer/EntryViewer";
import React from "react";

export const  Display = ({entries,form,title,getCurrentEntry}) =>
	 (
		<div>
			<Title title={title}/>
			<EntryViewer
				currentEntryId={0}
				entries={entries}
				getCurrentEntry={getCurrentEntry}
				form={form}
			/>

		</div>
	);
