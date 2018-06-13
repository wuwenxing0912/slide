var n = 1
init()

var timer = setTimer()

function setTimer() {
    return setInterval(() => {

        leave(getImg(n)).one('transitionend', (e) => {
            enter($(e.currentTarget))
        });
        current(getImg(n + 1))
        n++
    }, 3000)
}


document.addEventListener('visibilitychange', function(e) {
    if (document.hidden) {
        window.clearInterval(timer)
    } else {
        timer = setTimer()
    }
})


function getImg(n) {
    return $(`.window>.images>img:nth-child(${x(n)})`)
}

function init() {
    getImg(n).addClass('current').siblings().addClass('enter')
}

function current(node) {
    return node.removeClass('enter leave').addClass('current')
}

function leave(node) {
    return node.removeClass('enter current').addClass('leave')
}

function enter(node) {
    return node.removeClass('currnet leave').addClass('enter')
}



function x(n) {
    if (n > 5) {
        n = n % 5
        if (n === 0) {
            n = 5
        }
    }
    return n
}