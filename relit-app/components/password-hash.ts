import * as Crypto from 'expo-crypto'
import {CryptoDigestAlgorithm, CryptoEncoding} from 'expo-crypto'

/**
 * Hashes the password, given the password and salt.
 * @param password the password, regular ASCII
 * @param salt the salt, 256-bit hex
 */
async function hashPassword(password: string, salt: string): Promise<string> {
  // first hash password
  const digest1 = await Crypto.digestStringAsync(CryptoDigestAlgorithm.SHA256, password)

  // add salt and generate new hash
  const digest2 = await Crypto.digestStringAsync(CryptoDigestAlgorithm.SHA256, digest1+salt)

  // final hash, add secret, also encode as BASE64 instead of hex
  return await Crypto.digestStringAsync(CryptoDigestAlgorithm.SHA256, digest2+process.env.EXPO_PUBLIC_SECRET, {encoding: CryptoEncoding.BASE64})

  // Use chaining of hash instead of a password hash algorithm like argon because unable to use libraries
  // once npm install them
}

/**
 * Checks if password is equal to hashedPassword after applying the password hash algorithm used
 * @param password the password to check
 * @param hashedPassword the target password
 * @param salt the salt for the user
 */
export async function checkPassword(password: string, hashedPassword: string, salt: string): Promise<boolean> {
  return hashedPassword === await hashPassword(password, salt)
}