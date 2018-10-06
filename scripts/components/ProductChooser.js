import {SelectControl} from '@wordpress/components';
import {STORE, STORE_SLUG} from "../product/store";
import { withSelect } from "@wordpress/data";


/**
 * Basic component to choose forms with
 *
 * @param props
 * @return {XML}
 * @constructor
 */
export const ProductChooser = (props) => {
	const opts = props.products && props.products.length ? props.products : [];
	return (
		<SelectControl
			className={'caldera-product-block-product-chooser'}
			label={ 'Choose A Product'  }
			value={ props.value }
			options={ opts.map( (product) => ( {
				value: product.id,
				label: product.title.rendered,
			} ) ) }
			onChange={ (newValue) => {props.onChange(newValue)} }
		/>
	)
};

/**
 * Form chooser wrapped in form selector
 */
export const ProductChooserWithSelect = withSelect( (select, ownProps ) => {
	const { getProducts } = select( STORE_SLUG );
	return {
		getProducts: getProducts()
	};
} )( ProductChooser );







