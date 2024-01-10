


// 0.0 (initial & unique inputs) Define an array of slides, each with an image and a tagline 
//- non optimal (separate technical logic & presentation logic)


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
	console.log("Function nextSlide called !");				// Console.log to verify if the function is called when needed
	currentIndex = (currentIndex + 1) % slidesNb  			// modulo operator % gives an integer number (rest of an euclidian division)
	displaySlide () // call function : specific slide display
}

function prevSlide () {
	console.log("Function prevSlide called !");				// Console.log to verify if the function is called when needed
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

			// basic approach not activated

    // dot.addEventListener("click", () => {
    //     currentIndex = i;
    //     displaySlide();
    // });

		// activated approach : with an event listener synchronized with the pics and dots numbers
	
		dot.addEventListener("click", () => {
			const dotNumber = i + 1; 							// Adds 1 to the index to obtain the "human" numbering
			console.log(`Click on the dot # ${dotNumber}. Image order nb : ${dotNumber}`); // Uses variable dotNumber as pics nb
			currentIndex = dotNumber - 1; 		// insures the consistency with the "machine" numbering used by currentIndex itself used by the rest of the code
			displaySlide(); // function call
		});
}

// 6. Events listeners for arrows clicks


// rightArrow.addEventListener("click", nextSlide); // basic instruction

rightArrow.addEventListener("click", function(event) {				// event listener with console.log
    console.log("Click on the right arrow", event);
    nextSlide();
});


// leftArrow.addEventListener("click", prevSlide); // basic instruction

leftArrow.addEventListener("click", function(event) {				// event listener with console.log
    console.log("Click on the left arrow", event);
    prevSlide();
});



// 4. Specific slide display function

function displaySlide() {
    const slide = slides[currentIndex];					// Retrieving the current slide from the slides array at corresponding index.
    bannerPic.src = `./assets/images/slideshow/${slide.image}`;		// Gives the path (.src) of the previously declarated constant 
																	// " bannnerPic", ${slide.image} is used to embed the value 
																	// of the image property of the  object (slide) into a 
																	// string - easier way to concatenate strings and variables.
    
	bannerTagLine.innerHTML = slide.tagLine;			// The instruction "inner" modify the previously declarated constant 
														// " bannnerTagLine" (which corresponds to the element p) and
														// assigns to it the value defined for "tagLine" in the initial declaration

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


