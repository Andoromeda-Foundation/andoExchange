/* */
import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546', null, {}); 

const API = {
    install(Vue) {
        Object.defineProperties(Vue.prototype, {
            $API: {
                get() {
                    return API;
                },
            },
        });
    },
    async checkWallet() {
        if (window.ethereum !== 'undifined') {
            return true;
        }
        return false;
    },
    async getAccount() {
        // let accountinfo = {};
        const accounts = await window.ethereum.enable();
        // accountinfo.address = accounts[0];
        // return accountinfo;
        // const accounts = await window.ethereum.enable();
        // return accounts[0];
        // const accounts = await web3.eth.getAccounts();
        const balance = await web3.eth.getBalance(accounts[0]);
        const info = { address:accounts[0], balance };
        // console.log();
        return info;
    },
    async sendTransaction(sender, receiver, amount) {
        const result = await web3.eth.sendTransaction({
            from: sender,
            to: receiver,
            value: amount
        });
        const hash = result.transactionHash;
        return hash;
    },
    sendTransactionCb(sender, receiver, amount, callback) {
        web3.eth.sendTransaction({
            from: sender,
            to: receiver,
            value: amount
        }, function(error, hash) {
            if (error) {
                throw(error);
            }
            callback(hash);
        });
    }
}

export default API;