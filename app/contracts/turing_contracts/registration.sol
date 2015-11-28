contract Registration {
	address [] public ventures;

	function register(address _venture) returns (bool){
		ventures.push(_venture);
		return true;
	}

	function registered() returns (address []){
		return ventures;
	}
}