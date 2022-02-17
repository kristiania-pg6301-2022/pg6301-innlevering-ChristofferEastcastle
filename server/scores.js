import {randomBytes} from "crypto"

const token = randomBytes(48).toString('hex');
console.log(token)

const scores = new Map()

scores[token] = 2;

console.log(scores[token])

