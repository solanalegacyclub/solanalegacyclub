var odometer = {
  init: function () {
    var $odometer = $(".odometer");

    $odometer.each(function () {
      var $this = $(this),
        animationDuration = $this.data("animation-duration") || 1000,
        animationDelayStart = $this.data("animation-delay-start") || 0,
        animationEasing = $this.data("animation-easing") || "easeOutCubic",
        animationLoop = $this.data("animation-loop") || false,
        odometerValue = $this.data("animation-value").toString(),
        // fraction = $this.hasClass('last_value_fraction'),
        colCount = odometerValue.length - 1;

      // if (fraction)
      // 	colCount -= 1;

      for (i = 0; i < colCount; i++) {
        if (i % 3 == 0 && i != 0) $this.prepend('<span class="seperator"></span>');

        $this.prepend('<div class="col"><div class="col_contents"></div></div>');
      }

      $this.find(".col_contents").each(function (index) {
        var $this = $(this),
          translationValue = odometerValue.slice(index, index + 1);

        // if (fraction) {
        // 	if (index === colCount - 1) {
        // 		translationValue -= 1; // offset value by -1 because if the value is 0 there shouldn't be any translation
        // 		translationValue += odometerValue.slice(index + 1, index + 2) / 10;
        // 	}
        // }

        for (j = 0; j < 10; j++) {
          $this.append('<div class="col_number">' + j + "</div>");
        }

        var columnHeight = $this.height(),
          numberHeight = columnHeight / 10;

        $this.delay(animationDelayStart).velocity(
          {
            translateY: -Math.floor(translationValue * numberHeight),
          },
          {
            duration: animationDuration,
            easing: animationEasing,
            loop: animationLoop,
          }
        );

        animationDuration = animationDuration + 250;
      });

      // console.log("Helllloooo");
      let lastNum = document.querySelector(".col:last-child  .col_number");
      // console.log(lastNum);
    });
  },
};

let fishVid = document.getElementById("fish-vid");
let line1 = document.querySelector(".line1");
let line2 = document.querySelector(".line2");
let formula = document.querySelector("#formula");

let firstTimeOdomoeter = false;

let fishShift = 480;
// window.onscroll = () => {
// 	let pos =window.scrollY;
// 	console.log(pos);
// 	line1.getElementsByClassName.left = `${pos}px`
// }

// let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
// let hscroll = 480;

// if(window.innerWidth > 1000)
// 	hscroll = 480;
// else if(window.innerWidth < 1000 && window.innerWidth > 600)
// 	hscroll = 100;
// else if(window.innerWidth <600)
// 	hscroll = 150;

// console.log(hscroll)
// odoo.default({ el:'.js-odoo', from: '00000', to: '12121', animationDelay: 1000 });

let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// console.log(width, height);

// 1196 to 605 ==> decrease by 10%

if (width < 1196) {
  if (fishShift === 480) {
    fishShift = fishShift - 100;
    // console.log('thrth');
  }
  // document.querySelector('.about-text').style.backgroundColor = "blue";
  // console.log("yes this is workin");
}

if (width < 600) {
  if (fishShift != 200) {
    fishShift = 400;
  }
}

window.addEventListener("resize", () => {
  if (width < 1196 && width > 605) {
    if (fishShift === 480) {
      fishShift = fishShift - 100;
      // console.log("thrth");
    }
  }
});

// gsap.to(line1,{
// 	scrollTrigger : {
// 		trigger : line1,
// 		toggleActions : "restart pause reverse pause"
// 	},
// 	x : 600,
// 	duration : 2,

// })

// gsap.to(line2,{
// 	scrollTrigger : {
// 		trigger : line2,
// 		toggleActions : "restart pause reverse pause"
// 	},
// 	x : -600,
// 	duration : 2,

// })

fishDiv = document.querySelector(".extra-video-wrapper");

gsap.registerPlugin(ScrollTrigger);

gsap.to(fishDiv, {
  scrollTrigger: {
    trigger: fishDiv,
    toggleActions: "play pause resume none",
    start: "-70% 100px",
  },
  onEnter: () => {
    // console.log(fishVid.play);
    // fishVid.autoplay = true;
    fishVid.play();
    // fishVid.load();
  },
  x: fishShift,
  duration: 3,
});

// ScrollTrigger.create({
// 	trigger : fishDiv,
// 	onEnter = ()=> {
// 		console.log('fishhhhhhhhhh');
// 	}
// })

ScrollTrigger.create({
  trigger: ".odometer",
  toggleActions: "play none none none",
  start: "100px bottom",

  onEnter: () => {
    if (firstTimeOdomoeter === false) {
      odometer.init();
      firstTimeOdomoeter = true;
    }
    // console.log("entered");
  },
  // onLeave : () => {
  // 	console.log('lefttt');
  // },
  onEnterBack: () => {
    // document.querySelector('.js-odoo svg g').style.fill = '#fff';
    // console.log(document.querySelector('.js-odoo svg g'));
    // console.log('enter back');
  },
  // onLeaveBack : () => {
  // 	console.log('leaving all way');
  // }
});

// const hamburger = document.querySelector(".hamburger");
// const navLinks = document.querySelector(".nav-links");
// const links = document.querySelectorAll(".nav-links li");

// hamburger.addEventListener("click", () => {
//   navLinks.classList.toggle("open");
//   console.log('true');
// });

navLinkItems = document.querySelectorAll(".nav ul li");

navLinkItems.forEach((navLinkItem) => {
  navLinkItem.addEventListener("click", () => {
    document.querySelector(".menu-icon").toggleAttribute("checked");
  });
});

function closeMenu() {
  // console.log("menu closed");
  document.getElementById("menu-icon").checked = false;
}
