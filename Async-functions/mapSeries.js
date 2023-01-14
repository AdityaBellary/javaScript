// similar to map function with async.

let numPromise = mapSeries([1,2,3,4,5], function (num, callback) {
    setTimeout(function(){
        num = num * 2
        console.log(num)
        if (num === 12){
            callback(true)
        }else{
            callback(null, num)
        }
    },2000)
})

numPromise.then((result) => console.log("success") + result)
.catch(() => console.log("Failed"))

