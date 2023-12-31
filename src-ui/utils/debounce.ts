export function debounce(fn: any, wait: number = 1000) {
    let timer: any
    return function (...args: any) {
        if (timer) {
            clearTimeout(timer) // clear any pre-existing timer
        }
        //@ts-ignore
        const context = this // get the current context
        timer = setTimeout(() => {
            fn.apply(context, args) // call the function if time expires
        }, wait)
    }
}