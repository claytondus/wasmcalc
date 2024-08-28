import { add } from './adder/adder.js'
import { subtract } from './subtractor/subtractor.js'
import { multiply } from './multiplier/multiplier.component.js'
import { divide } from './divider/divider.js'

console.log(`2 + 5 from Rust is ${add(2, 5)}`)
console.log(`2 - 5 from Python is ${subtract(2, 5)}`)
console.log(`2 * 5 from Golang is ${multiply(2, 5)}`)
console.log(`2 / 5 from JavaScript is ${divide(2, 5)}`)