import * as NodeRSA from 'node-rsa';
import * as crypto from 'crypto';
import {rethrow} from "@nestjs/core/helpers/rethrow";

export class Crypto {
    static RsaDesencryptDb(data: any) {
        const keyD = new NodeRSA(
            `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`,
        );
        return keyD.decrypt(data, 'utf8');
    }

    static RsaEencryptDb(data: any): string {
        const publicKey = `-----BEGIN PUBLIC KEY-----
MIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAgBsByKXeRmiYXZlqwqCKBor
2f/ov5fS9RS9hlf3YHXj3wVvEU0EdG1VTxdLfr3RpYsALKBQotcHCHJo0yrv+GFh
+UhJCO3sb9Uij+NeCgogAjNsmfcsBz1YuRB9FC6XmQy/2aopid5ce93049ZZk8pZ
+gt/39RfDUwdtY8SBmRpt4lYakqyyVEfWbQ2j0+3f7OkbO0FwDNP9HH/2NPp7GCN
yuiee8zS1zgg9ARPty10FDBD1lEl/pJtc9N4Wlr2hqOIKzPAimVXiJrJhBm98vDx
WlVDJ+ow/vpaKaFMGh/KwV1h2eSRqaZhHRLCjPvUKpV4QFTyQSa8u3q2e8J+gME+
qPZstiCMTCCKaafDUpHM3BHydVU6dbzWERkvauxNxb+Ak/G5OfbRXHW9UUeUdUSc
qyH79uavk8ECtY57x+pgJt7wK+cYRHd0cXyhoX0QH8dqQnAp/A/NcnEENQSpL2aN
s4UFUvB+I7rJjzgJ2AMfCmCD9MSF7ipgz3QqMXQrCfYznGvQojJyj6mq9lfZ8jSg
Y+ZrKw4abl7quQXXw1yqeMWdnPKu0RSjR0Z+lwWpGNkEAN1bJeQiJevTVo4o1g/U
e5z209xJlZ0bCWXfi1m8n7A0dvIcQv4VsrIWNiFXXIBOmZOQrB1hxFKLHv0I4k0Q
8UcoRomo5osj3Wc/iePyBQIDAQAB
-----END PUBLIC KEY-----`;

        const key = new NodeRSA();
        key.importKey(publicKey, 'pkcs8-public');
        key.setOptions({encryptionScheme: 'pkcs1'});
        const padding = crypto.constants.RSA_PKCS1_PADDING;
        const encrypted = crypto.publicEncrypt(
            {key: key.exportKey('public'), padding},
            Buffer.from(data),
        );
        const encryptedBase64 = encrypted.toString('base64');
        return encryptedBase64;
    }
}
