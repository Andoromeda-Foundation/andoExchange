/* */

import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';

ScatterJS.plugins(new ScatterEOS);

const networkjson = {
    blockchain: 'eos',
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host: 'proxy.eosnode.tools',
    port: 443,
    protocol: 'https'
};

// const eosnetwork = ScatterJS.Network.fromJson(networkjson);

let eosClient = null;
// const eosClient = Eos({
//     chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
//     httpEndpoint: 'https://proxy.eosnode.tools',
// });

const EOSAPI = {
    install(Vue) {
        Object.defineProperties(Vue.prototype, {
            $EOSAPI: {
                get() {
                    return EOSAPI;
                },
            },
        });
    },
    async connectScatter() {
        await ScatterJS.scatter.connect('KumoTrans', { initTimeout: 2000 });
    },
    async getAccount() {
        await ScatterJS.scatter.getIdentity({ accounts: [networkjson] });
        eosClient = await ScatterJS.scatter.eos(networkjson, Eos);
        const account = await ScatterJS.scatter.identity.accounts.find(x => x.blockchain === 'eos');
        return account.name;
    },
    async sendTransaction(sender, receiver, amountStr, memo) {
        const transaction = await eosClient.transfer(sender, receiver, amountStr, memo);
        return transaction;
    }

}

export default EOSAPI;