---
title: Ethereum 待签名消息预处理
---

# Ethereum 待签名消息预处理

鉴于 EIP712 能够为用户展示更加直观和安全的信息，pw-lock 优先支持了 EIP712 相关的签名方式 signTypedData_v4。但是 EIP712 目前只有少数的几个 ETH 钱包能够完全支持，为了能够全面支持 ETH 生态， pw-lock 同时也适配了当前绝大多数 ETH 钱包都能支持的 personalSign 签名方式。

因此，pw-lock 脚本提供了两种签名的验证方式：personalSign 和 signTypedData_v4。

## 验证签名：eth_personalSign

签名验证流程如下所示：

```javascript
// 以下为伪代码，实际代码为c语言编写
const wrappedMessageDigest = hashPersonalMessage(messageDigest)

/*
hashPersonalMessage = function(message: Buffer): Buffer {
  const prefix = Buffer.from(
    `\u0019Ethereum Signed Message:\n${message.length.toString()}`,
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

## 验证签名：eth_signTypedData_v4

签名验证流程如下所示：

```javascript
// 以下为伪代码，实际代码为c语言编写

const sigUtil = require('eth-sig-util')

const wrappedMessageDigest = hashPersonalMessage(messageDigest)
const typedData = {
    domain: {
      chainId: 1,
      name: 'ckb.pw',
      verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      version: '1'
    },

    message: {
      hash:
        '0x545529d4464064d8394c557afb06f489e7044a63984c6113385431d93dcffa1b',
      fee: '0.00100000CKB',
      'input-sum': '100.00000000CKB',
      to: [
        {
          address: 'ckb1qyqv4yga3pgw2h92hcnur7lepdfzmvg8wj7qwstnwm',
          amount: '100.00000000CKB'
        },
        {
          address:
            'ckb1qftyhqxwuxdzp5zk4rctscnrr6stjrmfjdx54v05q8t3ad3493m6mhcekrn0vk575h44ql9ry53z3gzhtc2exudxcyg',
          amount: '799.99800000CKB'
        }
      ]
    },
    primaryType: 'CKBTransaction',
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' }
      ],
      CKBTransaction: [
        { name: 'hash', type: 'bytes32' },
        { name: 'fee', type: 'string' },
        { name: 'input-sum', type: 'string' },
        { name: 'to', type: 'Output[]' }
      ],
      Output: [
        { name: 'address', type: 'string' },
        { name: 'amount', type: 'string' }
      ]
    }
}

typedData.message.hash = wrappedMessageDigest
typedData.message['input-sum'] = total_input_amount(tx)
typedData.message.fee = total_input_amount(tx) - total_output_amount(tx)
typedData.message.to = extractTxOutputsInfo(tx)

const wrappedMessageDigest2 =  sigUtil.TypedDataUtils.sign(typedData)
const pubkey = secp256k1_ecdsa_recover(signature, wrappedMessageDigest2)
if( pubkey.slice(12,32) === lock.args){
    return 0;
}
```
1. 定义 typedData，然后计算出 typedData 各属性值；
2. 根据 typedData 计算出 wrappedMessageDigest2，使用 ECDSA_RECOVER 算法从 wrappedMessageDigest2 和 Signature 计算出 32 位 pubkey；
3. 检测 pubkey 的后 20 位是否等于 lock args（也就是 ETH 地址）。



