<template>
    <div>
        <h1>Welcome to KumoTrans at {{ location }}</h1>
        <form>
            <label for="btc">BTC</label>
            <input type="radio" id="btc" value="BTC" v-model="platform">
            <label for="eth">ETH</label>
            <input type="radio" id="eth" value="ETH" v-model="platform">
            <label for="eos">EOS</label>
            <input type="radio" id="eos" value="EOS" v-model="platform">
            <label for="dgt">DGT</label>
            <input type="radio" id="dgt" value="DGT" v-model="platform">
            <label for="sfo">SFO</label>
            <input type="radio" id="sfo" value="SFO" v-model="platform"><br><br>
            Receiver Address:<br>
            <input v-model="receiver" type="text" name="receiver"><br>
            Transfer Amount:<br name="platform">
            <input v-model="amount" type="number" name="amount"><br>
            Memo:<br>
            <input v-model="memo" type="text" name="memo"><br>
        </form>
        <br>
        <p>Preview: Platform: {{ platform }}, Receiver: {{ receiver }}, Amount: {{ amount }}, Memo: {{ memo }}</p>
        <button v-on:click="setResult">Preview</button>
        <p>Result: Platform: {{ platformrr }}, Receiver: {{ receiverrr }}, Amount: {{ amountrr }}, Memo: {{ memorr }}</p><br>
        <p>Current Address: {{ address }}, Balance: {{ balance }}</p>
        <button v-on:click="viewAccount">Account</button><br>
        <p>Transfer Hash: {{ hash }}</p>
        <button v-on:click="doTransferCb">Transfer</button>

    </div>
</template>

<script>
import API from '@/api/ethmetamask'

export default {
    name: 'transbox',
    // Choose one from props/data()
    props: {
        location: String,
        // receiverrr: String,
        // amountrr: Number,
        // memorr: String
    },
    data() {
        return {
            receiver: '0x0000',
            amount: 10,
            memo: 'x',
            platform: 'x',
            receiverrr: "xx",
            amountrr: 0,
            memorr: "xx",
            platformrr: "xx",
            address: '0x0000',
            balance: 'xx',
            hash: 'xx',
        }
    },
    methods: {
        setResult() {
            // Need this. to access to local variables..
            this.receiverrr = this.receiver;
            this.amountrr = this.amount;
            this.memorr = this.memo;
            this.platformrr = this.platform;
        },
        async viewAccount() {
            const info = await API.getAccount();
            this.address = info.address;
            this.balance = info.balance.length > 19 ? info.balance.slice(0, -18) :
                '0' + '.' + info.balance.slice(-18, -15) + ' ETH';
        },
        async doTransfer() {
            const actualAmount = (this.amount * 1000).toString().split('.');
            this.hash = await API.sendTransaction(
                this.address, 
                this.receiver, 
                actualAmount[0] + '000000000000000',
            );
        },
        doTransferCb() {
            const actualAmount = (this.amount * 1000).toString().split('.');
            API.sendTransaction(
                this.address, 
                this.receiver, 
                actualAmount[0] + '000000000000000',
                function (transactionHash) {
                    this.hash = transactionHash;
                }
            );
        }
    }
}
</script>

<style scoped>
h1 {
    font-family: Georgia, serif;
    font-size: 25px;
    letter-spacing: 2px;
    word-spacing: 2px;
    color: #3CCD22;
    font-weight: normal;
    text-decoration: none;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
}
label {
    margin-left: 12px
}
</style>
