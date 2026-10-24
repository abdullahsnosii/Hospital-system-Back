import bcrypt from 'bcrypt'

export const hash = async (plainText, rounds = 12) => bcrypt.hash(plainText, rounds)

export const compare = async (plainText, hashed) => bcrypt.compare(plainText, hashed)
