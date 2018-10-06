

const DEFAULT_STATE = {
	products: {},
	apiRoot: '',
};

const actions = {
	setProducts(products){
		return{
			type: 'SET_PRODUCTS',
			products
		}
	},
	setApiRoot(apiRoot){
		return {
			type: 'SET_API_ROOT',
			apiRoot
		}
	}

};
export const STORE_SLUG = 'caldera-product-blocks-store';
export const STORE = {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_PRODUCTS':
				return {
					...state,
					products: action.products
				};

			case 'SET_API_ROOT':
				return {
					...state,
					apiRoot: action.apiRoot,
				};
		}

		return state;
	},

	actions,

	selectors: {
		getApiRoot( state ) {
			return state.apiRoot;

		},
		getProducts(state){
			const {products} = state;
			return products.length ? products: [];
		}
	},
	resolvers: {
		getProducts( state ) {
			if( ! state.apiRoot ){
				return;
			}
			fetch(state.apiRoot, {
				mode: 'cors',
				redirect: 'follow',
				cache: "default",
			}).then(response => response.json())
				.catch(error => {console.log(error)})
				.then(response => {
					actions.setProducts(response);
				})
		},
	},
};