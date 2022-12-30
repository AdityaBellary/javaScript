/*
● It returns a promise.
● The returned promise fulfills or rejects as soon as any one of
the input promises fulfills or rejects.
● Returned promise resolves with the value of the input
promise or rejects with the reason of the input promise.
*/

const promiseRace = (taskArray) => {
    return new Promise((resolve, reject) => {
        taskArray.forEach(promise => {
            Promise.resolve(promise)
            // resolve when any one resolves
            .then(resolve, reject)
            // reject when any one reject
            .catch(reject)
        })
    })
}

const test1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'one')
})

const test2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 200, 'two')
})

const test3 = new Promise((resolve, reject) => {
    setTimeout(reject, 10, 'three')
})

promiseRace([test1, test2, test3]).then(value => {
    console.log(value)
}).catch(err => {
    console.log(err)
})