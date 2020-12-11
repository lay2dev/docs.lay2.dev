---
title: TRON 待签名消息预处理
---

# TRON 待签名消息预处理

TRON 上的自定义消息签名方式为 [tronweb.trx.sign ()](https://developers.tron.network/docs/tronlink-integration#signature) 。

签名验证流程如下所示：

```javascript
const wrappedMessageDigest = hashTronPersonalMessage(messageDigest);

/*
hashTronPersonalMessage = function(message: Buffer): Buffer {
  const prefix = Buffer.from(
    `\u0019TRON Signed Message:\n${message.length.toString()}`,
    'utf-8',
  )
  return keccak(Buffer.concat([prefix, message]))
}
*/
const pubkey = secp256k1_ecdsa_recover(signature, wrappedMessageDigest)
if (pubkey.slice(12, 32) === lock.args){
    return 0;
}
```

1. 使用 ECDSA_RECOVER 算法从 wrappedMessageDigest 和 signature 计算出 32 位 pubkey。
2. 检测 pubkey 的后 20 位是否等于 lock args（也就是 ETH 地址)。

TRON 的地址生成方式与 ETH 类似，两者可以相互转换。