/*
Implementation of myPromise which works as promise.
use two handlers onSuccess and onFailure and assign them to .thn .catch .finally methods
*/

const states = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2
}

class MyPromise {
    constructor(callback) {
        this.state = states.PENDING
        this.value = undefined
        this.handlers = []
        try {
            callback(this._resolve, this._reject);
        } catch (error) {
            this._reject(error)
        }
    }
    _resolve = (value) => {
        this._handleUpdate(states.FULFILLED, value)
    }
    _reject = (value) => {
        this._handleUpdate(states.REJECTED, value)
    }
    _handleUpdate = (state, value) => {
        if (state === state.PENDING) {
            return
        }
        setTimeout(() => {
            if (value instanceof MyPromise) {
                value.then(this._resolve, this._reject)
            }
            this.state = state
            this.value = value

            this._executeHandlers();
        }, 0)
    }
    _executeHandlers = () => {
        if (this.state === states.PENDING) {
            return
        }
        this.handlers.forEach((handler) => {
            if (this.state === states.FULFILLED) {
                return handler.onSuccess(this.value)
            }
            return handler.onFailure(this.value)
        })
        this.handlers = []
    }
    _addHandler = (handler) => {
        this.handlers.push(handler)
        this._executeHandlers()
    }
    then = (onSuccess, onFailure) => {
        // invoke constructor 
        // add handler
        return new MyPromise((resolve, reject) => {
            this._addHandler({
                onSuccess: (value) => {
                    if (!onSuccess) {
                        return resolve(value)
                    } try {
                        return resolve(onSuccess(value))
                    } catch (error) {
                        reject(error)
                    }
                },
                onFailure: (value) => {
                    if (!onFailure) {
                        return reject(value)
                    } try {
                        return reject(onFailure(value))
                    } catch (error) {
                        reject(error)
                    }
                }
            })
        })
    }
    // add catch hanlder
    catch = (onFailure) => {
        return this.then(null, onFailure)
    }
    finally = (callback) => {
        return new MyPromise((resolve, reject) => {
            let wasResolved;
            let value;

            this.then(val => {
                value = val
                wasResolved = true
                return callback()
            }).catch((error) => {
                value = error
                wasResolved = false
                return callback()
            })
            if (wasResolved) {
                resolve(value)
            } else {
                reject(value)
            }
        })
    }
}

const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("hello");
    }, 1000);
});
promise.then((value) => {
    console.log(value);
});