import React, {useState} from "react";
import Web3 from "web3";



const  ConnectWallet =()=> {
    const [defaultAccount , setDefaultAccout] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [errorMessage, setErrorMessage]= useState(null);

    const connectWalletHandler = ()=>{
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts=>{
                connectAccount(accounts[0]);
            })
          }else{
            setErrorMessage("Metamask is not Install Please install Metamask first!")
          }
     }
     // Set Address of Connected Account:

    const connectAccount = (accAddress)=>{
        setDefaultAccout(accAddress);
        getBalance(accAddress);
    }

    const getBalance = (accAddress)=>{
        window.ethereum.request({method:"eth_getBalance",params:[accAddress,'latest']})
        .then(balance=>{
            setUserBalance(Web3.utils.fromWei(balance, 'ether'));
        })
    }

    // On Account Change Event Listner Metamask
    window.ethereum.on('accountsChanged', function (accounts) {
        console.log("Account Change Called:")
        connectAccount(accounts[0]);
      });
      // On Chain Changed Listener Metamask
      window.ethereum.on('chainChanged', (_chainId) => {
        connectAccount(defaultAccount);
        // window.location.reload()
    });


        return(
        <div className="walletCard">
            <h4> {"Connection To MetaMask using window.etherum methods"}</h4>
            <button onClick={connectWalletHandler}>{"Metamsk Connect"}</button>
            <div className="accountDisplay">
                <h3>Address: {defaultAccount}</h3>
            </div>
            <div className="balanceDisplay">
                <h3>Balance: {userBalance}</h3>
            </div>
           {errorMessage}
        </div>
    )
}
export default ConnectWallet;

