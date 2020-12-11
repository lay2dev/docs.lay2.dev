---
title: Ethereum Signature verified
---

# Ethereum Signature verified

In view of the fact that [EIP712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md) can show users more intuitive and safe information, pw-lock preferentially supports EIP712 related signature method [eth_signTypedData_v4](https://github.com/MetaMask/eth-sig-util/blob/11bfc0345f5fcd91b23e721c17dd32df08465d9c/index.ts#L493). However, currently only a few ETH wallets can fully support EIP712. In order to fully support the Ethereum ecosystem, pw-lock also adapts to the [personalSign](https://github.com/MetaMask/eth-sig-util/blob/11bfc0345f5fcd91b23e721c17dd32df08465d9c/index.ts#L299) signature currently supported by most Ethereum wallets.

PW-Lock script provides **two** signature verification methods: **eth_personalSign** and **eth_signTypedData_v4**.

## eth_personalSign

### hash calculation
The same hash calculation process is the same as the CKB system lock script [secp256k1_blake160_sighash_all.c](https://github.com/nervosnetwork/ckb-system-scripts/blob/master/c/secp256k1_blake160_sighash_all.c), but replace blake2b into keccak256.

### signature verification
```javascript
// pseudo code, the actual code is written in C language
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
1. Use the ECDSA_RECOVER algorithm to calculate the 32-byte pubkey from the personalHash and the signature.
2. Check if the last 20 bytes of pubkey are equal to lock args (that is, Ethereum address).

## eth_signTypedData_v4

### hash calculation
The hash calculation process is the same as the CKB system lock script, except that blake2b is replaced by keccak256.

### signature verification

```javascript
// pseudo code, the actual code is written in C language
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

```
According to the CKB transaction information, input-sum / fee / to related informations are calculated and assigned to the corresponding attribute of typedData.

### signature verification
```javascript
// pseudo code, the actual code is written in C language

const sigUtil = require('eth-sig-util')

const wrappedMessageDigest2 =  sigUtil.TypedDataUtils.sign(typedData)
const pubkey = secp256k1_ecdsa_recover(signature, wrappedMessageDigest2)
if( pubkey.slice(12,32) === lock.args){
    return 0;
}
```

1. Calculate wrappedMessageDigest2 by typedData, and use ECDSA_RECOVER algorithm to calculate 32-byte pubkey from wrappedMessageDigest2 and signature.
2. Check if the last 20 bytes of pubkey are equal to lock args (that is, Ethereum address).
