---
title: 介绍
lang: zh
---

# 关于 PW SDK

PW SDK 是一套用于构建 CKB dApps 的简洁且强大的 SDK。PW SDK 主要包含三个部分：**PW Core**，**PW lock**，**PW lib**。

* **[**PW Core**](https://github.com/lay2dev/pw-core) 是一套基于 Typescript 的前端 JS SDK**。开发者可以通过 PW Core 直接开发 CKB dApps，这些 CKB dApps 可以在所有 PW lock 支持的区块链钱包内运行（目前包括 ETH 钱包、EOS 钱包、Tron 钱包）。

* **[**PW lock**](https://github.com/lay2dev/pw-lock) 是一个通用的多链 lock script**。PW lock 能够验证来自比特币、以太坊、EOS、Tron 和其他区块链的签名，由这些区块链提供的地址（通过公钥进行识别）可以映射到一个有效的 CKB 地址。

* **PW lib 是一个密码学原语库**。PW lib 用于存放各种类型的密码学原语，比如验证以太坊签名的 Keccak-256 哈希库，椭圆曲线数字签名算法（ECDSA）Secp256r1（NIST P-256）库等等。

## 如何使用 PW SDK

#### 构建 dApp

如果您希望构建一个能够在多区块链平台运行的 CKB dApp，并且在整个产品实现的逻辑中，只涉及 CKB 和 UDT 的转账，或者需要开发新的智能合约，但是该合约可以通过 type script 实现，而不需要更改 lock script，那么您可以直接使用 **PW Core** 构建您的 dApp，而无需考虑其他内容。

#### 编写 lock script

如果您的 CKB dApp 需要重新编写 lock script，那么您可以通过修改 **PW lock**，或者通过动态库链接的方式，在 **PW lock** 的基础上加上新的 lock script 逻辑，此时您需要理解 **PW lock** 相关的设计和构造。

#### 添加密码学原语

如果您的产品需要使用新的 **PW lib** 中目前不存在的密码学原语，那么您可以基于 **PW lib** 内已有的密码学原语，重新构建符合您需求的密码学原语库。

::: warning Note
在大部分情况下，**PW Core** 已经可以满足绝大多数 CKB dApps 的需求了，而它又是如此的简洁易操作。

快来试一试吧，通过 **PW Core** 构建一款全新的适配全区块链的 CKB dApp。
:::
