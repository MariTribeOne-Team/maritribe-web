import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

const KEY_LENGTH = 64

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const derived = scryptSync(password, salt, KEY_LENGTH).toString('hex')
  return `scrypt:${salt}:${derived}`
}

export function verifyPassword(password: string, passwordHash: string) {
  const [algorithm, salt, stored] = passwordHash.split(':')
  if (algorithm !== 'scrypt' || !salt || !stored) {
    return false
  }

  const derived = scryptSync(password, salt, KEY_LENGTH)
  const storedBuffer = Buffer.from(stored, 'hex')
  if (derived.length !== storedBuffer.length) {
    return false
  }

  return timingSafeEqual(derived, storedBuffer)
}
