import * as crypto from 'crypto-js';

// front
export const AES_REQUEST =
    '5C692C6571459D2BE0BE493044C8927C239C80BB78390546A45C1174C3D29BA6';
const iv_request = crypto.enc.Utf8.parse(AES_REQUEST);
export const CONFIG_AES_REQUEST: any = {
    keySize: 256 / 8,
    iv_request,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7,
};

// back
export const AES_RESPONSE = 'C4974E78A0D49BD6042DA50BC09CBE94245175E7B2304476E3403B4CFD5B0734';
const iv_response = crypto.enc.Utf8.parse(AES_RESPONSE);
export const CONFIG_AES_RESPONSE: any = {
    keySize: 256 / 8,
    iv_response,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7,
};
