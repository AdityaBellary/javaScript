// resolve the promises according to their priority.
// call the promises parallelly and resolve them using the value of the top priority.

function resolvePromisesWithPriority(promises) {
    promises.sort((a, b) => a.priority - b.priority)
    console.log(promises)
    let rejected = {}
    let result = {}
    let mostPriority = 0
    let taskCompleted = 0
    return new Promise((resolve, reject) => {
        promises.forEach(({ task, priority }, i) => {
            task.then((value) => {
                result[priority] = value
            }).catch((err) => {
                rejected[priority] = true
                if (priority === promises[mostPriority].priority) {
                    mostPriority++
                }
            }).finally(() => {
                if (!rejected[priority] && priority === promises[mostPriority].priority) {
                    console.log(rejected);
                    resolve(priority)
                }
                taskCompleted++
                if (taskCompleted === promises.length) {
                    reject("ALL API's Failed");
                }
            })
        })
    })
}

function createAsyncTask() {
    const value = Math.floor(Math.random() * 10)
    console.log(value);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value < 5) {
                reject()
            } else {
                resolve(value)
            }
        }, value * 100)
    })
}

const promises = [
    { task: createAsyncTask(), priority: 1 },
    { task: createAsyncTask(), priority: 4 },
    { task: createAsyncTask(), priority: 3 },
    { task: createAsyncTask(), priority: 2 }
];

resolvePromisesWithPriority(promises).then((result) => {
    console.log(result);
}, (error) => {
    console.log(error);
});