// pragma solidity 0.6.1;

// import "@openzeppelin/contracts/ownership/Ownable.sol";

// contract KycContract is Ownable{
//     mapping (address => bool) approved;

//     function setKycCompleted(address adr) public onlyOwner() {
//         approved[adr] = true;
//     }

//     function setKycRevoked (address adr) public onlyOwner() {
//         approved[adr] = false;
//     } 

//     function kycCompleted(address adr) public view returns(bool){
//         return approved[adr];
//     }
// }

pragma solidity 0.6.1;


import "@openzeppelin/contracts/ownership/Ownable.sol";

contract KycContract is Ownable {
    mapping(address => bool) approved;

    function setKycCompleted(address _addr) public onlyOwner {
        approved[_addr] = true;
    }

    function setKycRevoked(address _addr) public onlyOwner {
        approved[_addr] = false;
    }

    function kycCompleted(address _addr) public view returns(bool) {
        return approved[_addr];
    }
}