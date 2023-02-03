/* Debouncing is a method or a way to execute a function when it is made
sure that no further repeated event will be triggered in a given frame
of time.
A technical example is when we search something on any eCommerce
site, we don’t want to trigger a search function and make a request to
the server as the user keeps typing each letter. We want the user to
finish typing and then wait for a specified window of time to see if the
user is not going to type anything else or has finished typing then
make the request and return the result.
Excessively invoking the function majorly hampers the performance
and is considered as one of the key hurdles.
*/

const debounce = (func, delay) => {
    let timer;

    return function (){
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(context, args), delay)
    }
}

const example = (e) => {
    console.clear();
    console.log(e.x, e.y)
}

const debounceOnMouse = debounce(example, 50)

window.addEventListener("mousemove", debounceOnMouse)