// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler


const someRandomString = 'cool string look at me!'

const reverseEachWord = (str) => {
    return str
        .split(' ')
        .map(w => w.split('').reverse().join(''))
        .join(' ')
}

const reverseString = (str) => {
    return str.split('').reverse().join('')
}

console.log(reverseEachWord(someRandomString))
console.log(reverseString(someRandomString))

const duplicate = (arr) => {
    return [ ...arr, ...arr ]
}
console.log(duplicate([1, 2, 3, 4, 5])[6]) // [1,2,3,4,5,1,2,3,4,5]

// -----------------------

const createBase = (baseNum) => {
    return (num) => {
        return baseNum + num
    }
}

var addSix = createBase(6)
console.log(addSix(10))
console.log(addSix(21))


// ----------------------

const multiply = (x) => {
    return (y) => {
        return x * y
    }
}



console.log(multiply(5)(6));


// ------------------------

for (let i = 0; i < 100; i++) {
    let sound = ''
    if (i % 3 === 0) sound = 'fizz'
    if (i % 5 === 0) sound += 'buzz'
    if (sound.length) true// console.log(`${i}:`, sound)
}


// --------------------


const str1 = 'Mary'
const str2 = 'Army'
const str3 = 'RMYA'

const isAnograms = (...args) => {
    const getSorted = (str) => {
        return str.toLowerCase().split('').sort().join('')
    }
    for(let i = 0; i < args.length; i++) {
        if (i === 0) continue
        if (getSorted(args[i]) !== getSorted(args[i - 1])) {
            return false
        }
    }
    return true
}

console.log(isAnograms(str1, str2, str3))


// ---------------

const counter = () => {
    let c = 0
    
    return {
        get: function() {
            return c
        },
        increase: function() {
            c++
        },
        decrease: function() {
            c--
        }
    }
}

const galleryCounter = counter()
const slidesCounter = counter()

galleryCounter.increase()
galleryCounter.increase()
slidesCounter.decrease()
console.log(galleryCounter.get())
console.log(slidesCounter.get())

// -------------------
let y = 1
y += typeof undefined
console.log(typeof typeof undefined)


// ----------------

class testClass {
    #privVar = '3'
    publ = 23
}

const testClassInstance = new testClass()

console.log(testClassInstance.#privVar)










