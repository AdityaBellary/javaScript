// A function that retries promises N number of times with some delay before giving final result

//delay func
const wait = ms => new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms)
})

// retry function
const retryWithDelay = async (fn, retries = 3, interval = 50, finalErr = "Retry failed") => {
    try {
        await fn()
    } catch (err) {
        if (retries <= 0) {
            throw Promise.reject(finalErr)
        }
        await wait()
        return retryWithDelay(fn, retries - 1, interval, finalErr)
    }
}

const getTestFunc = () => {
    let callCounter = 0
    return async () => {
        callCounter += 1
        if (callCounter < 5) {
            throw new Error("Not Yet")
        }
    }
}

const test = async () => {
    await retryWithDelay(getTestFunc(), 10);
    console.log('success');
    await retryWithDelay(getTestFunc(), 3);
    console.log('will fail before getting here');
}

test().catch(console.error);