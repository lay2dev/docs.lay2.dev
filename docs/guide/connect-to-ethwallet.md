---
title: Connect to Ethereum wallet
---

# Connect to Ethereum wallet

**PW Core** makes it very easy to receive and transfer CKB or UDT (User Defined Token) in CKB dApps.

Users don't need to install a new wallet or create a new CKB mnemonic, they can just open an existing cryptocurrency wallet and use the ETH / EOS / Tron addresses they are quite familiar with, to receive or send CKB and UDTs.

This article describes a series of basic functions for developing CKB dApp based on PW Core SDK, including: address acquisition, balance acquisition, sending transactions, etc., using the example of accessing an ETH wallet.

If you want to try out other blockchain wallets, you can go to: [EOS wallet](./connect-to-eoswallet), [Tron wallet](./connect-to-tronwallet).

## Quick access

In your dApp, add the following js code:

``` js
import PWCore, {
  PwCollector,
  ChainID,
  Address,
  Amount,
  AddressType,
  EthProvider
} from '@lay2/pw-core'

// connect to CKB testnet: https://testnet.ckb.dev
// connect to CKB mainnet: https://mainnet.ckb.dev/
const pwcore = await new PWCore('https://testnet.ckb.dev').init(
  new EthProvider(), // a built-in Provider for Ethereum env.
  new PwCollector('https://cellapitest.ckb.pw') // a custom Collector to retrive cells from cache server.
)
```

::: warning Note
You can choose to connect the CKB nodes provided by the Lay2 team below, or of course you can choose to connect your own CKB nodes.
* CKB Mainnet：https://mainnet.ckb.dev/
* CKB Testnet：https://testnet.ckb.dev

There are limit for frequency:
* rate: 20 req / s
* burst: 20 req / s, you will receive 500 Error if the limit is exceeded.
:::

## General Purpose Commands

### `Get login address`
Get the current Ethereum address which the user is logged in.
``` js
// get the login eth address.
const ethAddress = PWCore.provider.address.addressString
```

### `Get the corresponding CKB address`
Get the corresponding CKB address based on the Ethereum address which the user is currently logged in.
``` js
// change the login eth address to ckb address.
const ckbAddress = PWCore.provider.address.toCKBAddress()
```

### `Get CKB balance`
Get the CKB balance of the current address.
``` js
// get balance of current address.
const ckbBalance = await PWCore.defaultCollector.getBalance(PWCore.provider.address)
```

More generically, we can get the CKB balance of any addresses.
``` js
// get balance of any CKB address.
const anyCkbAddress = new Address('Any CKB address', AddressType.ckb)
const ckbBalance = await PWCore.defaultCollector.getBalance(anyCkbAddress)

// get balance of any ETH address.
const anyEthAddress = new Address('Any ETH address', AddressType.eth)
const ckbBalance = await PWCore.defaultCollector.getBalance(anyEthAddress)
```

### `Get SUDT balance`
Get the SUDT balance of the current address.
``` js
const sudtBalance = await PWCore.defaultCollector.getSUDTBalance(new SUDT(SUDT_ISSURER_LOCKHASH), PWCore.provider.address);
```