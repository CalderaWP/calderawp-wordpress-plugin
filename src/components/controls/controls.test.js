function updatePost( post ){

}


function updatePosts( posts ){
	updateItems( posts, updatePost );
}


function updateItems(items,callback){
	items.forEach( item => callback(item) );
}







describe( 'Puit', () => {



});




