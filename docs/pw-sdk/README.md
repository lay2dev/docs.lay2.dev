---
title: Introduction
---

# About PW SDK

PW SDK is a simple and powerful SDK for building CKB dApps, which consists of three main parts: **PW Core**, **PW lock** and **PW lib**.

* **[**PW Core**](https://github.com/lay2dev/pw-core) is a front-end JS SDK based on Typescript**, which allows developers to directly develop CKB dApps that run in all the blockchain wallets supported by PW lock (currently including ETH wallet, EOS wallet, Tron wallet).

* **[**PW lock**](https://github.com/lay2dev/pw-lock) is a generic multi-chain lock script** that verifies signatures from Bitcoin, Ethereum, EOS, Tron, and other blockchains, and the addresses provided by these blockchains (identified by public keys) can be mapped to a valid CKB address.

**PW lib is a library of cryptographic primitives**. PW lib is used to store various types of cryptographic primitives, such as the Keccak-256 hash library for verifying Ethereum signatures, the Elliptic Curve Digital Signature Algorithm (ECDSA) Secp256r1 (NIST P-256) library, and more.

# How to use the PW SDK

### Build dApp

If you want to build a CKB dApp that runs on a multi-blockchain platform and only involves CKB and UDT transfers in the product, or needed to develop a new smart contract that can be implemented via type script without changing the lock script, then you can build your dApp directly using **PW Core** without thinking about anything else.

### Writing lock scripts

If your CKB dApp needs a new lock script, you can add new lock script logics to the **PW lock** either by modifying the **PW lock**, or by linking it with a dynamic library. Now, you need to understand the design and construction of the P**W lock**.

### Adding Cryptographic Primitives

If your product requires a new cryptographic primitive which does not currently exist in the **PW lib**, you can build and bring a library of cryptographic primitives that meet your needs into the **PW lib**.

::: warning Note
For the most part, **PW Core** already meets the needs of most CKB dApps, yet it's so simple and easy to use. 

Give it a try and build a new full blockchain-compliant CKB dApp with **PW Core**.
:::
