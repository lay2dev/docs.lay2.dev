---
title: 支付 Demo 简介
lang: zh
---

# 支付 Demo 简介

我们基于 [**PW Core**](https://github.com/lay2dev/pw-core) 开发了一个简单的 CKB 和 UDT (User Defined Token) 的[支付 Demo](https://pay.lay2.dev/)。

## 连接钱包

在此 demo 中，我们提供了多种连接钱包的方式，包含了以太坊、EOS、Tron 三大生态的基础设施接入方式。其中：

* 通过以太坊接入时，用户可以选择 MetaMask，WalletConnect 和 Tor.us 三种方式接入：
    * MetaMask：包含使用 [Web3.js](https://github.com/ethereum/web3.js/) 的以太坊 dApp 浏览器，例如：MetaMask，imToken，Bitpie，TokenPocket，ABC Wallet，MathWallet 等
    * WalletConnect：包含支持 [WalletConnect](https://walletconnect.org/) 协议的加密货币钱包，例如：Trust，imToken，Huobi Wallet 等
    * Tor.us：包含 [Tor.us](https://tor.us/) 支持的社交账户登陆方式，例如：Google，Twitter，Facebook，Apple，Discord，GitHub，Link，WeChat 等

* 通过 EOS 接入时，需要选择支持 EOS dApp 的浏览器插件或者手机钱包，例如：
    * 浏览器插件：MathWallet，Leafwallet 等
    * 手机钱包：imToken，TokenPocket，Bitpie，Huobi Wallet，ABC Wallet 等

* 通过 Tron 接入时，需要选择支持 Tron dApp 的浏览器插件或者手机钱包，例如：
    * 浏览器插件：Tronlink，MathWallet 等
    * 手机钱包：imToken，TokenPocket，Bitpie，Huobi Wallet 等

## 获取信息

在用户连接钱包后，将会依次获取以下信息：
* 用户当前登陆的钱包地址，及其对应的 CKB 地址
* 当前钱包地址的 CKB 余额
* 当前钱包地址的 UDT 余额（demo 中使用 PWBTC 作为示例）

## 转账

在转账部分，您可以选择转账币种（CKB 或 UDT），然后依次输入转账地址和转账金额。

您可以使用多种格式的地址作为转账地址：
* CKB 地址
    * CKB 短地址
    * CKB 长地址
* 以太坊地址
* EOS 用户地址（仅支持 12 位的用户地址，暂不支持其他长度的地址或合约地址）
* Tron 地址

在输入完成后，点击发送，进行签名，完成签名，交易完成。