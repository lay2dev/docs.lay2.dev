---
title: EOS 待签名消息预处理
---

# EOS 待签名消息预处理

EOS 上支持的自定义消息签名为 [scatter.getArbitrarySignature()](https://get-scatter.com/developers/api/requestarbitrarysignature)

由于 EOS 钱包对带签名的字符串有严格的格式限制，字符串中每个单词的长度不得超过 12 个字符。为了满足这一条件，我们将在请求 EOS 钱包进行签名之前，将 messageDigest 的 hex 字符串按照每 12 个字符添加一个空格的方式进行预处理，然后再请求钱包进行签名。验证签名时也需要进行相同的预处理。

签名验证流程如下所示：

```javascript
// 以下为伪代码，实际代码为c语言编写
function spliceStr(original, idx, rem, str) {
  return original.slice(0, idx) + str + original.slice(idx + Math.abs(rem));
}
// hex for a 32-byte data
function processMessageDegiest(hex) {
  let str = hex.replace('0x', '');
  str = spliceStr(str, 12, 0, ' ');
  str = spliceStr(str, 12 * 2 + 1, 0, ' ');
  str = spliceStr(str, 12 * 3 + 2, 0, ' ');
  str = spliceStr(str, 12 * 4 + 3, 0, ' ');
  str = spliceStr(str, 12 * 5 + 4, 0, ' ');
  return str;
}
const wrappedMessageDigest = processMessageDegiest(messageDigest)
const wrappedMessageDigest2 = sha256(wrappedMessageDigest)

const pubkey = secp256k1_ecdsa_recover(signature, wrappedMessageDigest2)
if (pubkey.slice(12, 32) === lock.args){
    return 0;
}
```

1. 预处理 messageDigest，对其 hex 字符串每 12 个字符插入一个空格。然后计算处理后字符串的 sha256 hash。
2. 使用 ECDSA_RECOVER 算法从 sha256 hash 和 signature 计算出 32 位 pubkey。
3. 检测 pubkey 的后 20 位是否等于 lock args（也就是 ETH 地址)。