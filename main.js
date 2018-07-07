var slides = $('#slides')
var buttons = $('#buttonWrapper>div')
var images = slides.children('img')
var current = 0

makeFakeSlides()
slides.css({ transform: 'translateX(-400px)' })
bindEvents()

$('#previous').on('click', function() {
    goToSlide(current - 1)
})
$('#next').on('click', function() {
    goToSlide(current + 1)
})

var timer = setInterval(function() {
    goToSlide(current + 1)
    smallImg(current)
}, 3000)

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        window.clearInterval(timer)
            //console.log(1111)
    } else {
        //console.log(2222)
        timer = setInterval(function() {
            goToSlide(current + 1)
            smallImg(current)
        }, 3000)
    }
})

$('.container').on('mouseenter', function() {
    window.clearInterval(timer)
}).on('mouseleave', function() {
    timer = setInterval(function() {
        goToSlide(current + 1)
        smallImg(current)
    }, 3000)
})

function makeFakeSlides() {
    var copyFirst = images.eq(0).clone(true)
    var copyLast = images.eq(images.length - 1).clone(true)
    slides.append(copyFirst);
    slides.prepend(copyLast)
}

function bindEvents() {
    $('#buttonWrapper').on('click', 'div', function(e) {
        var button = $(e.currentTarget)
        var index = button.index()
        goToSlide(index)
        smallImg(index)
    })
}

function smallImg(index) {
    buttons.eq(index).addClass('active').siblings('div').removeClass('active')
}

function goToSlide(index) {
    if (index > buttons.length - 1) {
        index = 0
    } else if (index < 0) {
        index = buttons.length - 1
    }

    //console.log('current', 'index')
    //console.log(current, index)

    if (current === buttons.length - 1 && index === 0) {
        //最后一张到第一张
        slides.css({ transform: `translateX(${-(buttons.length + 1 )*400}px)` }).
        one('transitionend', function() {
            slides.hide().offset() // .offset() 可以触发 re-layout，这是一个高级技术，删掉这行你就会发现 bug，所以只能加上
            slides.css({ transform: `translateX(${-(index + 1 )*400}px)` }).show()
        })
    } else if (current === 0 && index === buttons.length - 1) {
        //第一张到最后一张
        slides.css({ transform: 'translateX(0px)' }).
        one('transitionend', function() {
            slides.hide().offset()
            slides.css({ transform: `translateX(${-(index + 1 )*400}px)` }).show()
        })
    } else {
        slides.css({ transform: `translateX(${-(index + 1 )*400}px)` })
    }
    current = index
}