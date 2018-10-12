// @flow

/**
 * Create the block's name based on slug and namespace
 *
 * @param namespace
 * @param slug
 * @return {string}
 */
export default function createBlockName( namespace: string, slug: string) : string
{
	return `${namespace}/${slug}`;
}