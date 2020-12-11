---
title: Introduction of PW-lock
---

# Introduction of PW-lock

Due to the flexibility of CKB scripts, various custom scripts can be supported on CKB. The [Lay2 team](https://twitter.com/Lay2dev) has developed a set of lock scripts that verify ETH/EOS/TRON signatures and browser-based Webauthn signatures, named PW-lock.

## Quick start

```bash
git submodule init
git submodule update
make install-tools
make all-via-docker
CHAIN_ID=1 cargo test --all   # Ethereum signature test
CHAIN_ID=2 cargo test --all   # EOS signature test
CHAIN_ID=3 cargo test --all   # TRON signature test
```

## Implementation Principle

### CKB Lock Script Principles

The official lock [**script secp256k1_blake160_sighash_all**](https://github.com/nervosnetwork/ckb-system-scripts/blob/master/c/secp256k1_blake160_sighash_all.c) uses the secp256k1_ecdsa_recover signature and the blake160 hash algorithm to verify the signature of the transaction, as shown below:

![image](../../image/secp256k1_blake160_sigall.png)

1. Extraction script parameters lock_args.
2. Extracts the signature from the transaction witness.
3. Calculate the message_digest of the transaction via the blake2b hash algorithm.
4. Recover the public key from message_digest and signature by calling secp256k1_ecdsa_recover.
5. Perform blake160 hash on public key and compare it with lock_args. If equals, the signature is successfully verified.

### PW-Lock Script Classification

The pw-lock script refers to the official lock script on CKB, replacing the relevant hash and signature algorithms. To move forward a single step, pw-lock implements the verification of secp256k1 and secp256r1 algorithms on the CKB based on the different application scenarios.

#### Secp256k1 Series

Ethereum/EOS/TRON wallets all support custom message signatures and process the incoming custom messages before calling the wallet private key to sign with the secp256k1 algorithm. Because all three public chain wallets support custom message signatures and the signature process is almost the same, so we centralized the signature verification logic of the three chains on the CKB into one single script [secp256k1_keccak256_sighash_all.c](https://github.com/lay2dev/pw-lock/blob/develop/c/secp256k1_keccak256_sighash_all.c).

![image](../../image/pw_lock_process.png)

The script implementation flow is as follows:

1. Extract the lock_args in the script, which uniformly uses the last 20 bytes of keccak256 hash of the public key (according to the [ETH address generation rule](https://hackernoon.com/how-to-generate-ethereum-addresses-technical-address-generation-explanation-25r3zqo)).
2. Extract chain_id and signature from transaction witness, identifies different chains by the first byte of witness.lock (1 = ETH, 2 = EOS, 3 = TRON), the remaining 65 bytes represent recoverable signature.
3. Calculate the message_digest of the transaction by using keccak256 as the hash algorithm.
4. Adapts message_digest based on different chains to get wrapped_message_digest.
5. Calling the secp256k1_ecdsa_recover to recover the public key from the wrapped_message_digest and signature.
6. Perform a keccak256hash on the public key and compare the last 20 bytes with lock_args. If they are equal, the signature is verified.

Wrapped_message_digest is obtained based on message_digest, which is processed using the pre-processing logic of the custom message signature methods supported on each chain in order to adapt different chains.

- Two custom message signatures are supported on Ethereum: [eth_personalSign](https://github.com/MetaMask/eth-sig-util#personalsign-privatekeybuffer-msgparams) and [eth_signTypedData_v4](https://docs.metamask.io/guide/signing-data.html#sign-typed-data-v4), here is [the corresponding preprocessing methods](./docs/Ethereum.md).
- The custom message signature supported on EOS is [scatter.getArbitrarySignature()](https://get-scatter.com/developers/api/requestarbitrarysignature), here is [the corresponding preprocessing methods](./docs/EOS.md).
- The custom message signature supported on TRON is [tronweb.trx.sign()](https://developers.tron.network/docs/tronlink-integration#signature), here is [the corresponding preprocessing methods](./docs/TRON.md).

#### Support for Anyone-can-pay

The secp256k1 series script also support anyone-can-pay, which is consistent with the official [anyone-can-pay](https://github.com/nervosnetwork/ckb-anyone-can-pay). The implementation script is [secp256k1_keccak256_sighash_all_acpl.c](https://github.com/lay2dev/pw-lock/blob/develop/c/secp256k1_keccak256_sighash_all_acpl.c) .

### Secp256r1 Series -- Webauthn

Since the ES256/sha256 algorithm is supported by most hardware devices, the Lay2 team implemented its authentication signature logic [secp256r1_sha256_sighash.c](https://github.com/lay2dev/pw-lock/blob/develop/c/secp256r1_sha256_sighash.c) on the CKB.  The secp256r1 authentication signature provided by the [libecc](https://github.com/ANSSI-FR/libecc) library was adopted, and the Lay2 team [optimized it](https://github.com/lay2dev/libecc.gi) for migration to the CKB.

Referring to the [example](https://webauthn.guide/#authentication) of webauthn authorization validation, the challenge is passed as a variable random value before signing, and the result after signing contains clientDataJSON and authenticatorData to aid in signature validation.

Example of invoking a signature script by a Webauthn support browser:

```javascript
const publicKeyCredentialRequestOptions = {
    challenge: Uint8Array.from(
        randomStringFromServer, c => c.charCodeAt(0)),
    allowCredentials: [{
        id: Uint8Array.from(
            credentialId, c => c.charCodeAt(0)),
        type: 'public-key',
        transports: ['usb', 'ble', 'nfc'],
    }],
    timeout: 60000,
}

const assertion = await navigator.credentials.get({
    publicKey: publicKeyCredentialRequestOptions
});
```

Example of returned results after Webauthn Authorization:

```javascript
console.log(assertion);

PublicKeyCredential {
    id: 'ADSUllKQmbqdGtpu4sjseh4cg2TxSvrbcHDTBsv4NSSX9...',
    rawId: ArrayBuffer(59),
    response: AuthenticatorAssertionResponse {
        authenticatorData: ArrayBuffer(191),
        clientDataJSON: ArrayBuffer(118),
        signature: ArrayBuffer(70),
        userHandle: ArrayBuffer(10),
    },
    type: 'public-key'
}
```

Sample of clientDataJSON:

```javascript
 {
   "type": "webauthn.get",
   "challenge": "S1TsVwxDkO4ZbNa2EJvywNWS9prOay0x_uCTIv4cHs4",
   "origin": "https://r1-demo.ckb.pw",
   "crossOrigin": false
 }
```

[Signing process of webauthn](https://w3c.github.io/webauthn/#fig-signature)

```javascript
// pseudocode
const client_data_hash = sha256(client_data_json);
const message_digest = sha256(authr_data + client_data_hash);
const signature = secp256r1_sign(message_digest, private_key);
```

Based on webauthn's unique signature logic, the basic flow of verifying webauthn signatures in a CKB script is as follows:

1. Extract the lock_args in the script. lock_args takes the first 20 bytes of sha256 hash of public key.
2. Extract signature and other relevant information from the transaction witness, like public key/signature/authr_data/client_data.
3. Verify the first 20 bytes of sha256 hash of the public key are equivalent to lock_args.
4. Calculate the message_digest of the transaction by using sha256  as the hash algorithm.
5. Verify the message_digest exists as a challenge in client_data.
6. Call libecc to verify if the signature is a valid signature based on authr_data/client_data with public key and signature.