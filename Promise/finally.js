/*
1. Finally is something which is scheduled once the promise is settled irrespective 
    of it being resolved or rejected.
2. Same as try, catch has finally.. similarly promise has (resolve, reject, finally)   
*/

Promise.prototype.finally = function (callback) {
    if (typeof callback !== 'function') {
        return this.then(callback, callback);
    }
    // get the current promise or a new one
    const P = this.constructor || Promise;
    // return the promise and call the callback function
    // as soon as the promise is rejected or resolved with its value
    return this.then(
        value => P.resolve(callback()).then(() => value),
        err => P.resolve(callback()).then(() => { throw err; })
    );
};