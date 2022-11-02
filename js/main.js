/*---------------------------Nav Menu---------------------------*/

(() => {
    const hamburgerBtn = document.querySelector(".hamburger_btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu() {
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }

    function hideNavMenu() {
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }

    function fadeOutEffect() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300)
    }

    /*-- attach an event handler to document --*/
    document.addEventListener("click", (event) => {
        // console.log(event.target);
        if (event.target.classList.contains('link-item')) {
            // console.log(event.target.hash);

            /*-- make sure event.target.hash has a value before overridding default behaviour --*/
            if (event.target.hash !== "") {
                /*-- prevent default anchor click behaviour --*/
                event.preventDefault();
                const hash = event.target.hash;
                // console.log(hash);

                /*-- deactivate existing active 'section' --*/
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");

                /*-- activate new 'section' --*/
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");

                /*-- deactivate existing active navigation menu 'link-item' --*/
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");

                /*--if clicked 'link-item is contained within the navigation menu' --*/
                if (navMenu.classList.contains("open")) {

                    /*-- activate new navigation menu 'link-item' --*/
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");

                    /*-- hide navigation menu --*/
                    hideNavMenu();
                    // console.log("clicked 'link-item is contained within the navigation menu'");
                }
                else {
                    // console.log("clicked 'link-item is not contained within the navigation menu'");
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            /*-- activate new navigation menu 'link-item' --*/
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }

                /*-- add hash (#) to url --*/
                window.location.hash = hash;
            }
        }
    })

})();


/*---------------------------About Section---------------------------*/

(() => {
    const aboutSec = document.querySelector(".about-section");
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        // console.log(event.target);
        if (event.target.classList.contains("tab-items") &&
            !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");
            // console.log(target);


            /*-- deactivate existing active 'tab-items' --*/
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");

            /*-- activate new 'tab-items' --*/
            event.target.classList.add("active", "outer-shadow");

            /*-- deactivate existing active 'tab-content' --*/
            aboutSec.querySelector(".tab-content.active").classList.remove("active");

            /*-- activate new 'tab-content' --*/
            aboutSec.querySelector(target).classList.add("active");

        }
    })
})();

function bodyScrollingToggle() {
    document.body.classList.toggle("hidden-scrolling");
}




/*----------------------------portfolio filter & portfolio popup----------------------------*/

(() => {

    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        // console.log(portfolioItems);
        popup = document.querySelector(".portfolio-popup"),
        preBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

    let itemIndex, slideIndex, screenShots;


    /*---- filter portfolio items ----*/
    filterContainer.addEventListener("click", (event) => {
        // console.log(event.target);
        if (event.target.classList.contains("filter-items") &&
            !event.target.classList.contains("active")) {
            // console.log("true");

            /*-- deactivate existing active 'filter-item' --*/
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");


            /*-- activate new 'filter-item' --*/
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            // console.log(target);
            portfolioItems.forEach((item) => {
                // console.log(item);
                // console.log(item.getAttribute("data-category"));
                if (target === item.getAttribute("data-category") || target === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
        // else{
        //     console.log("false");
        // }
        // console.log(event.target);
    })


    portfolioItemsContainer.addEventListener("click", (event) => {
        // console.log(event.target.closest(".portfolio-item-inner"));
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // console.log(portfolioItem);

            /*-- get the portfolioItem index --*/
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            // console.log(itemIndex);
            screenShots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            // console.log(screenShots);


            /*-- convert screenShots into Array --*/
            screenShots = screenShots.split(",");
            if (screenShots.length === 1) {
                preBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
            else {
                preBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            // console.log(screenShots);
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow() {
        // console.log("Hello Mahmodul");
        const imgSrc = screenShots[slideIndex];
        // console.log(imgSrc);
        const popupImg = popup.querySelector(".pp-img");


        /*-- activate loader until the popupImg loaded --*/
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            /*-- deactivate loader after the popupImg loader --*/
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + "of " + screenShots.length;
    }


    /*-- next slide --*/
    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenShots.length - 1) {
            slideIndex = 0;
        }
        else {
            slideIndex++;
        }
        popupSlideshow();
        // console.log("slideIndex:" +slideIndex);
    })


    /*--  previous slide --*/
    preBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenShots.length - 1;
        }
        else {
            slideIndex--;
        }
        popupSlideshow();
        //   console.log("slideIndex:" +slideIndex);
    })



    function popupDetails() {
        /*-- if portfolio-item-details not exists --*/
        if (!portfolioItems[itemIndex].querySelector(".portfolio-items-details")) {
            projectDetailsBtn.style.display = "none";
            return; /*-- end function execution --*/
        }
        projectDetailsBtn.style.display = "block";

        /*-- get the project details --*/
        const details = portfolioItems[itemIndex].querySelector(".portfolio-items-details").innerHTML;

        /*-- set the project details --*/
        popup.querySelector(".pp-project-details").innerHTML = details;

        /*-- get the project title --*/
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        //   console.log(title);

        /*-- set the project title --*/
        popup.querySelector(".pp-title h2").innerHTML = title;

        /*-- get the project category --*/
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        // console.log(category);

        /*-- set the project category --*/
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })

    function popupDetailsToggle() {
        //   console.log("check it");
        if (projectDetailsContainer.classList.contains("active")) {
            // console.log("true");
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        }
        else {
            // console.log("false");
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }


})();



/*----------------------------testimonial slider----------------------------*/
(() => {

    const slideContainer = document.querySelector(".testi-slider-caontiner"),
        slides = slideContainer.querySelectorAll(".testi-item");
    // console.log(slides);

    slideWidth = slideContainer.offsetWidth;
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
        nextBtn = document.querySelector(".testi-slider-nav .next"),
        activeSlide = slideContainer.querySelector(".testi-item.active");

    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
    // console.log(slideIndex);

    /*-- set width of all slides --*/
    slides.forEach((slides) => {
        // console.log(slides);
        slides.style.width = slideWidth + "px";
    })

    /*-- set width of slideContainer --*/
    slideContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener("click", () => {
        if (slideIndex === slides.length - 1) {
            slideIndex = 0;
        }
        else {
            slideIndex++;
        }
        // console.log(slideIndex);
        slider();
    })

    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = slides.length - 1;
        }
        else {
            slideIndex--;
        }
        // console.log(slideIndex);
        slider();
    })

    function slider() {
        /*-- deactivate existing active slides --*/
        slideContainer.querySelector(".testi-item.active").classList.remove("active");

        /*-- activate new slide --*/
        slides[slideIndex].classList.add("active");

        slideContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
    }
    slider();

})();



/*----------------------------hide all section except active----------------------------*/

(() => {
    const sections = document.querySelectorAll(".section");
    //  console.log(sections);
    sections.forEach((section) => {
        if (!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    })
})();



/*----------------------------preloader----------------------------*/

window.addEventListener("load", ()=>{
    /*-- preloder --*/
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() =>{
        document.querySelector(".preloader").style.display ="none";
    },600)
})