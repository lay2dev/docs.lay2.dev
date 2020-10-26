---
title: Introduction of Payment Demo
---

# Introduction of Payment Demo

::: tip Tip
We have developed a simple CKB and SUDT([Simple User Defined Token](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0025-simple-udt/0025-simple-udt.md)) [**Payment Demo**](https://pay.lay2.dev/) based on [**PW Core**](https://github.com/lay2dev/pw-core)
:::

## Connect to wallet

In this demo, we have provided multiple ways to connect to the wallet, including infrastructures of three major ecologies of **Ethereum**, **EOS**, and **Tron**. Among them:

* When connecting via **Ethereum**, users can choose to access MetaMask, WalletConnect and Tor.us in three ways.
    * MetaMask: contains ethereum dApp browsers that use [Web3.js](https://github.com/ethereum/web3.js/), e.g. MetaMask, imToken, Bitpie, TokenPocket, ABC Wallet, MathWallet, etc.
    * WalletConnect: Contains cryptocurrency wallets that support the [WalletConnect](https://walletconnect.org/) protocol, e.g. Trust, imToken, Huobi Wallet, etc.
    * Tor.us: Contains login methods for social accounts supported by [Tor.us](https://tor.us/), e.g. Google, Twitter, Facebook, Apple, Discord, GitHub, Link, WeChat, etc.

* When connecting via **EOS**, you need to select a browser plug-in or mobile wallet that supports EOS dApp, for example:
    * Browser plug-ins: MathWallet, Leafwallet, etc.
    * Mobile wallets: imToken, TokenPocket, Bitpie, Huobi Wallet, ABC Wallet, etc.

* When connecting via **Tron**, you need to select a browser plug-in or mobile wallet that supports Tron dApp, for example:
    * Browser plug-ins: Tronlink, MathWallet, etc.
    * Mobile wallets: imToken, TokenPocket, Bitpie, Huobi Wallet, etc.

## Access to information

After connecting the wallet, the following information will be fetched and displayed.
* The login wallet address and its corresponding CKB address.
* CKB balance of login wallet address
* SUDT balance of the login wallet address (PWBTC was used as an example in the demo)

## Transfer CKB or SUDT

In the Transfer section, you need to select the transfer currency (CKB or PWBTC), enter the transfer address and the amount of token to transfer.

You can use several formats for the transfer address.
* CKB address
    * CKB short address
    * CKB long address
* Ethereum address
* EOS address
* Tron address

::: warning Note
For Ethereum, EOS and Tron adrress, only support common user address, no other contract address
:::

After the input is complete, click send to sign, complete the signature, and wait for the transaction to be packaged and on chain.