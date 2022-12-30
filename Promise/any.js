/* 
● Function takes an array of promises as input and returns a new
promise.
● The returned promise is resolved as soon as any of the input
promises resolves.
● Else if all of the input promises are rejected then the returned
promise is rejected with the array of all the input promises
reason
*/
const promiseAny = (taskArray) => {
    let counter = 0
    const promiseErrors = new Array(taskArray.length)
    return new Promise((resolve, reject) => {
        taskArray.forEach(promise => {
            Promise.resolve(promise)
            .then(resolve)
            .catch(error => {
                promiseErrors[counter] = error
                counter += 1
                if (counter === taskArray.length){
                    reject(promiseErrors)
                }
            })
        });
    })

}

const test1 = new Promise((resolve, reject) => {
    setTimeout(reject, 500, 'one')
})

const test2 = new Promise((resolve, reject) => {
    setTimeout(reject, 600, 'two')
})

const test3 = new Promise((resolve, reject) => {
    setTimeout(reject, 300, 'three')
})

promiseAny([test1, test2, test3]).then(value => {
    console.log(value)
}).catch(err => {
    console.log(err)
})
// output = ['three', 'one', 'two']