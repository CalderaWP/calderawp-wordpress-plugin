import React from 'react';
import EmbedContainer from 'react-oembed-container';
export const Product = props => {
	const post = props.product;
	const {onReadMore} = props;
	return <EmbedContainer
		markup={ post.content.rendered }
	>
		<article id={`post-${post.id}`}>
			<h2>{ post.title.rendered }</h2>
			<div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
			<button
				onClick={() => {
						onReadMore(post.id)
					}
				}
			>Learn More</button>
		</article>
	</EmbedContainer>;
}