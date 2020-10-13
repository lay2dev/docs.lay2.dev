---
title: 接入 EOS 钱包
lang: zh
---

# 接入 EOS 钱包

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
// connect to CKB mainnet: https://mainnet.ckb.dev/
const pwcore = await new PWCore('https://testnet.ckb.dev').init(
  new EosProvider(network), // a built-in Provider for EOS env.
  new PwCollector('https://cellapitest.ckb.pw') // a custom Collector to retrive cells from cache server.
)
```

## 常用指令

### `获取登陆地址`
获取用户当前登陆的 EOS 地址：
``` js
// get the login EOS address.
const eosAccount = PWCore.provider.address.addressString
```

### `获取对应CKB地址`
根据用户当前登陆的 EOS 地址，获取对应的 CKB 地址：
``` js
// change the login EOS address to ckb address.
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

// get balance of any EOS address.
const anyEosAddress = new Address('Any EOS address', AddressType.eos, 'lockArgs of this EOS address')
const ckbBalance = await PWCore.defaultCollector.getBalance(anyEosAddress)
```
