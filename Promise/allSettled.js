/*
1. The allSettled is returns a promise that fulfills after all the promises are either 
    fulfilled or rejected , with an outcome of promises whether they are rejected are resolved.
2. steps:-
    ● Map the array of promises to return an object with status
    and value/error depending upon the promised settlement.
    ● Pass this map to the Promise.all to run them at once and
    return the result.
*/

const allSettled = (promises) => {
    const mappedPromises = promises.map((p) => 
        Promise.resolve(p).then(
            val => ({status:'fulfilled', value: val}),
            err => ({status:'rejected', reason: err})
        )
    )
    return Promise.all(mappedPromises)
}

const a = new Promise((resolve) => setTimeout(() => { resolve(3) },200));
const b = new Promise((resolve,reject) => reject(9));
const c = new Promise((resolve) => resolve(5));
allSettled([a, b, c]).then((val)=> {console.log(val)});
