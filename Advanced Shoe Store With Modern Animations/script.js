// Getting all elements from the DOM
const imgContainer = document.querySelector(".showcase > div");
const img = document.querySelector(".showcase img");
const shadow = document.querySelector(".shadow");

const thumb = document.querySelectorAll(".thumbs img");
const titleOverlay = document.querySelector(".titleOverlay");
const title = document.querySelector(".titleText");
const desc = document.querySelector(".description");

const sizes = document.querySelectorAll(".sizes > li");
const stars = document.querySelectorAll(".stars span");
const price = document.querySelector(".price");
const colorBtn = document.querySelectorAll(".color");

const pag = document.querySelectorAll(".pag");
const prev = document.querySelector(".arr-left");
const next = document.querySelector(".arr-right");
const shoeNum = document.querySelector(".shoe-num");
const shoeTotal = document.querySelector(".shoe-total");

// Id Variables
let id = 1;
let colorType = 1;
let shoe = 1;

// Shoe Details / Data
const colors = [
  ["#ae001b", "#111111"],
  ["linear-gradient(0deg, orange, red)", "#bda08e"],
  [
    "linear-gradient(0deg, #00b8ea 0%, #e6882d 50%, #e56da6 100%)",
    "linear-gradient(0deg, #dae766, #b2afaa)"
  ]
];

const prices = ["150", "250", "175"];
console.log(prices);

const names = [
  ["Red Nike Jordan Max Aura 3", "Black Nike Jordan Max Aura 3"],
  ["Black/Orange Nike Air Max 95", "Beige/Gray Nike Air Max 95"],
  ["Colorful NIKE Jordan Delta 2 SP", "Gray NIKE Jordan Delta 2 SP"]
];

const descriptions = [
  [
    "Bring a piece of history to the city's urban streets as you walk into Nike Jordan Max Aura 3 men's sneakers. Inspired by the rich Jordanian heritage, this model has the energy of basketball shoes and a look that changes the perception of the classic style."
  ],
  [
    "Nike Air Max 95 men's sneakers move you with the strength and fluidity inspired by the anatomy of the human body. The central sole forms the basis of these sneakers, while the structured side panels give a solid and stable construction. Flexible incisions in the sole allow your feet to move naturally."
  ],
  [
    "Jordan Delta 2 SP men's basketball shoes offer a fresh and fearless approach to the characteristics you want: durability, comfort and the attitude of the Jordan brand. The first model of Delta 2 sneakers, with the same idea, received redesigned lines and modified components."
  ]
];

const ratings = [4, 5, 3];

/*====== Functions ====== */
/*======================= */
// Retriving image from folder path
function getImage(imgType, shoe, colorType, id, extension) {
  return "img/" + imgType + "/shoe" + shoe + "-" + colorType + "/img" + id + "." + extension;
}

// Reset Active State to buttons
function resetActive(element, elementClass, i) {
  for (let i = 0; i < element.length; i++) {
    element[i].classList.remove(elementClass + "-active");
  }
  element[i].classList.add(elementClass + "-active");
}

// Fire Animations
function animate(element, time, anim) {
  element.style.animation = anim;

  setTimeout(() => {
    element.style.animation = "none";
  }, time);
}

// Assign colors to color buttons
function assignColors(i, shoe) {
  colorBtn[i].style.background = colors[shoe - 1][i];
}

// Set rating by filling out stars
function resetStars(shoe) {
  for (let i = 0; i < stars.length; i++) {
    stars[i].innerText = "star_outline";
  }

  // Adding the ratings
  for (let i = 0; i < ratings[shoe]; i++) {
    stars[i].innerText = "star";
  }
}
/* ================================= */

// Changing Shoe Size
for (let i = 0; i < sizes.length; i++) {
  sizes[i].addEventListener("click", (e) => {
    resetActive(sizes, "size", i);
  });
}

/*Setting up all of the initial data for the first shoe that loads*/
shoeTotal.innerText = "0" + pag.length; /*1*/
shoeNum.innerText = "0" + shoe; /*2*/
price.innerText = "$" + prices[0]; /*3*/
resetStars(shoe - 1); /*4*/
title.innerText = names[0][0]; /*5*/
desc.innerText = descriptions[0]; /*6*/

/*Changing Images*/
for (let i = 0; i < thumb.length; i++) {
  thumb[i].addEventListener("click", (e) => {
    /*JS arrays start with 0,
    so we set the id to i + 1*/
    id = i + 1;

    /*Setting the main image to clicked thumbnail image*/
    img.src = getImage("showcase", shoe, colorType, id, "png");

    // Adding the active class to the clicked thumbnail
    resetActive(thumb, "thumb", i);

    // Adding the fade in animation on the shoe
    animate(imgContainer, 550, "fade 500ms ease-in-out");
  });
}

for (let i = 0; i < colorBtn.length; i++) {
  // Setting up colors to the color btn
  assignColors(i, shoe);

  //Changing Colors
  colorBtn[i].addEventListener("click", () => {
    //Change color type of the shoe
    colorType = i + 1;

    //Change showcase Image
    setTimeout(() => {
      img.src = getImage("showcase", shoe, colorType, id, "png");
    }, 450);

    // Change Thumbnails
    for (let i = 0; i < thumb.length; i++) {
      thumb[i].src = getImage("thumbs", shoe, colorType, i + 1, "jpg");
    }

    //Set active class to clicked button
    resetActive(colorBtn, "color", i);

    //Change the shoe title
    title.innerText = names[shoe - 1][i];

    //Adding all of the animations
    animate(img, 550, "jump 500ms ease-in-out");
    animate(shadow, 550, "shadow 500ms ease-in-out");
    animate(titleOverlay, 850, "title 800ms ease");
  });
}

/*======== Slider ==========*/
function slider(shoe) {
  //Change Showcase Image
  setTimeout(() => {
    img.src = getImage("showcase", shoe, colorType, id, "png");
  }, 600);

  //Change Thumbnails
  for (let i = 0; i < thumb.length; i++) {
    thumb[i].src = getImage("thumbs", shoe, colorType, i + 1, "jpg");
  }

  //Changing the color on the color buttons
  for (let i = 0; i < colorBtn.length; i++) {
    assignColors(i, shoe);
  }

  //Set active class to clicked button
  resetActive(pag, "pag", shoe - 1);

  //Reassign all of the shoe data
  desc.innerText = descriptions[shoe - 1];
  title.innerText = names[shoe - 1][colorType - 1];
  price.innerText = "$" + prices[shoe - 1];
  resetStars(shoe - 1);
  shoeNum.innerText = "0" + shoe;

  //Adding all of the animations
  animate(img, 1550, "replace 1.5s ease-in");
  animate(shadow, 1550, "shadow2 1.5s ease-in");
  animate(titleOverlay, 850, "title 800ms ease");
}

//Previous Shoe
prev.addEventListener("click", () => {
  // Decrement img id
  shoe--;
  /*Check if slide goes below the first,
  and reset it to the last slide*/
  if (shoe < 1) {
    shoe = pag.length;
  }
  //Run the slider function
  slider(shoe);
});

//Next Shoe
next.addEventListener("click", () => {
  //Increment img id
  shoe++;
  /*Check if slider above the slides length, and reset it to the first*/
  if (shoe > pag.length) {
    shoe = 1;
  }
  //Run the slider function
  slider(shoe);
});

//Pagination
for (let i = 0; i < pag.length; i++) {
  //Add click event for all pagination
  pag[i].addEventListener("click", () => {
    //Run the slider function
    slider(i + 1);
    //Set shoe id to clicked pagination index
    shoe = i + 1;
  });
}
