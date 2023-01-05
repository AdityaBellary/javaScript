/*
To create observer design pattern, we need two participants, hosts and observers
Host:
1. It will maintain list of observers
2. Provides options to subscribe and unsubscribe to the observers
3. Notifies the observer when the state changes
Observer:
Has a function that gets called/invoked everytime the state changes.
*/

const Move = function (){
    this.handlers = []
    this.subscribe = function(fn){
        this.handlers.push(fn)
    }
    this.unsubscribe = function(fn){
        this.handlers = this.handlers.filter((item) => item !== fn)
    }
    this.fire = function(o, thisObj){
        const scope = thisObj || window
        console.log(scope,"scope")
        this.handlers.forEach(item => {
            item.call(scope, o)
        })
    }
}

const moveHandler1 = (item) => {
    console.log("fired " + item)
}

const moveHandler2 = (item) => {
    console.log("event " + item)
}

const move = new Move()

move.subscribe(moveHandler1)
move.fire("event#1")

move.unsubscribe(moveHandler1)
move.fire('event#2')

move.subscribe(moveHandler1)
move.subscribe(moveHandler2)
move.fire('event#3')