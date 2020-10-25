---
title: Connect to EOS wallet
---

# Connect to EOS wallet

**PW Core** makes it very easy to receive and transfer CKB or UDT (User Defined Token) in CKB dApps.

Users don't need to install a new wallet or create a new CKB mnemonic, they can just open an existing cryptocurrency wallet and use the ETH / EOS / Tron addresses they are quite familiar with, to receive or send CKB and UDTs.


## Quick access

In your dApp, add the following js code:

``` js
import PWCore, {
  PwCollector,
  ChainID,
  Address,
  Amount,
  AddressType,
  EosProvider,
  EosSigner
} from '@lay2/pw-core'

// set the network parameters of EOS node
const network = {
  blockchain: 'eos',
  chainId:
    'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  host: 'eospush.tokenpocket.pro',
  port: 443,
  protocol: 'https',
}

// connect to CKB testnet: https://testnet.ckb.dev
// connect to CKB mainnet: https://mainnet.ckb.dev
const pwcore = await new PWCore('https://testnet.ckb.dev').init(
  new EosProvider(network), // a built-in Provider for EOS env.
  new PwCollector('https://cellapitest.ckb.pw') // a custom Collector to retrive cells from cache server.
)
```

::: warning Note
You can choose to connect the CKB nodes provided by the Lay2 team below, or of course you can choose to connect your own CKB nodes.
* CKB Mainnet：https://mainnet.ckb.dev
* CKB Testnet：https://testnet.ckb.dev

There are limit for frequency:
* rate: 20 req / s
* burst: 20 req / s, you will receive 500 Error if the limit is exceeded.
:::

## General Purpose Commands

### `Get login address`
Get the current EOS address which the user is logged in.
``` js
// get the login EOS address.
const eosAccount = PWCore.provider.address.addressString
```

### `Get the corresponding CKB address`
Get the corresponding CKB address based on the EOS address which the user is currently logged in.
``` js
// change the login EOS address to ckb address.
const ckbAddress = PWCore.provider.address.toCKBAddress()
```

### `Get CKB balance`
Get the CKB balance of the current address.
``` js
// get the balance of current address.
const ckbBalance = await PWCore.defaultCollector.getBalance(PWCore.provider.address)
```

More generically, we can get the CKB balance of any addresses.
``` js
// get balance of any CKB address.
const anyCkbAddress = new Address('Any CKB address', AddressType.ckb)
const ckbBalance = await PWCore.defaultCollector.getBalance(anyCkbAddress)

// get balance of any EOS address.
const anyEosAddress = new Address('Any EOS address', AddressType.eos, 'lockArgs of this EOS address')
const ckbBalance = await PWCore.defaultCollector.getBalance(anyEosAddress)
```

### `Get SUDT balance`
Get the SUDT balance of the current address.
``` js
const sudtBalance = await PWCore.defaultCollector.getSUDTBalance(new SUDT(SUDT_ISSURER_LOCKHASH), PWCore.provider.address);
```