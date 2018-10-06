import React from 'react';
import EmbedContainer from 'react-oembed-container';
export const ProductSingle = props => {
	console.log(props);
	const post = props.product;
	return <EmbedContainer
		markup={ post.content.rendered }
	>
		<article id={`post-${post.id}`}>
			<h2>{ post.title.rendered }</h2>
			<div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
		</article>
	</EmbedContainer>;
}