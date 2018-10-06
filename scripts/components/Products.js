import React from 'react';
import {Product} from "./Product";

export const Products = props => {
	const {products,onReadMore} = props;
	if( products.length){
		return <div>
			{products.map(product => {
				return <Product
					key={product.id}
					product={product}
					onReadMore={onReadMore}
				/>
			})}
		</div>
	}

	return <div>No Products Found</div>

}