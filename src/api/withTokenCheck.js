module.exports = function withTokenCheck(req,res, apiHandler, checkToken) {
	const valid = checkToken;
	if( valid.valid ){
		return apiHandler(req,res);
	}

	const r = Array.isArray(valid.data) ? valid.data : {data:valid.data}
	return res.status(403).send(r);

};
