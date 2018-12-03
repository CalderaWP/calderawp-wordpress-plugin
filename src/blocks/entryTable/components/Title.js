import React,{Fragment} from "react";

export const Title = ({title}) => {
	if( title ){
		return <h2>{title}</h2>;
	}

	return <Fragment />
}