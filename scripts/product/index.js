/* globals wp */
import {registerBlockType } from '@wordpress/blocks';
import {InspectorControls } from '@wordpress/editor';
import { SelectControl,TextControl,Placeholder } from '@wordpress/components';
import {registerStore,select,dispatch} from '@wordpress/data';
import {STORE,STORE_SLUG} from "./store";
import {Product} from "../components/Product";
import {ProductChooserWithSelect} from "../components/ProductChooser";
import {Settings} from "./Settings";

const productStore = registerStore( STORE_SLUG, STORE );

registerBlockType( 'caldera-product-blocks/product', {
	attributes: {
		productApi: {
			default: '',
			type: 'string'
		},
		product: {
			type: 'integer',
			default: 0
		}
	},
	title: 'Product',


	icon: 'universal-access-alt',
	category: 'layout',

	edit( {attributes,setAttributes,isSelected,className} ) {
		const {productApi, product} = attributes;

		const {setApiRoot,setProducts} = dispatch( STORE_SLUG );
		const {getApiRoot,getProducts} = select( STORE_SLUG );
		if( productApi ){
			dispatch(setApiRoot(productApi));
		}

		function onChangeApiRoot(productApi){
			console.log(productApi);
			dispatch(setApiRoot(productApi));
			setAttributes({productApi });
		}

		function onChangeProduct(product){
			setAttributes({product });
		}
		return(
				<div className={className}>
					<InspectorControls>
						<Settings
							apiRoot={productApi}
							onChangeApiRoot={onChangeApiRoot}
							product={product}
							onChangeProduct={onChangeProduct}
						/>
					</InspectorControls>


					{productApi &&
						<div>
							{getProducts().map(product => {
								console.log(product);
								return <Product product={product} key={product.key}/>
							})}
						</div>

					}
					{ ! productApi &&
						<Placeholder>
							<Settings
								apiRoot={productApi}
								onChangeApiRoot={onChangeApiRoot}

							/>
						</Placeholder>
					}

				</div>

			);



	},

	save( { attributes } ) {
		if( attributes.product ){
			return <Product product={attributes.product} />
		}

	}
} );