'use strict'

function modulo() {
    const [a, b] = arguments
    return Math.floor(a / b)
}

const chop = function () {
    const [arr, toFind] = arguments

    const _chop = (function () {
        const [left, rigth, toFind] = arguments

        if (rigth < left)
            return -1

        const middle = left + modulo(rigth - left, 2)
        if (arr[middle] === toFind)
            return middle

        if (toFind > arr[middle]) {
            return _chop(middle + 1, rigth, toFind)
        } else {
            return _chop(left, middle - 1, toFind)
        }
    }).freeze()

    return _chop(0, arr.length - 1, toFind)

}











function isPrime(num) {

    //const n = Math.ceil(Math.sqrt(num))
    for (let i = 2; i < num - 1; i++) {
        if (num % i === 0)
            return false
    }
    return true
}


function* primes(start, end) {

    for (let i = start; i < end; i++) {
        if (isPrime(i))
            yield i
    }

}


function gap(g, m, n) {

    const p = primes(m, n)

    const last = p.next().value
    for (const prime of p) {
        if (prime - last == g) {
            return [last, prime]
        }
    }

    return null

}

const map = function (min, max, minn, maxx, val) {
    return (val - min) / (max - min) * (maxx - minn) + minn
}

function whoIsNext(names, r) {
    r -= 1
    const n = names.length
    let level = 0
    let index = 0

    while (index <= r) {
        index += n * Math.pow(2, level)
        level++
    }

    const levelSize = n * Math.pow(2, level - 1)
    index -= n * Math.pow(2, level - 1)

    const normalizedPos = r - index;
    const resIndex = Math.floor(map(0, 1, 0, n, normalizedPos / levelSize))

    return names[resIndex]

}



function solution(digits) {
    digits = digits.toString()
    let seq = digits.substring(0, 5)

    for (let i = 1; i < digits.length - 4; i++) {

        for (let j = 0; j < 5; j++) {

            if (seq[j] < digits[i + j]) {
                seq = digits.substring(i, i + 5)
                break
            } else if (seq[j] !== digits[i + j]) {
                break
            }

        }

    }
    return parseInt(seq)

}



var palindromeChainLength = function (n) {
    let i = 0
    n = n.toString();
    while (!isPalindrone(n)) {
        n = n.split('').reverse().join('')
        i++
    }

    return i
};

const isPalindrone = function (x) {
    const $isPalindrone = function (x, num) {
        if (num > x.length / 2) return true
        if (x[num] === x[x.length - num - 1]) return $isPalindrone(x, num + 1)
        return false
    }
    return $isPalindrone(x, 0)
}







const permutations = function (str) {

    const $perm = function (s) {
        const set = new Set()
        for (let i = 0; i < s.length; i++) {
            if (s.length === 0) return
            const char = s[i]
            const rest = s.slice(0, i) + s.slice(i + 1, s.length)
            for (const subPermutations of $perm(rest)) {
                set.add(char + subPermutations)
            }
        }
        return set
    }

    return $perm(str)


}


function permut(string) {
    if (string.length < 2) return string; // This is our break condition

    var permutations = []; // This array will hold our permutations

    for (var i = 0; i < string.length; i++) {
        var char = string[i];

        // Cause we don't want any duplicates:
        if (string.indexOf(char) != i) // if char was used already
            continue; // skip it this time

        var remainingString = string.slice(0, i) + string.slice(i + 1, string.length); //Note: you can concat Strings via '+' in JS

        for (var subPermutation of permut(remainingString))
            permutations.push(char + subPermutation)

    }
    return permutations;
}
const lineOverlap = (x, y) => {
    if (!(x[1] >= y[0] && y[1] >= x[0]))
        return [0, 0]

    return [Math.max(x[0], y[0]), Math.min(x[1], y[1])]
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const toFormated = x => {

    pad(Math.floor(x / 60), 2) + ':' + pad((x % 60), 2)

}

function getStartTime(schedules, duration) {

    const start = 9 * 60
    const end = 19 * 60

    const toMinutes = (x) => {
        const splited = x.split(':')
        return parseInt(splited[0]) * 60 + parseInt(splited[1])
    }

    const freeTime = (person) => {
        let s = start
        let res = []

        for (const meeting of person) {
            if (meeting[0] - s >= duration) {
                res.push([s, meeting[0]])
            }
            s = meeting[1]
        }
        if (end - s >= duration) {
            res.push([s, end])
        }
        return res
    }

    const timeLength = (time) => time[1] - time[0]


    const maped = schedules.map(person =>
        person.map(meeting =>
            meeting.map(toMinutes)
        )
    ).map(freeTime)

    const processTimes = (times1, times2) => {
        const res = []
        for (const x of times1) {
            for (const y of times2) {
                const overlap = lineOverlap(x, y)
                if (timeLength(overlap) >= duration) {
                    res.push(overlap)
                }
            }
        }
        return res
    }

    const res = maped.reduce(processTimes)
    return res.length > 0 ? toFormated(res[0][0]) : null


}




const ham = (i, j, k) => Math.pow(2, i) * Math.pow(3, j) * Math.pow(5, k)

function pascalsTriangle(n) {
    let index = 0

    const childs = []
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            childs.push([index + i, index + i + 1])
            index++
        }
    }
    const triangle = new Array(index + n)

    for (let i = 0; i < triangle.length; i++) {
        triangle[i] = 0
    }

    let s = 0;
    for (let i = 1; i < n + 1; i++) {
        triangle[s] = 1
        triangle[s + i - 1] = 1
        if (childs[s]) {

            childs[s] = [childs[s][1]]
            childs[s + i - 1] = [childs[s + i - 1][0]]

        }
        s += i
    }
    childs[0] = []

    for (let i = 0; i < childs.length; i++) {
        for (const child of childs[i]) {
            triangle[child] += triangle[i]

        }
    }

    return triangle

}





function matrix(n) {
    const res = []
    for (let i = 0; i < n; i++) {
        res.push([])
        for (let j = 0; j < n; j++) {
            res[i].push([i, j])
        }
    }
    return res
}

function sudoku(board) {

    const transpose = m => m[0].map((x, i) => m.map(x => x[i]))
    const isCorrect = x => x.map(x => new Set(x))
        .reduce((p, n, i) => n.has(i + 1) && p, true)

    const rows = isCorrect(board)
    const col = isCorrect(transpose(board))

    const s = matrix(3).map(
        xx => xx.map(y =>
            matrix(3).reduce((pp, zz) =>
                pp.concat(
                    zz.reduce((p, a) =>
                        p.concat(board[y[0] * 3 + a[0]][y[1] * 3 + a[1]]), [])
                ), [])
        )
    )
    const c = isCorrect([].concat.apply([], s))
    return rows && col && isCorrect([].concat.apply([], s))
}





function PriorityQueue(comparer) {
    let internalArray = []
    const left = x => x * 2 + 1
    const rigth = x => x * 2 + 2
    const parent = x => x % 2 === 0 ? x / 2 - 1 : Math.floor(x / 2)

    const swap = (a, b) => {
        const tmp = internalArray[a]
        internalArray[a] = internalArray[b]
        internalArray[b] = tmp
    }

    const hipifyDown = function (i) {

        let largest = i
        if (left(i) < internalArray.length)
            if (comparer(internalArray[largest], internalArray[left(i)])) {
                largest = left(i)
            }

        if (rigth(i) < internalArray.length) {
            if (comparer(internalArray[largest], internalArray[rigth(i)])) {
                largest = rigth(i)
            }
        }

        if (largest != i) {
            swap(i, largest)
            return hipifyDown(largest)
        }
    }
    const hipifyUp = (i) => {
        const p = parent(i)
        if (i === 0) return
        if (comparer(internalArray[parent(i)], internalArray[i])) {
            swap(i, parent(i))
            hipifyUp(parent(i))
        }
    }


    this.add = (x) => {
        internalArray.push(x)
        hipifyUp(internalArray.length - 1)
    }

    this.pop = () => {
        const front = internalArray[0]
        const last = internalArray[internalArray.length - 1]


        if (internalArray.length > 1) {
            internalArray[0] = last
            internalArray.pop()
            hipifyDown(0)

        } else {
            internalArray.pop()
        }

        return front
    }
    this.empty = () => internalArray.length === 0

}



function navigate(numberOfIntersections, roads, start, finish) {

    const cameFrom = new Map()
    const costSoFar = new Map()
    const queue = new PriorityQueue((x, y) => x.val > y.val)

    queue.add({
        val: 0,
        node: start
    })
    cameFrom.set(start, start)
    costSoFar.set(start, 0)

    while (!queue.empty()) {
        const current = queue.pop().node
        if (current == finish)
            break
        const roadsFromCurrent = roads.filter(x => x.from === current)

        for (const road of roadsFromCurrent) {
            const newCost = road.drivingTime + costSoFar.get(current)
            if (!costSoFar.get(road.to) || newCost < costSoFar.get(road.to)) {
                costSoFar.set(road.to, newCost)
                cameFrom.set(road.to, current)
                queue.add({
                    val: newCost,
                    node: road.to
                })
            }
        }
    }


    const res = [finish]
    let n = cameFrom.get(finish)
    if (!n) return null
    while (n != start) {
        res.push(n)
        n = cameFrom.get(n)
    }
    res.push(start)
    return res.reverse()

}



Array.prototype.removeLast = function () {
    return this.slice(0, this.length - 1)
}
const parseWitchoutBraces = (toParse, level) =>
    toParse
    .replace(/[A-Z][a-z]?(\d+)?/g, x => x + ',')
    .split(",")
    .removeLast()
    .map(x => x.match(/([A-Z][a-z]?)(\d+)?/))
    .reduce((p, c) => p.set(c[1], (+c[2] || 1) * level), new Map())

function findBracketIndex(text) {
    let c = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === '(') c++
            if (text[i] === ')') c--
                if (c === 0) {
                    return i;
                }
    }
}

const joinMaps = (x, y) => [...x].reduce((p, c) => p.set(c[0], (p.get(c[0]) || 0) + c[1]), y)

function ff(formula, level) {
    if (!formula) return new Map()

    if (formula[0] === '(') {
        let endIndex = findBracketIndex(formula)
        let nextLevel = parseInt(formula[endIndex + 1])
        if (nextLevel) {
            endIndex++
        } else {
            nextLevel = 1
        }
        return joinMaps(
            f(formula.substring(1, endIndex), nextLevel * level),
            f(formula.substring(endIndex, formula.length), level)
        )
    }

    const end = formula.indexOf('(') !== -1 ? formula.indexOf('(') : formula.length
    return joinMaps(
        parseWitchoutBraces(formula.substring(0, end), level),
        f(formula.slice(end, formula.length), level)
    )

}

function parseMolecule(formula) {
    console.log(formula.replace(/[\{|\[]/g, '(').replace(/[\}|\]]/g, ')'))
    return [...f(formula.replace(/[\{|\[]/, '(').replace(/[\}|\]]/, ')'), 1)]
        .reduce((p, c) => {
            p[c[0]] = c[1];
            return p
        }, {})
}


function parseMoleculee(formula) {
    const joinMaps = (x, y) => {
        for (const [key, val] of x) {
            y.set(key, (y.get(key) || 0) + val)
        }
        return y
    }
    // const getLevel

    // /\((.*?)\)((\d)+)?/

    const f = (toParse, currLevel) => {

        const splitIndex = toParse.indexOf('(')
        if (splitIndex === -1) return parseWitchoutBraces(toParse, currLevel)
        let [beg, next] = [toParse.slice(0, splitIndex), toParse.slice(splitIndex)]

        console.log(beg)
        console.log(next)
        let c = 0
        let index = 0
        for (let i = 0; i < next.length; i++) {
            if (next[i] === '(') c++
                if (next[i] === ')') c--
                    if (c === 0) {
                        index = i
                        break
                    }
        }
        let level = 1;
        if (!isNaN(parseInt(next[index + 1]))) {
            level = parseInt(next[index + 1])
            next = next.slice(1, index - 1)
        } else {
            next = next.slice(1, index)

        }

        console.log(index)
        console.log(level)
        console.log(next)


        return joinMaps(
            parseWitchoutBraces(beg, currLevel),
            f(next, level)
        )


        // console.log(parseWitchoutBraces(beg,currLevel))

        // const matches = 


        // map = form[7] ? joinMaps(f(form[5], count),map) : map

        // return joinMaps(f(form[5], form[6] * count), map)
    }

    const p = formula.replace(/[\{|\[]/, '(').replace(/[\}|\]]/, ')')

    return f(p, 1)
    // console.log(return)
    // const res = {}
    // for (const [key, val] of returnedMap) { res[key] = val }
    // return res
}











const findNeabours = (f, field, y, x) => [{
        index: f(y, x - 1),
        dir: 3
    },
    {
        index: f(y - 1, x),
        dir: 0
    },
    {
        index: f(y, x + 1),
        dir: 1
    },
    {
        index: f(y + 1, x),
        dir: 2
    },
]

const dirDistance = (x, y) => {
    if (x === 0 && y === 3) return 1
    if (x === 3 && y === 0) return 1

    return Math.abs(x - y)
}

function getCommands(field, power) {


    let dim = Math.sqrt(field.length)
    const to1d = (y, x) => (x < dim && y < dim && x >= 0 && y >= 0) ? y * dim + x : undefined
    const to2d = (x) => [Math.floor(x / dim), x % dim]

    const neabours = findNeabours.bind(null, to1d, field)

    const cameFrom = new Map()
    //cameFrom.set(0, {from:-1,dir:0})
    const costSoFar = new Map()
    const queue = new PriorityQueue((x, y) => x.cost > y.cost)

    queue.add({
        index: field.indexOf('S'),
        cost: 0,
        dir: 0
    })

    costSoFar.set(field.indexOf('S'), 0)

    while (!queue.empty()) {
        const current = queue.pop()
        if (field[to1d(current)] === 'T') break

        const n = to2d(current.index)
        for (const neabour of neabours(n[0], n[1])) {
            if (!(!!field[neabour.index] && field[neabour.index] !== '#')) {
                continue
            }

            const newCost = costSoFar.get(current.index) +
                dirDistance(current.dir, neabour.dir) + 1

            if (costSoFar.get(neabour.index) === undefined ||
                newCost < costSoFar.get(neabour.index)) {

                costSoFar.set(neabour.index, newCost)
                queue.add({
                    index: neabour.index,
                    cost: newCost,
                    dir: neabour.dir
                })
                cameFrom.set(neabour.index, {
                    from: current.index,
                    dir: neabour.dir
                })

            }
        }
    }


    const f = (x, y) => {
        if (x === y) return 'f'
        let dir = x > y ? 'l' : 'r';
        if (x === 0 && y === 3) dir = 'l'
        if (x === 3 && y === 0) dir = 'r'
        return dir.repeat(dirDistance(x, y)) + 'f'
    }

    let path = []
    let next = cameFrom.get(field.indexOf('T'))
    if (!next) return ['']

    while (next) {
        path
            .push(next)
        next = cameFrom.get(next.from)
    }
    path = path.reverse();

    let currentDirection = 0
    let r = ""
    for (const node of path) {
        r += f(currentDirection, node.dir)
        currentDirection = node.dir
    }

    if (r.length > power) return ['']
    return r.split('')
}

function removeLeadingZeros(x) {
    if (x[0] === '0') return removeLeadingZeros(x.slice(1))
    return x
}

function multiply(a, b) {
    a = removeLeadingZeros(a).split('').reverse().map(x => +x)
    b = removeLeadingZeros(b).split('').reverse().map(x => +x)

    const products = []
    for (const aItem of a) {
        let acc = 0
        const currentProduct = []
        products.push(currentProduct)
        for (const bItem of b) {
            const p = aItem * bItem + acc
            acc = Math.floor(p / 10)
            currentProduct.push(p % 10)
        }
        if (acc !== 0)
            currentProduct.push(acc)
    }

    const sum = []
    for (let i = 0; i < products.length; i++) {
        for (let j = i; j < products[i].length + i; j++) {
            sum[j] = (sum[j] || 0) + (products[i][j - i] || 0)
        }
    }

    let acc = 0
    const newSum = sum.map(x => {
        const p = x + acc
        acc = Math.floor(p / 10)
        return p % 10
    })

    if (acc)
        acc.toString().split('').forEach(x => {
            newSum.push(x)

        })


    return removeLeadingZeros(newSum.reverse().join(''))

}



function brainLuck(code, input) {
    console.log(code)
    console.log(input)
    const arr = new Array(1000).fill(0)
    let ptr = 0
    let inputPtr = 0
    let output = ""
    const stack = []
    for (let i = 0; i < code.length; i++) {
        let s = false
        switch (code[i]) {
            case '>':
                ptr++;
                break
            case '<':
                ptr--;
                break
            case '+':
                arr[ptr];
                if (arr[ptr] === 255) {
                    arr[ptr] = 0
                } else {
                    arr[ptr] += 1
                }
                break;
            case '-':
                if (arr[ptr] === 0) {
                    arr[ptr] = 255
                } else {
                    arr[ptr] -= 1;
                }
            case '.':
                output += String.fromCharCode(arr[ptr]);
                break
            case ',':
                const code = input.charCodeAt(inputPtr)
                inputPtr++
                if (isNaN(code))
                    s = true
                arr[ptr] = code
                break
            case '[':
                stack.push(i);
                break;
            case ']':
                if (arr[ptr]) i = stack[stack.length - 1];
                else stack.pop()
        }
        if (s) break
    }
    return output;
}

var spiralize = function (size) {
    const m = new Array(size)
    for (let i = 0; i < size; i++) {
        m[i] = new Array(size)
        m[i].fill(0)
    }
    m[0].fill(1)
    const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ]
    let currentDir = 1
    let currentPos = [0, size - 1]


    while (size > 2) {
        for (let k = 0; k < 2; k++) {
            for (let i = 0; i < size - 1; i++) {
                currentPos = [currentPos[0] + dirs[currentDir][0],
                    currentPos[1] + dirs[currentDir][1]
                ]
                m[currentPos[0]][currentPos[1]] = 1
            }

            currentDir++
            currentDir = currentDir % 4
        }
        size -= 2
    }
    currentPos = [currentPos[0] + dirs[1][0],
        currentPos[1] + dirs[1][1]
    ]
    m[currentPos[0]][currentPos[1]] = 1

    for (let i = 0; i < m.length; i++) {
        console.log(...m[i])

    }

    return m
}



function replace(arr,what,to) { 
    let res = []
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === what) res.push(to)
        else res.push(arr[i])
        
    }
    return res
}

function Interpreter() {
    this.vars = {};
    this.functions = {};
}

const isNumeric = (n)=> !isNaN(parseFloat(n)) && isFinite(n)

Interpreter.prototype.tokenize = function (program) {
    if (program === "")
        return [];

    var regex = /\s*(=>|[-+*\/\%=\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*/g;
    return program.split(regex).filter(function (s) {
        return !s.match(/^\s*$/);
    });
};


Interpreter.prototype.input = function (expr) {
    const tokens = this.tokenize(expr);
    if(tokens.length === 0 ) return ''
    if (tokens[0] === 'fn') {
        this.parseFunction(tokens.slice(1, tokens.length))
        return ''
    }
    else if (this.functions[tokens[0]]) {
        const f = this.functions[tokens[0]]
        if (isNumeric(tokens[f.virables.length+1])
            || this.vars[tokens[f.virables.length+1]] || tokens[f.virables.length+1] ==='=' ) throw ""

        return this.getVal(this.executeFunction(f, tokens.splice(1, f.virables.length)))

    }else
    { 
        const res = this.buildTree(tokens)
        return this.getVal(res)
    }

};
Interpreter.prototype.executeFunction = function (f,virables)
{
    let res = f.body
 //   console.log(f)
    f.virables.forEach((x, index) => { 

        res = replace(res,x,this.getVal(virables[index]))
    })
   // console.log(res)
    
    return this.buildTree(res)
}


Interpreter.prototype.getVal = function (a) { 
    if (isNumeric(a)) return a
        if (this.vars[a]) return this.vars[a]
        throw ""
}

Interpreter.prototype.buildTree = function (exp) {
    if (exp.length === 1) {
        if (Number.isInteger(exp[0]))
            return parseInt(exp[0])
        return parseInt(exp[0]) || exp[0]
    }

    const func = {
        '*': (a, b) => this.getVal(a) * this.getVal(b),
        '/': (a, b) => this.getVal(a) / this.getVal(b),
        '+': (a, b) => this.getVal(a) + this.getVal(b),
        '-': (a, b) => this.getVal(a) - this.getVal(b),
        '%': (a, b) => this.getVal(a) % this.getVal(b),
        '=': function (a, b) {
            if(this.functions[a]) throw ""
            if(isNumeric(b))
                this.vars[a] = b
            else if(this.vars[b])
                this.vars[a] = vars[b]
            else throw ""
            return this.vars[a]
        } 
    }

    const index = findLast(exp)
    if (index === -1) { 
        return this.buildTree(exp.slice(1,exp.length-1))
    }
    
    return func[exp[index]].bind(this)(
        this.buildTree(exp.slice(0, index)),
        this.buildTree(exp.slice(index+1,exp.length))
    )
}


Interpreter.prototype.parseFunction = function (exp) {

    const functionName = exp[0]
    const virables = exp.slice(1, exp.indexOf('=>'))
    const body = exp.slice(exp.indexOf('=>') + 1, exp.length)

    if(new Set(virables).size !== virables.length)
        throw ""

    for (const token of body) { 
        if (!isOperator(token) && !isNumeric(token) && virables.indexOf(token) === -1)
            throw ""
    }


    if(this.vars[functionName]) throw ""
    this.functions[functionName] = {
        virables : virables,
        body : body
    }

}

const isOperator = x => x === "*"
                        || x === '/'
                        || x === '%'
                        || x === '+'
                        || x === '-'
                        || x === '='
                        || x === '('
                        || x === ')'


const findLast = (exp) => {
    const weigths = {
        '*': 1,
        '/': 1,
        '%': 1,
        '+': 2,
        '-': 2,
        '=': 3
    }

    let hWeigth = -1
    let index = -1
    let count = 0
    let eqIndex = 99999999999999999;
    for (let i = 0; i < exp.length; i++) { 
        if (exp[i] === '(') count++
        if (exp[i] === ')') count--
        if (count === 0 && weigths[exp[i]] !== undefined && weigths[exp[i]] >= hWeigth) {
            if (exp[i] === '=' && i<eqIndex ) eqIndex = i
            hWeigth = weigths[exp[i]]
            index = i
        }
    }    
    if (exp[index] === '=') return eqIndex
    return index
}









function checkWord( board, word ) {

    const find = (location,str,visited)=>{
      if(str==="") return true
      const isVisited = (x)=> visited.findIndex(y=>y[0]===x[0] && y[1]===x[1]) !== -1
      const newLocation = x=>[location[0]+x[0],location[1]+x[1]]
      
      const res = []
      for (const d of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]) {
          const newL = newLocation(d)
          const isV = isVisited(newL)
          if (newL[0] >= 0 && newL[0] < board.length
              && newL[1] >= 0 && newL[0] < board[0].length
              && !isVisited(newL)
              && str[0] === board[newL[0]][newL[1]]) {
          const visitedClone = visited.slice(0)
          visitedClone.push(newL)
          res.push(find(newL,str.slice(1),visitedClone))
        }
      }
      return res.reduce((p, c) => p || c, false)
        
  }

  const startLocations = board.map((y,yIndex)=>
                                        y.map((x,index)=>({x:x,index:[yIndex,index]}))
                                       .filter(x=>x.x===word[0])
                                       .map(x=>x.index)
                                     ).reduce((p,c)=>p.concat(c))
                                     
                                     
  for(const start of startLocations){
      if (find(start, word.slice(1), [start])) return true  
  }
  return false  
    
  
  //console.log(startLocations)
  
  
}


function removeOutsideBraces(x) { 
    if(x.length ===1 ) return x
    let c = 0
    for (let i = 0; i < x.length-1; i++) { 
        if (x[i] === '(') c++
        if (x[i] === ')') c--
        if(c===0) return x
    }
    return removeOutsideBraces(x.slice(1,x.length-1))
}

function nextOperatorIndex(tokens) { 
    const weigths = {
        '/': 0,
        '*':0,
        '+':1,
        '-':1,
    }
    let c = 0
    let currentIndex = -1;
    let currWeigth = -1;
    for (let i = 0; i < tokens.length; i++){
        if (tokens[i] === ')') c++
        if (tokens[i] === '(') c--
        if (c === 0 && currWeigth <= weigths[tokens[i]]) { 
            currentIndex = i
            currWeigth = weigths[tokens[i]]
        }
    }
    return currentIndex
}



function createTree(args, tokensOuter) { 
    return inner(tokensOuter)
    function inner(tokens) {
        tokens = removeOutsideBraces(tokens)
        if (tokens.length === 1) { 
            if (args.has(tokens[0])) {
                return { op: 'arg', 'n': args.get(tokens[0]) }
            } else { 
                return { op: 'imm', 'n': tokens[0] }                
            }
        }
        const nextOperator = nextOperatorIndex(tokens)
        return {
            op: tokens[nextOperator],
            a: inner(tokens.slice(0, nextOperator)),
            b: inner(tokens.slice(nextOperator+1,tokens.length))
        }

    }
}

function reduceConstants(tree)
{
    const operators = {
        '*': (x, y) => x * y,
        '/': (x, y) => x / y,
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
    }

    if(tree['op']==='arg' || tree['op']==='imm') return tree

    const a = reduceConstants(tree['a'])
    const b = reduceConstants(tree['b'])
    if (a['op'] === 'imm' && b['op'] === 'imm') {
        return {
            op: 'imm',
            n: operators[tree['op']](a['n'], b['n'])
        }
    } else { 
        return {
            op: tree['op'],
            a: a,
            b: b,
        }
    }

}



function Compiler() { };

Compiler.prototype.compile = function (program) {
  return this.pass3(this.pass2(this.pass1(program)));
};

Compiler.prototype.tokenize = function (program) {
  // Turn a program string into an array of tokens.  Each token
  // is either '[', ']', '(', ')', '+', '-', '*', '/', a variable
  // name or a number (as a string)
  var regex = /\s*([-+*/\(\)\[\]]|[A-Za-z]+|[0-9]+)\s*/g;
  return program.replace(regex, ":$1").substring(1).split(':').map( function (tok) {
    return isNaN(tok) ? tok : tok|0;
  });
};

Compiler.prototype.pass1 = function (program) {
    const tokens = this.tokenize(program);
    const args = new Map(tokens.slice(1, tokens.indexOf(']')).map((x, index) => [x, index]))
    return createTree(args,tokens.slice(tokens.indexOf(']')+1,tokens.length))
};

Compiler.prototype.pass2 = function (ast) {
    return reduceConstants(ast)
};

Compiler.prototype.pass3 = function (ast) {

    if (ast.op === 'arg') {
        return [`AR ${ast.n}`,'PU']
    }

    if (ast.op === 'imm') { 
        return [`IM ${ast.n}`,'PU']
    }

    const m = {
        "+":"AD",
        "-": "SU",
        "*":"MU",
        "/":"DI", 
    }

    return this.pass3(ast.a).concat(this.pass3(ast.b))
        .concat(['PO','SW','PO',m[ast.op],'PU'])
};

function test() { 
    var c = new Compiler()
    var prog = '[ x y z ] 10-(x*y)';
    const a = c.pass1(prog)
    const pas2 = c.pass2(a)
    return c.pass3(pas2)
}

function simulate(asm, args) {
      var r0 = undefined;
      var r1 = undefined;
      var stack = [];
      asm.forEach(function (instruct) {
        var match = instruct.match(/(IM|AR)\s+(\d+)/) || [ 0, instruct, 0 ];
        var ins = match[1];
        var n = match[2] | 0;

        if (ins == 'IM')   { r0 = n; }
        else if (ins == 'AR') { r0 = args[n]; }
        else if (ins == 'SW') { var tmp = r0; r0 = r1; r1 = tmp; }
        else if (ins == 'PU') { stack.push(r0); }
        else if (ins == 'PO') { r0 = stack.pop(); }
        else if (ins == 'AD') { r0 += r1; }
        else if (ins == 'SU') { r0 -= r1; }
        else if (ins == 'MU') { r0 *= r1; }
        else if (ins == 'DI') { r0 /= r1; }
      });
      return r0;
    }