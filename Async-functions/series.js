// Execute async functions in Series

// using async-await and a for loop
const asyncSeriesExecute = async (promises) => {
    for (let promise of promises) {
        try {
            const result = await promise
            console.log(result)
        } catch (e) {
            console.log(e);
        }
    }
}

// using recursion
const asyncSeriesExecuter = (promises) => {
    const promise = promises.shift()
    promise.then((data) => {
        console.log(data)
        if (promises.length > 0) {
            asyncSeriesExecuter(promises)
        }
    })
}

// using reduce
const asyncSeriesExecuters = function (promises) {
    promises.reduce((acc, curr) => {
        return acc.then(() => {
            return curr.then(val => { console.log(val) });
        });
    }, Promise.resolve());
}

const asyncTask = function (i) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(`Completing ${i}`), 100 * i)
    });
}
const promises = [
    asyncTask(3),
    asyncTask(1),
    asyncTask(7),
    asyncTask(2),
    asyncTask(5),
];
asyncSeriesExecute(promises);