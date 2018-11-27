import {registerPlugin} from '@wordpress/plugins';
import {Fragment} from '@wordpress/element';
import {PluginSidebar, PluginSidebarMoreMenuItem} from "@wordpress/editPost";
import {SidebarContentWithState} from "./SidebarContent";
import {blockDefinitions} from "../../block-factory/blocks";

export const LAYOUT_SIDEBAR_NAME = 'layout-preview-sidebar';
export const LAYOUT_SIDEBAR_TITLE = 'Layout Preview Settings';

const Component = () => (
	<Fragment>
		<PluginSidebarMoreMenuItem
			target={LAYOUT_SIDEBAR_NAME}
		>
			Layout Settings
		</PluginSidebarMoreMenuItem>
		<PluginSidebar
			name={LAYOUT_SIDEBAR_NAME}
			title={LAYOUT_SIDEBAR_TITLE}
		>
			<SidebarContentWithState
				instanceId={LAYOUT_SIDEBAR_NAME}
			/>
		</PluginSidebar>
	</Fragment>
);

registerPlugin(LAYOUT_SIDEBAR_NAME, {
	icon: 'smiley',
	render: Component,
});
