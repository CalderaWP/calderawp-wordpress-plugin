import React from "react";

const style ={
	overflow:'hidden',
	overflowWrap:'break-word',
	resize: 'none',
	height: '94px'
};
export const FakeGutenbergPostTitle = (props) => {
	return <div className="editor-post-title">
		<div className="editor-post-title__block">
			<div><label htmlFor="post-title-0" className="screen-reader-text">Add title</label>
				<textarea onChange={() => {}}
				id="post-title-0" className="editor-post-title__input" placeholder="Add title" rows="1"
				style={style} value={props.title}></textarea>
			</div>
		</div>
	</div>
};

export const FakeGutenbergEditorWrap = (props) =>{
		return <div id="editor" className="gutenberg__editor">
			{props.children}
		</div>

}
