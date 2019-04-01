import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as NodeRSA from 'node-rsa';
import { SecretModel } from '../secret/model/secret.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  base64Pattern = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/i;

  constructor() { }

  encrypt(secret: SecretModel, publicKey: string): SecretModel {
    let plainSecret = secret.data;
    let iv = this.getRandomPassphrase(32)
    let passphrase = this.getRandomPassphrase(32);

    let encrypted = CryptoJS.AES.encrypt(plainSecret, passphrase, { iv: iv });
    secret.data = encrypted.toString();
    secret.passphrase = this.rsaPublicKeyEncrypt(passphrase, publicKey);

    return secret;
  }

  decrypt(secret: SecretModel, publicKey: string): SecretModel {

    let passphrase = this.rsaPublicKeyDecrypt(secret.passphrase, publicKey);
    let encryptedSecret = secret.data;

    let decrypted = CryptoJS.AES.decrypt(encryptedSecret, passphrase);
    secret.data = decrypted.toString(CryptoJS.enc.Utf8)
    secret.passphrase = passphrase;

    return secret;
  }

  isBase64(text: string): boolean {
    return this.base64Pattern.test(text);
  }

  private rsaPublicKeyEncrypt(plainText: string, publicKey: string): string {
    let pemPublicKey = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
    let key = new NodeRSA();
    key.importKey(pemPublicKey, 'pkcs8-public');
    key.setOptions({ encryptionScheme: 'pkcs1' });
    return key.encrypt(plainText, 'base64');
  }

  private rsaPublicKeyDecrypt(encrypted: string, publicKey: string): string {
    let pemPublicKey = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
    let key = new NodeRSA();
    key.importKey(pemPublicKey, 'pkcs8-public');
    key.setOptions({ encryptionScheme: 'pkcs1' });
    return key.decryptPublic(encrypted, 'utf-8');
  }

  private getRandomPassphrase(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}