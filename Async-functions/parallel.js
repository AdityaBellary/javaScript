// Execute async functions in parallel

function asyncParallel(tasks, callback) {
    const results = []
    let tasksCompleted = 0
    tasks.forEach(asyncTask => {
        asyncTask(value => {
            results.push(value)
            tasksCompleted++
            if (tasksCompleted >= tasks.length) {
                callback(results)
            }
        })
    })
}

function createAsyncTask() {
    const value = Math.floor(Math.random() * 10)
    console.log(20, value)
    return function (callback) {
        setTimeout(() => {
            callback(value)
        }, value * 1000)
    }
}

const taskList = [createAsyncTask(),
createAsyncTask(),
createAsyncTask(),
createAsyncTask(),
createAsyncTask(),
createAsyncTask(),
createAsyncTask(),
createAsyncTask()]

asyncParallel(taskList, result => {
    console.log('results', result);
});