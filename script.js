// Contact Us Handle
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Menghentikan pengiriman form secara default

    // Mengambil nilai input dari form
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Validasi input
    if (name === "" || email === "" || message === "") {
      alert("Incorrect !");
      return;
    }

    // Membuat objek komentar baru
    var comment = {
      name: name,
      email: email,
      message: message,
    };

    // Menambahkan comment ke dalam list comment
    var commentList = document.getElementById("commentList");
    var h4 = document.createElement("h4");
    h4.textContent = comment.name;
    commentList.appendChild(h4);

    var p = document.createElement("p");
    p.textContent = comment.message;
    commentList.appendChild(p);

    // Mengosongkan input form
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";

    alert("Send Message ?");
  });

// Navbar Mobile Handle
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

/* function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("show");
} */

/* const tombolToggle = document.getElementsByClassName("tomboltoggle")[0];
const navbarLinks = document.getElementsByClassName("navibar-links")[0];

tombolToggle.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
}); */

// Category Handle
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

/* // Animasi Slide Up
// Fungsi untuk memeriksa apakah elemen masuk ke dalam viewport
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Fungsi untuk menambahkan kelas .slide-up ke gambar saat masuk ke dalam viewport
function animateImagesOnScroll() {
  const images = document.querySelectorAll("#category-section .img img");
  images.forEach((image) => {
    if (isElementInViewport(image)) {
      image.classList.add("slide-up");
    }
  });
}

// Panggil fungsi animateImagesOnScroll saat halaman dimuat dan saat scroll
window.addEventListener("load", animateImagesOnScroll);
window.addEventListener("scroll", animateImagesOnScroll); */

//=========================================================================================
// Disable Interaction Temporary
function enableInteractionAfterDelay(elementId, className, delay) {
  const element = document.getElementById(elementId);

  setTimeout(() => {
    element.classList.remove(className);
  }, delay);
}
//=========================================================================================
// Animation Slide Down Category
document.addEventListener("DOMContentLoaded", function () {
  const cardImages = document.querySelectorAll(".card .img");

  // Function to check if an element is in the viewport
  function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  // Function to toggle the animation class
  function toggleAnimation() {
    cardImages.forEach((img) => {
      if (isElementInViewport(img)) {
        img.classList.add("animate-img-category");
        enableInteractionAfterDelay(
          "category-section",
          "disable-interaction",
          2000
        );
      }
    });
  }

  // Initial check and scroll event listener
  toggleAnimation();
  window.addEventListener("scroll", toggleAnimation);
});

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/* function resetAnimation(element) {
  element.style.animation = ""; // Reset the animation
} */

function handleScrollAnimation() {
  const cardImages = document.querySelectorAll(".card .img");
  cardImages.forEach((element) => {
    if (isElementInViewport(element)) {
      element.classList.add("animate-img-category");
      enableInteractionAfterDelay(
        "category-section",
        "disable-interaction",
        2000
      );
    } /* else {
      resetAnimation(element);
    } */
  });
}

// Attach the event listener to scroll event
window.addEventListener("scroll", handleScrollAnimation);

//=========================================================================================
// Animation Number Increment
const bars = document.querySelectorAll(".bar-5");

// Fungsi untuk mengatur ulang animasi pada elemen bar
function resetAnimation(bar) {
  bar.style.width = "0%";
  bar.querySelector("h5").textContent = "0%";
}

// Fungsi untuk mengaktifkan animasi pada elemen bar
function animateBar(bar) {
  const width = parseFloat(bar.style.getPropertyValue("--width")) || 0;
  const duration = 1150; // Durasi animasi dalam milidetik
  const interval = 10; // Interval untuk mengupdate animasi dalam milidetik
  const increment = (width * interval) / duration;
  let currentWidth = 0;

  function updateWidth() {
    if (currentWidth < width) {
      currentWidth += increment;
      bar.style.width = currentWidth + "%";
      bar.querySelector("h5").textContent = Math.round(currentWidth) + "%";
      requestAnimationFrame(updateWidth);
    }
  }

  updateWidth();
}

// Buat observer untuk memantau masuknya elemen ke viewport
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        resetAnimation(bar);
        animateBar(bar);
        observer.unobserve(bar); // Hentikan pengamatan setelah animasi terpicu
      }
    });
  },
  { threshold: 1 }
);

// Tambahkan observer pada setiap elemen bar
bars.forEach((bar) => {
  observer.observe(bar);
});

//=========================================================================================
// Viewport Bar Animation Trigger
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/* function resetAnimation(element) {
    element.style.animation = ""; // Reset the animation
} */

function handleScrollAnimation() {
  const elements = document.querySelectorAll(".bar-5");
  elements.forEach((element) => {
    if (isElementInViewport(element)) {
      element.style.animation = "moveRight 2s ease-out forwards";
    } /* else {
      resetAnimation(element);
    } */
  });
}

// Attach the event listener to scroll event
window.addEventListener("scroll", handleScrollAnimation);

//=========================================================================================
// Music Play Handle
const playIcon = document.getElementById("playIcon");
const musicBar = document.getElementById("musicBar");
const musicTitle = document.getElementById("musicTitle");
const musicCdContainer = document.querySelector(".music-cd");
const audio = new Audio("assets/music/music.mp3");

let isPlaying = false;

playIcon.addEventListener("click", () => {
  isPlaying = !isPlaying;
  if (isPlaying) {
    playIcon.classList.add("zoom-in");
    setTimeout(() => {
      playIcon.classList.remove("zoom-in");
    }, 300);
    playIcon.classList.remove("fa-circle-play");
    playIcon.classList.add("fa-circle-pause");
    musicBar.classList.add("music-play");
    setTimeout(() => {
      musicCdContainer.classList.toggle("active");
    }, 400);
    setTimeout(() => {
      musicTitle.classList.toggle("active");
    }, 400);
    audio.play();
  } else {
    playIcon.classList.add("zoom-in");
    setTimeout(() => {
      playIcon.classList.remove("zoom-in");
    }, 300);
    playIcon.classList.remove("fa-circle-pause");
    setTimeout(() => {
      musicBar.classList.remove("music-play");
    }, 200);
    playIcon.classList.add("fa-circle-play");
    musicCdContainer.classList.remove("active");
    musicTitle.classList.remove("active");
    audio.pause();
  }
});
