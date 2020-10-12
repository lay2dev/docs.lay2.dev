---
title: 快速上手
lang: zh
---

# 快速上手

::: warning 前提条件
Node.js >= 8.6
:::

## 安装

我们使用 PW Core 构建 CKB dApp，当然第一步是需要安装 PW Core SDK 包：

使用 npm 进行安装

``` bash
# in your project root
npm install @lay2/pw-core --save
```

或者使用 yarn 进行安装

``` bash
# in your project root
yarn add @lay2/pw-core
```

## Hello World

让我们来看看如何用 PW Core 发送一笔 CKB 交易：

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

就是这么简单，我们已经链接到了我们常用的以太坊钱包（比如：MetaMask、imToken 等等），并且正在向尾号 `121d` 的地址发送了 100 个 CKB。