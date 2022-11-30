import { useEffect, useState } from 'react';
// import './App.css';

// import BalanceModal from './components/BalanceModal';
// import TransactionModal from './components/TransactionModal';

const Wallet = () => {
    const [ walletAccount, setWalletAccount ] = useState('')
    const [ currentChain, setCurrentChain ] = useState('')
    const [ showBalanceModal, setShowBalanceModal ] = useState(false)
    const [ showTransactionModal, setShowTransactionModal ] = useState(false)
    const [ isConnected, setIsConnected ] = useState(false)
    const [ ethBalance, setEthBalance ] = useState(null)
  
  
    // Initialize the application and MetaMask Event Handlers
    useEffect(() => {
  
      // Setup Listen Handlers on MetaMask change events
      if(typeof window.ethereum !== 'undefined') {
          // Add Listener when accounts switch
          window.ethereum.on('accountsChanged', (accounts) => {
  
            console.log('Account changed: ', accounts[0])
            setWalletAccount(accounts[0])
  
          })
          
          // Do something here when Chain changes
          window.ethereum.on('chainChanged', (chaindId) => {
  
            console.log('Chain ID changed: ', chaindId)
            setCurrentChain(chaindId)
  
          })
  
      } else {
          alert('Please install MetaMask to use this service!')
      }
    }, [])
  
    // Used to see if the wallet is currently connected to the application
    // If an account has been accessed with MetaMask, then the wallet is connected to the application.
    useEffect(() => {
        setIsConnected(walletAccount ? true : false)
    }, [walletAccount])
  
    // Connect the Wallet to the current selected account in MetaMask. 
    // Will generate a login request for user if no account is currently connected to the application
    const handleConnectWallet = async () => {
  
        console.log('Connecting MetaMask...')
  
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = accounts[0]
        
        console.log('Account: ', account)
        setWalletAccount(account)
    }
  
    // Handle Disconnected. Removing the state of the account connected 
    // to your app should be enough to handle Disconnect with your application.
    const handleDisconnect = async () => {
  
        console.log('Disconnecting MetaMask...')
        setIsConnected(false)
        setWalletAccount('')
    }
  
    // Connect Once and set the account. 
    // Can be used to trigger a new account request each time, 
    // unlike 'eth_requestAccounts'
    const handleConnectOnce = async () => {
  
        const accounts = await window.ethereum.request({ method: 'wallet_requestPermissions',
            params: [{
              eth_accounts: {}
            }]
        }).then(() => window.ethereum.request({ method: 'eth_requestAccounts' }))
        
        setWalletAccount(accounts[0])
  
    }
  
    // Request the personal signature of the user via MetaMask and deliver a message.
    const handlePersonalSign = async () => {
  
      console.log('Sign Authentication')
  
      const message = [
        "This site is requesting your signature to approve login authorization!",
        "I have read and accept the terms and conditions (https://example.org/) of this app.",
        "Please sign me in!"
      ].join("\n\n")
  
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
  
      const sign = await window.ethereum.request({ method: 'personal_sign', params: [message, account] })
  
    }
  
    // Get the Accounts current Balance and convert to Wei and ETH
    const handleGetBalance = async () => {
  
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
  
      const balance  = await window.ethereum.request({ method: 'eth_getBalance' , params: [ account, 'latest' ]})
  
      // // Returns a hex value of Wei
      const wei = parseInt(balance, 16)
      const gwei = (wei / Math.pow(10, 9)) // parse to Gwei
      const eth = (wei / Math.pow(10, 18))// parse to ETH
  
      setEthBalance({ wei, gwei, eth })
      setShowBalanceModal(true)
  
    }
   
    const handleSendTransaction = async (sender, receiver, amount) => {
      const gasPrice = '0x5208' // 21000 Gas Price
      const amountHex = (amount * Math.pow(10,18)).toString(16)
      
      const tx = {
        from: sender,
        to: receiver,
        value: amountHex,
        gas: gasPrice,
      }
  
      await window.ethereum.request({ method: 'eth_sendTransaction', params: [ tx ]})
  
      setShowTransactionModal(false)
    }

  return (
    <div className="App">
        <div className="container" >

            <div className="row">
             
              <div className="connect-button"  >
<button onClick={!isConnected ? handleConnectWallet : handleDisconnect}>
                  <div className="left-status" >
                      
                  </div>
                  {
                    isConnected ? ( 

                      
                        <div>{walletAccount}</div>
                      
                      ) : (

                        <div>Connect to a wallet</div>

                      )
                  }
                  </button>
              </div>
            </div>



        </div>
    </div>
  )
}

export default Wallet