// function solution(n) {
//     return answer = Array(n).fill().map((v, i) => i + 1).filter((v) => v % 2 === 0).reduce((a, b) => a + b, 0)
// }
// const n = 10
// console.log(solution(n));



// function solution(angle) {
//     var answer = [0, 90, 91, 180].filter((v) => angle >= v).length
//     return answer;
// }

// const angle = 90
// console.log(solution(angle));

// function solution(numbers) {
//     var answer = numbers.reduce((a, b) => a + b, 0) / numbers.length
//     return answer;
// }

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// console.log(solution(numbers));



// const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');
// const number = Number(input[0]) // 6 

// for (let i = 1; i <= number; i++) {
//     const cases = input[i]
//     const stack = []
//     let result = "YES"
//     for (let j = 0; j < cases.length; j++) {
//         if (cases[j] === "(") {
//             stack.push(1)
//         } else {
//             if (!stack.pop()) {
//                 result = "No"
//                 break
//             }
//         }

//     }
//     if (stack.length !== 0) {
//         result = "No"
//     }
//     console.log(result)
// }


// function solution(n) {
//     var answer = Array.from(String(n),Number).reduce((a,b)=>a+b,0)
//     return answer;
// }


// const n = 123
// console.log(solution(n))

// function solution(n) {
//     var answer = Array(n).fill().map((v,i)=>i+1).filter((v)=>n%v === 0).reduce((a,b)=>a+b,0)
//     return answer;
// }


// const n = 12
// console.log(solution(n))


// function solution(n) {
//     var answer = 0
//     for(i = 1; i < n;i++){
//         if(n%i === 1){
//             return i
//         }
//     }
//     return answer;
// }


// const n = 10
// console.log(solution(n))

// function solution(x, n) {
//     var answer = [];
//     const a = Array(n).fill(x).map((v, i) => (i + 1)*v)
//     return a;
// }
// const x = 2
// const n = 5
// console.log(solution(x, n))


// function solution(n) {
//     var answer = String(n).split("").reverse().map((v)=>v *1 )
//     return answer;
// }
// const n = 12345
// console.log(solution(n))



function solution(n) {
    var answer = true;
    return answer;
}
const n = 10
console.log(solution(n))