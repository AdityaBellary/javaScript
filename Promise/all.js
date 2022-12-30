/*
The Promise.all() accepts an array of promises and returns a promise
that resolves when all of the promises in the array are fulfilled or when
the iterable contains no promises. It rejects with the reason of the first
promise that rejects.
*/
const promiseAll = function(taskArray){
    const results = []
    let promisesCompleted = 0

    return new Promise((resolve, reject) => {
        taskArray.forEach((promise, index) => {
            // if promise passes
            console.log(promise)
            promise.then((val) => {
                results[index] = val
                promisesCompleted += 1
            if (promisesCompleted === taskArray.length){
                resolve(results)
            }
            }).catch(error => {
                reject(error)
            })
        })
    })
}

function task(time){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(time < 3000){
                reject("Rejected")
            }else{
                resolve(time)
            }
        }, time)
    })
}
const taskList = [task(6000), task(5000), task(3000)];
promiseAll(taskList)
.then(results => {
console.log("got results", results)
})
.catch(console.error);