import "selectionSort.sol";

contract Exchange is selectionSort {
    struct Ask {
        address seller;
        uint shares;
        uint price;
        uint date;
    }   
    
    struct Bid {
        address buyer;
        uint shares;
        uint price;
        uint date;
    }
    
    mapping(address => Ask) public asks;
    mapping(address => Bid) public bids;
    Ask[] public Asks;
    Bid[] public Bids;
    
    function SubmitAsk(address _seller, uint _shares, uint _price) returns (bool){
        if(_seller == 0x0 || _shares == 0 || _price == 0)
            throw;
        
        uint dated = now;
        Asks.push(Ask({seller : _seller, shares : _shares, price : _price, date: dated}));
        asks[_seller].seller = _seller;
        asks[_seller].shares = _shares;
        asks[_seller].price = _price;
        asks[_seller].date = dated;
        return true;
    }
    
    function SubmitBid(address _buyer, uint _shares, uint _price) returns (bool){
        if(_buyer == 0x0 || _shares == 0 || _price == 0)
            throw;
        
        if(BidInMarket(_shares, _price))
            return true;
        
        
        // Push to Bids if order cannot be executed;
        uint dated = now;
        Bids.push(Bid({buyer : _buyer, shares : _shares, price : _price, date: dated}));
        bids[_buyer].buyer = _buyer;
        bids[_buyer].shares = _shares;
        bids[_buyer].price = _price;
        bids[_buyer].date = dated;
        return true;
    }
    
    function BidInMarket(uint _shares, uint _price) returns (bool){
       uint min;
       uint max;
       (min, max) = MinMaxAsk();
       if(min < _price)
            return true;
    }
    
    function AskInMarket(uint _shares, uint _price) returns (bool){
        
    }
    
    function SortAsks() returns (uint[] _sorted){
        uint[]  asks;
        for(uint i = 0; i < Asks.length; i++)
            asks.push(Asks[i].price);
        return sort(asks);
    }
    
    function AskMatches(uint _price) returns (address []){
        address[] matches;
        for(uint i = 0; i < Asks.length; i++)
            if(Asks[i].price == _price)
                matches.push(Asks[i].seller);
        return matches;
    }
    
    function MinMaxAsk() returns (uint _min, uint _max){
        uint min;
        uint max;
        uint[]  asks;
        for(uint i = 0; i < Asks.length; i++)
            asks.push(Asks[i].price);
        asks = sort(asks);
        min = asks[0];
        max = asks[asks.length];
        return (min, max);
    }
    
    function Settlement(){}
}

contract Venture is Exchange {
    address public Alice = address(this);
    address public Bob = msg.sender;

    struct Shareholder {
        address account;
        uint sharesHeld;
    }
    
    mapping(address => Shareholder) public shareholders;
    
    function Venture(){
        shareholders[Alice].account = Alice;
        shareholders[Alice].sharesHeld = 1000000;
    }
    
    function Bid() returns(bool){
        return SubmitBid(Bob, 100, 5);
    }
    
    function Ask() returns(bool){
        return SubmitAsk(Alice, 100, 8);
    }
    
    
}
















