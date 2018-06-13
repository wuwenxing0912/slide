var slides = $('#slides')
var buttons = $('#buttonWrapper>button')
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
}, 2000)

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        window.clearInterval(timer)
    } else {
        timer = setInterval(function() {
            goToSlide(current + 1)
            smallImg(current)
        }, 2000)
    }
})

$('.container').on('mouseenter', function() {
    window.clearInterval(timer)
}).on('mouseleave', function() {
    timer = setInterval(function() {
        goToSlide(current + 1)
        smallImg(current)
    }, 2000)
})

function makeFakeSlides() {
    var copyFirst = images.eq(0).clone(true)
    var copyLast = images.eq(images.length - 1).clone(true)
    slides.append(copyFirst);
    slides.prepend(copyLast)
}

function bindEvents() {
    $('#buttonWrapper').on('click', 'button', function(e) {
        var button = $(e.currentTarget)
        var index = button.index()
        goToSlide(index)
        smallImg(index)
    })
}

function smallImg(index) {
    buttons.eq(index).addClass('active').siblings('button').removeClass('active')
}

function goToSlide(index) {
    if (index > buttons.length - 1) {
        index = 0
    } else if (index < 0) {
        index = buttons.length - 1
    }

    console.log('current', 'index')
    console.log(current, index)

    if (current === buttons.length - 1 && index === 0) {
        //最后一张到第一张
        slides.css({ transform: `translateX(${-(buttons.length + 1 )*400}px)` }).
        one('transitionend', function() {
            slides.hide().offset()
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