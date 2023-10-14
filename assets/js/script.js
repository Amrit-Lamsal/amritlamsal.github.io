$(document).ready(function () {

  $('#menu').click(function () {
      $(this).toggleClass('fa-times');
      $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load', function () {
      $('#menu').removeClass('fa-times');
      $('.navbar').removeClass('nav-toggle');

      if (window.scrollY > 60) {
          document.querySelector('#scroll-top').classList.add('active');
      } else {
          document.querySelector('#scroll-top').classList.remove('active');
      }

      // scroll spy
      $('section').each(function () {
          let height = $(this).height();
          let offset = $(this).offset().top - 200;
          let top = $(window).scrollTop();
          let id = $(this).attr('id');

          if (top > offset && top < offset + height) {
              $('.navbar ul li a').removeClass('active');
              $('.navbar').find(`[href="#${id}"]`).addClass('active');
          }
      });
  });

  // smooth scrolling
  $('a[href*="#"]').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
          scrollTop: $($(this).attr('href')).offset().top,
      }, 500, 'linear')
  });

 // <!-- emailjs to mail contact form data -->
// Attach an input event listener to the phone field to validate and provide real-time feedback
document.getElementById('phone').addEventListener('input', function () {
  var phone = this.value;
  var phoneError = document.getElementById('phone_error');
  
  if (validatePhoneNumber(phone)) {
    phoneError.classList.add('hidden');
    this.style.borderColor = 'green';
  } else {
    phoneError.classList.remove('hidden');
    this.style.borderColor = 'red';
  }
});

document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();

  var phone = document.getElementById('phone').value;
  
  if (validatePhoneNumber(phone)) {
    // Phone number is valid, proceed to send the email
    emailjs.sendForm('default_service', 'template_1uzq9lw', this)
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        swal("Successful", "Form Submitted Successfully", "success");
        document.getElementById("contact-form").reset();
        // Reset the phone input style and error message after successful submission
        document.getElementById('phone').style.borderColor = '';
        document.getElementById('phone_error').classList.add('hidden');
      })
      .catch(function (error) {
        console.log('FAILED...', error);
        swal("Something Wrong", "Form Submission Failed! Try Again", "error");
      });
  } else {
    // Display a validation error message
    document.getElementById('phone_error').classList.remove('hidden');
  }
});

// Form validations

function validatePhoneNumber(input_str) {
  if (input_str.trim() === '') {
    return true;
  }

  // Ensure the number starts with 97 or 98 and is exactly 10 digits long
  var re = /^(97|98)\d{8}$/;
  return re.test(input_str) && input_str.replace(/[^\d]/g, '').length <= 10;
}


 // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Amrit Lamsal";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });




// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["frontend development", "backend development", "web designing", "android development", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});



/* SKILLS BUTTONS */
const $skillButtons = document.querySelectorAll(".skill-button")

function selectSkill() {
   let $skillActive = this
   if ($skillActive.classList.contains("-active")) {
      $skillActive.classList.remove("-active")
   } else {
      $skillActive.classList.add("-active")
   }
}

$skillButtons.forEach((skillItem) => {
   skillItem.addEventListener("click", selectSkill)
})

/* SERVICES MODAL */
const $cardButtons = document.querySelectorAll(".card-button")
const $serviceModals = document.querySelectorAll(".service-modal")
const $closeModals = document.querySelectorAll(".modal-close")

let modalService = (modalClick) => {
   $serviceModals[modalClick].classList.add("-active")
}

$cardButtons.forEach((cardButton, i) => {
   cardButton.addEventListener("click", () => {
      modalService(i)
   })
})

$closeModals.forEach((closeModal) => {
   closeModal.addEventListener("click", () => {
      $serviceModals.forEach((serviceModal) => {
         serviceModal.classList.remove("-active")
      })
   })
})

/* PORTFOLIO CAROUSEL */
const $portfolioCarousel = document.querySelector(".glide.portfolio-carousel")

new Glide($portfolioCarousel, {
   type: "carousel",
   gap: 0,
   startAt: 1,
   perView: 1,
   autoplay: 3000,
   hoverpause: true,
   animationDuration: 1000
}).mount()

/* TESTIMONIAL CAROUSEL */
const $testimonialCarousel = document.querySelector(".glide.testimonial-carousel")

new Glide($testimonialCarousel, {
   type: "carousel",
   gap: 60,
   startAt: 1,
   perView: 2,
   autoplay: 3000,
   hoverpause: true,
   animationDuration: 1000,
   breakpoints: {
      992: {
         gap: 60,
         perView: 1,
         peek: {
            before: 200,
            after: 200
         },
      },
      610: {
         gap: 20,
         perView: 1,
      }
   }
}).mount()


// <!--Start of Tawk.to Script-->

// var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
// (function(){
// var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
// s1.async=true;
// s1.src='https://embed.tawk.to/650567cc0f2b18434fd8d5fb/1haehqueh';
// s1.charset='UTF-8';
// s1.setAttribute('crossorigin','*');
// s0.parentNode.insertBefore(s1,s0);
// })();

// <!--End of Tawk.to Script-->


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .skill-accordion', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL PORTFOLIO*/
srtop.reveal('.portfolio .container', { delay: 400 });
srtop.reveal('.portfolio .container .glide', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });


// Particales

window.requestAnimFrame = function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback);
      }
    );
  };
  
  function init(elemid) {
    let canvas = document.getElementById(elemid),
      c = canvas.getContext("2d"),
      w = (canvas.width = window.innerWidth),
      h = (canvas.height = window.innerHeight);
    c.fillStyle = "rgba(30,30,30,1)";
    c.fillRect(0, 0, w, h);
    return { c: c, canvas: canvas };
  }
  
  window.onload = function () {
    let c = init("canvas").c,
      canvas = init("canvas").canvas,
      w = (canvas.width = window.innerWidth),
      h = (canvas.height = window.innerHeight),
      mouse = { x: false, y: false },
      last_mouse = {};
  
    function dist(p1x, p1y, p2x, p2y) {
      return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
    }
  
    class segment {
      constructor(parent, l, a, first) {
        this.first = first;
        if (first) {
          this.pos = {
            x: parent.x,
            y: parent.y
          };
        } else {
          this.pos = {
            x: parent.nextPos.x,
            y: parent.nextPos.y
          };
        }
        this.l = l;
        this.ang = a;
        this.nextPos = {
          x: this.pos.x + this.l * Math.cos(this.ang),
          y: this.pos.y + this.l * Math.sin(this.ang)
        };
      }
      update(t) {
        this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
        this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
        this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
      }
      fallback(t) {
        this.pos.x = t.x;
        this.pos.y = t.y;
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
      }
      show() {
        c.lineTo(this.nextPos.x, this.nextPos.y);
      }
    }
  
    class tentacle {
      constructor(x, y, l, n, a) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.n = n;
        this.t = {};
        this.rand = Math.random();
        this.segments = [new segment(this, this.l / this.n, 0, true)];
        for (let i = 1; i < this.n; i++) {
          this.segments.push(
            new segment(this.segments[i - 1], this.l / this.n, 0, false)
          );
        }
      }
      move(last_target, target) {
        this.angle = Math.atan2(target.y - this.y, target.x - this.x);
        this.dt = dist(last_target.x, last_target.y, target.x, target.y) + 5;
        this.t = {
          x: target.x - 0.8 * this.dt * Math.cos(this.angle),
          y: target.y - 0.8 * this.dt * Math.sin(this.angle)
        };
        if (this.t.x) {
          this.segments[this.n - 1].update(this.t);
        } else {
          this.segments[this.n - 1].update(target);
        }
        for (let i = this.n - 2; i >= 0; i--) {
          this.segments[i].update(this.segments[i + 1].pos);
        }
        if (
          dist(this.x, this.y, target.x, target.y) <=
          this.l + dist(last_target.x, last_target.y, target.x, target.y)
        ) {
          this.segments[0].fallback({ x: this.x, y: this.y });
          for (let i = 1; i < this.n; i++) {
            this.segments[i].fallback(this.segments[i - 1].nextPos);
          }
        }
      }
      show(target) {
        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
          c.globalCompositeOperation = "lighter";
          c.beginPath();
          c.lineTo(this.x, this.y);
          for (let i = 0; i < this.n; i++) {
            this.segments[i].show();
          }
          c.strokeStyle =
            "hsl(" +
            (this.rand * 60 + 180) +
            ",100%," +
            (this.rand * 60 + 25) +
            "%)";
          c.lineWidth = this.rand * 2;
          c.lineCap = "round";
          c.lineJoin = "round";
          c.stroke();
          c.globalCompositeOperation = "source-over";
        }
      }
      show2(target) {
        c.beginPath();
        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
          c.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI);
          c.fillStyle = "white";
        } else {
          c.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI);
          c.fillStyle = "darkcyan";
        }
        c.fill();
      }
    }
  
    let maxl = 300,
      minl = 50,
      n = 30,
      numt = 500,
      tent = [],
      clicked = false,
      target = { x: 0, y: 0 },
      last_target = {},
      t = 0,
      q = 10;
  
    for (let i = 0; i < numt; i++) {
      tent.push(
        new tentacle(
          Math.random() * w,
          Math.random() * h,
          Math.random() * (maxl - minl) + minl,
          n,
          Math.random() * 2 * Math.PI
        )
      );
    }
    function draw() {
      if (mouse.x) {
        target.errx = mouse.x - target.x;
        target.erry = mouse.y - target.y;
      } else {
        target.errx =
          w / 2 +
          ((h / 2 - q) * Math.sqrt(2) * Math.cos(t)) /
            (Math.pow(Math.sin(t), 2) + 1) -
          target.x;
        target.erry =
          h / 2 +
          ((h / 2 - q) * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) /
            (Math.pow(Math.sin(t), 2) + 1) -
          target.y;
      }
  
      target.x += target.errx / 10;
      target.y += target.erry / 10;
  
      t += 0.01;
  
      c.beginPath();
      c.arc(
        target.x,
        target.y,
        dist(last_target.x, last_target.y, target.x, target.y) + 5,
        0,
        2 * Math.PI
      );
      c.fillStyle = "hsl(210,100%,80%)";
      c.fill();
  
      for (i = 0; i < numt; i++) {
        tent[i].move(last_target, target);
        tent[i].show2(target);
      }
      for (i = 0; i < numt; i++) {
        tent[i].show(target);
      }
      last_target.x = target.x;
      last_target.y = target.y;
    }
  
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
  
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );
  
    canvas.addEventListener("mouseleave", function (e) {
      mouse.x = false;
      mouse.y = false;
    });
  
    canvas.addEventListener(
      "mousedown",
      function (e) {
        clicked = true;
      },
      false
    );
  
    canvas.addEventListener(
      "mouseup",
      function (e) {
        clicked = false;
      },
      false
    );
  
    function loop() {
      window.requestAnimFrame(loop);
      c.clearRect(0, 0, w, h);
      draw();
    }
  
    window.addEventListener("resize", function () {
      (w = canvas.width = window.innerWidth),
        (h = canvas.height = window.innerHeight);
      loop();
    });
  
    loop();
    setInterval(loop, 1000 / 60);
  };
