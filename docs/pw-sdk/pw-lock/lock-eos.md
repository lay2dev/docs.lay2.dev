---
title: EOS Signature verified
---

# EOS Signature verified

The custom message signature supported on EOS is [scatter.getArbitrarySignature()](https://get-scatter.com/developers/api/requestarbitrarysignature)

Since EOS wallets have strict formatting restrictions on strings with signatures, each word in a string can be no more than 12 characters. To meet this condition, we preprocess the messageDigest hex string by adding a space every 12 characters before requesting a signature from the EOS wallet. The same preprocessing is needed to verify the signature.

The signature verification process is shown below:

```javascript
// The following is pseudocode, the actual code is written in C language
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

1. Preprocess messageDigest by inserting a space every 12 characters of its hex string. Then the sha256 hash of the processed string is calculated.

2. Use the ECDSA_RECOVER algorithm to calculate the 32-bit pubkey from the sha256 hash and the signature.

3. Check if the last 20 bits of the pubkey are equal to the lock args (that is, Ethereum address).