---
title: 连接以太坊钱包
lang: zh
---

# 接入以太坊钱包

通过 **PW Core**，你可以非常简单地在 dApps 中实现 CKB 和 UDT（用户自定义代币 User Defined Token）的接收和转账。

用户无需安装新的加密货币钱包、无需创建新的 CKB 助记词，只需要打开已有的加密货币钱包，使用已经习惯的 ETH / EOS / Tron 钱包和地址，即可实现 CKB 的收发和转账。

本文以接入以太坊钱包为例，描述了一系列基于 PW Core SDK 开发 CKB dApp 的基础功能，包括：地址获取、余额获取、发送交易等等。

如果您还想尝试接入其他区块链钱包，您可以前往：[EOS 钱包](./connect-to-eoswallet)，[Tron 钱包](./connect-to-tronwallet)。

## 快速接入

在你的 dApp 中，添加如下 js 代码：

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
您可以选择连接下方由 Lay2 团队提供的 CKB 节点，当然也可以选择连接自己运行的 CKB 节点。
* CKB 主网：https://mainnet.ckb.dev/
* CKB 测试网：https://testnet.ckb.dev

请注意，接口限制:
* rate: 20 req / s
* burst: 20 req / s 超出限制会收到提示为 500 的报错。
:::

## 常用指令

### `获取登陆地址`
获取用户当前登陆的以太坊地址：
``` js
// get the login eth address.
const ethAddress = PWCore.provider.address.addressString
```

### `获取对应CKB地址`
根据用户当前登陆的以太坊地址，获取对应的 CKB 地址：
``` js
// change the login eth address to ckb address.
const ckbAddress = PWCore.provider.address.toCKBAddress()
```

### `获取CKB余额`
获取当前地址的 CKB 余额：
``` js
// get balance of current address.
const ckbBalance = await PWCore.defaultCollector.getBalance(PWCore.provider.address)
```

更加通用化的，我们可以获取任意地址的 CKB 余额：
``` js
// get balance of any CKB address.
const anyCkbAddress = new Address('Any CKB address', AddressType.ckb)
const ckbBalance = await PWCore.defaultCollector.getBalance(anyCkbAddress)

// get balance of any ETH address.
const anyEthAddress = new Address('Any ETH address', AddressType.eth)
const ckbBalance = await PWCore.defaultCollector.getBalance(anyEthAddress)
```

### `获取SUDT余额`
获取当前地址的 CKB 余额：
``` js
const sudtBalance = await PWCore.defaultCollector.getSUDTBalance(new SUDT(SUDT_ISSURER_LOCKHASH), PWCore.provider.address);
```