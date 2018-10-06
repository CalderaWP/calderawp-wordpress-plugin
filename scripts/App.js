import React from 'react';
import {Product} from "./components/Product";
import {Products} from "./components/Products";
import {ProductSingle} from "./components/ProductSingle";

class App extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			product: {},
			products: [],
			hasLoaded: false,
		}
		this.setProduct = this.setProduct.bind(this);

	}

	componentDidMount(){
		fetch(this.props.productApi, {
			mode: 'cors',
			redirect: 'follow',
			cache: "default",
		}).then(response => response.json())
			.catch(error => {this.setState({hasLoaded:true})})
			.then(response => {
				this.setState(
					{
						hasLoaded:true,
						products: response
					})
				}
			)
	}

	setProduct(product){
		this.setState({product: this.state.products.find( _product => product == _product.id )})
	}


	render(){
		const {hasLoaded} = this.state;
		if( ! hasLoaded ){
			return<div>Loading..</div>

		}
		const {product,products} = this.state;
		if( Object.keys(product).length === 0 && product.constructor === Object ){
			return(
				<Products
					onReadMore={this.setProduct}
					products={products}
				/>
			)
		}

		return (
			<ProductSingle product={product}/>
		)


	}
}
App.defaultProps = {
	productApi: 'https://calderaforms.com/wp-json/wp/v2/download/',
};
export default App;