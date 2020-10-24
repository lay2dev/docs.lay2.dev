---
title: 连接 Tron 钱包
lang: zh
---

# 接入 Tron 钱包

通过 **PW Core**，你可以非常简单地在 dApp 中实现 CKB 和 UDT（用户自定义代币 User Defined Token）的接收和转账。

用户无需安装新的加密货币钱包、无需创建新的 CKB 助记词，只需要打开已有的加密货币钱包，使用已经习惯的 ETH / EOS / Tron 钱包和地址，即可实现 CKB 的收发和转账。

## 快速接入

在你的 dApp 中，添加如下 js 代码：

``` js
import PWCore, {
  PwCollector,
  ChainID,
  Address,
  Amount,
  AddressType,
  TronProvider
} from '@lay2/pw-core'

// connect to CKB testnet: https://testnet.ckb.dev
// connect to CKB mainnet: https://mainnet.ckb.dev/
const pwcore = await new PWCore('https://testnet.ckb.dev').init(
  new TronProvider(), // a built-in Provider for Tron env.
  new PwCollector('https://cellapitest.ckb.pw') // a custom Collector to retrive cells from cache server.
)
```

## 常用指令

### `获取登陆地址`
获取用户当前登陆的 Tron 地址：
``` js
// get the login Tron address.
const tronAccount = PWCore.provider.address.addressString
```

### `获取对应CKB地址`
根据用户当前登陆的 Tron 地址，获取对应的 CKB 地址：
``` js
// change the login Tron address to ckb address.
const ckbAddress = PWCore.provider.address.toCKBAddress()
```

### `获取CKB余额`
获取当前地址的 CKB 余额：
``` js
// get the balance of current address.
const ckbBalance = await PWCore.defaultCollector.getBalance(PWCore.provider.address)
```

更加通用化的，我们可以获取任意地址的 CKB 余额：
``` js
// get balance of any CKB address.
const anyCkbAddress = new Address('Any CKB address', AddressType.ckb)
const ckbBalance = await PWCore.defaultCollector.getBalance(anyCkbAddress)

// get balance of any Tron address.
const anyTronAddress = new Address('Any Tron address', AddressType.tron)
const ckbBalance = await PWCore.defaultCollector.getBalance(anyTronAddress)
```

### `获取SUDT余额`
获取当前地址的 CKB 余额：
``` js
const sudtBalance = await PWCore.defaultCollector.getSUDTBalance(new SUDT(SUDT_ISSURER_LOCKHASH), PWCore.provider.address);
```