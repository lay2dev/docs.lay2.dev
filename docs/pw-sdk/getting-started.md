---
title: Getting started
---

# Quick Start

## Installation

We use PW Core to build the CKB dApp, the first step is to install the PW Core SDK package.

Installing with `npm`

``` bash
# in your project root
npm install @lay2/pw-core --save
```

Or install with `yarn`

``` bash
# in your project root
npm install @lay2/pw-core --save
```

## Hello World

Let's see how to send a CKB transaction using PW Core.

``` js
import PWCore, {
  EthProvider,
  PwCollector,
  ChainID,
  Address,
  Amount,
  AddressType,
} from '@lay2/pw-core';

// insdie an async scope

const pwcore = await new PWCore('https://ckb-node-url').init(
  new EthProvider(), // a built-in Provider for Ethereum env.
  new PwCollector() // a custom Collector to retrive cells from cache server.
);

const txHash = await pwcore.send(
  new Address('0x26C5F390FF2033CbB44377361c63A3Dd2DE3121d', AddressType.eth),
  new Amount('100')
);
```

It's as simple as that, we've linked to our usual Ethereum wallets (e.g. MetaMask, imToken, etc.) and are sending 100 CKB to the address ending of `121d`.