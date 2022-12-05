Splitting();

const gnb = $("#gnb");
const header = $("#header");
const line = $("#product .line");

const visualTL = gsap.timeline();
const visualTxtAni02 = function () {
  visualTL
    .from("#main-visual .swiper-slide-active .sub .char", {
      y: -100,
      opacity: 0,
      ease: "back",
      duration: 1,
      stagger: {
        each: 0.02,
      },
    })
    .from(
      "#main-visual .swiper-slide-active .main .char",
      {
        x: 100,
        opacity: 0,
        stagger: {
          each: 0.1,
        },
      },
      ">-0.5"
    );
};

new Swiper("#main-visual .mask", {
  effect: "fade",
  initialSlide: 0,
  //loop: true,
  on: {
    slideChange: function () {
      visualTxtAniReset();
    },
    slideChangeTransitionEnd: function (swiper) {
      visualTxtAni();
    },
  },
});
visualTxtAniReset();
visualTxtAni();

// 함수를 선언한다.  function declation  문장
function visualTxtAniReset() {
  gsap.set("#main-visual li .sub .char", { opacity: 0, y: -100 });
  gsap.set("#main-visual li .main .char", { opacity: 0, x: 100 });
}
function visualTxtAni() {
  visualTL
    .to("#main-visual .swiper-slide-active .sub .char", {
      y: 0,
      opacity: 1,
      ease: "back",
      duration: 1,
      stagger: {
        each: 0.02,
      },
    })
    .to(
      "#main-visual .swiper-slide-active .main .char",
      {
        x: 0,
        opacity: 1,
        stagger: {
          each: 0.1,
        },
      },
      ">-0.5"
    );
}

// 함수 선언문
function makeCircleTxt(txt, _radius = 170, _dir = 1) {
  const circleTxt = document.querySelector(txt);
  const circleType = new CircleType(circleTxt);
  circleType.radius(_radius).dir(_dir);
}
makeCircleTxt("#business .circle-txt", 50);
makeCircleTxt("#product .circle-txt", 50);

const productTL = gsap.timeline();
const productSlider = new Swiper("#product .mask", {
  effect: "fade",
  duration: 1000,
  pagination: {
    el: "#product .pagination",
  },
  autoplay: {
    delay: 5000,
  },
  on: {
    slideChange: function (swiper) {
      //line.style.width = `${(swiper.realIndex / 6) * 100}%`;
      //gsap.set(line, { width: `${(swiper.realIndex / 6) * 100}%` });
      gsap.set(line, { scaleX: swiper.realIndex / 6 });
      gsap.set("#product li .title-box h2", { opacity: 0, y: 100 });
      gsap.set("#product li .title-box strong", { opacity: 0, y: 100 });
      gsap.set("#product li .title-box p", { opacity: 0, y: 100 });
      gsap.set("#product li .title-box a", { opacity: 0, y: 100 });
    },
    // > end기준  <  start 기준
    slideChangeTransitionEnd: function () {
      productTL
        .to("#product .swiper-slide-active .title-box h2", { opacity: 1, y: 0, ease: "back", duration: 1 })
        .to("#product .swiper-slide-active .title-box strong", { opacity: 1, y: 0, ease: "back", duration: 1 }, "<+0.15")
        .to("#product .swiper-slide-active .title-box p", { opacity: 1, y: 0, ease: "back", duration: 1 }, "<+0.15")
        .to("#product .swiper-slide-active .title-box a", { opacity: 1, y: 0, ease: "back", duration: 1 }, "<+0.15");
    },
  },
});

const btnPlay = $("#product .btn-play");
const btnPause = $("#product .btn-pause");

btnPause.on("click", function () {
  //   btnPause.style.display = "none";
  //   btnPlay.style.display = "block";
  btnPause.hide();
  btnPlay.show();
  productSlider.autoplay.stop();
});
btnPlay.on("click", function () {
  //   btnPause.style.display = "block";
  //   btnPlay.style.display = "none";
  btnPause.show();
  btnPlay.hide();
  productSlider.autoplay.start();
});

new Swiper("#business .container", {
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
    },
    1080: {
      slidesPerView: 3,
    },
  },
});

new Swiper("#news .notice-list-box", {
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
    },
    1080: {
      slidesPerView: 3,
    },
  },
});

new Swiper("#footer .mask", {
  slidesPerView: "auto",
  spaceBetween: 30,
  breakpoints: {
    480: {
      slidesPerView: 4,
    },
    640: {
      slidesPerView: 5,
    },
    1080: {
      slidesPerView: 7,
    },
  },
});

window.addEventListener("scroll", function () {
  console.log(window.scrollY);
});

const businessTL = gsap.timeline();
// prettier-ignore
businessTL.from("#business .title-box h2",{opacity:0,y:100})
                .from("#business .title-box p",{opacity:0,y:100})
                .from("#business ul li",{opacity:0,y:100,stagger:0.1})

new fullpage("#main", {
  navigation: true,
  navigationTooltips: ["intro", "business", "product", "news"],
  scrollOverflow: false,
  responsiveWidth: 1024,
  onLeave: function (origin, destination, direction, trigger) {
    console.log(origin);
    if (destination.index === 1) {
      header.addClass("color");
      businessTL.restart();
    }
    if (destination.index === 0) {
      header.removeClass("color");
      fpNav.removeClass("color");
    }
    if (destination.index !== 0) {
      fpNav.addClass("color");
    }
    if (destination.isLast) {
      fpNav.addClass("last");
    } else {
      fpNav.removeClass("last");
    }
  },
  afterLoad: function (origin, destination, direction, trigger) {
    //console.log(destination.index);
    if (destination.index === 1) {
    }
  },
});
const fpNav = $("#fp-nav");

const depth01 = $("#gnb .depth01");
const depth02 = $("#gnb .depth02");
const btnAll = $(".btn-all");

btnAll.on("click", function () {
  gnb.toggleClass("on");
  btnAll.toggleClass("on");
  depth02.stop().delay(200).slideUp();
});

depth01.on("click", function (e) {
  e.preventDefault();
  const depth02 = $(this).next();
  const siblingsDepth02 = $(this).parent().siblings().find(".depth02");
  depth02.stop().slideToggle();
  siblingsDepth02.stop().slideUp();
});
