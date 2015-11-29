contract Venture {
	bytes32 public name:
	address public founder;

	function create(bytes32 _name) returns(bool){
		name = _name
		founder = msg.sender;
		return true;
	}
}