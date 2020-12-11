---
title: TRON Signature verified
---

# TRON Signature verified

The custom message signature on TRON is [tronweb.trx.sign ()](https://developers.tron.network/docs/tronlink-integration#signature).

The signature verification process is as follows:

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

1. Use the ECDSA_RECOVER algorithm to calculate the 32-byte pubkey from the wrappedMessageDigest and the signature.
2. Check if the last 20 bytes of pubkey are equal to lock args (that is, Ethereum address).

TRON's address generation is similar to Ethereum, and they are interchangeable.