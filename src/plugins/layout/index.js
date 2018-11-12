import { registerPlugin }  from '@wordpress/plugins';
import {Fragment} from '@wordpress/element';
import { PluginSidebar,PluginSidebarMoreMenuItem } from "@wordpress/editPost";
const Component = () => (
	<Fragment>
		<PluginSidebarMoreMenuItem
			target="sidebar-name"
		>
			Layout Settings
		</PluginSidebarMoreMenuItem>
		<PluginSidebar
			name="sidebar-name"
			title="My Sidebar"
		>
			Content of the sidebar
		</PluginSidebar>
	</Fragment>
);

registerPlugin( 'layout-sidebar', {
	icon: 'smiley',
	render: Component,
} );
