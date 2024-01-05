


// 0.0 (initial & unique inputs) Define an array of slides, each with an image and a tagline


const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
]

// 1.1 Get DOM elements - constants declarations
const banner = document.getElementById("banner")
const bannerPic = banner.querySelector(".banner-img")
const bannerTagLine = banner.querySelector("p") 				
const bannerDots = banner.querySelector(".dots")
const leftArrow = banner.querySelector(".arrow_left")
const rightArrow = banner.querySelector(".arrow_right")


// 1.2  Additionnal definition(s)  - constant declaration via property "lenght" which gives dynamically
//                                  the nb of the mentionned elements of the DOM (within the Object NodeList)

const slidesNb = slides.length


// 2. Index init & slides counts 

let currentIndex = 0; // current index initiliazation


// 3.  Slide Display functions 

function nextSlide () {
	currentIndex = (currentIndex + 1) % slidesNb  			// modulo operator % gives an integer number (rest of an euclidian division)
	displaySlide () // call function : specific slide display
}

function prevSlide () {
	currentIndex = (currentIndex - 1 + slidesNb) % slidesNb
	displaySlide () // call function : specific slide display
}

// 5. Bullet points synchro 

bannerDots.innerHTML = "";  					// Initialize the inner HTML of the bannerDots element to an empty string
for (let i = 0; i < slidesNb; i++) {			// Loop through each slide to create corresponding dots
	
	const dot = document.createElement("span");	// Create a new <span> element for each dot
	dot.classList.add("dot");					// Add the "dot" class to the created <span> element
	if (i === currentIndex) {					// Check if the current dot being created corresponds to the currentIndex
		dot.classList.add("dot_selected");		// If yes, add the "dot_selected" class to highlight the selected dot
	}
	bannerDots.appendChild(dot);				// Append the created <span> element (dot) to the bannerDots container
	
	// Add event listener to each dot
    dot.addEventListener("click", () => {
        currentIndex = i;
        displaySlide();
    });
}

// 6. Events listeners for arrows clicks

leftArrow.addEventListener("click", prevSlide);
rightArrow.addEventListener("click", nextSlide);


// 4. Specific slide display function

function displaySlide() {
    const slide = slides[currentIndex];
    bannerPic.src = `./assets/images/slideshow/${slide.image}`;
    bannerTagLine.innerHTML = slide.tagLine;

    // Remove dot_selected class from all dots except on the selected slide
    const dots = bannerDots.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        dot.classList.remove("dot_selected");
        if (i === currentIndex) {
            dot.classList.add("dot_selected");
        }
    });
}

// 7. Display 1st slide when page is loaded

displaySlide()


