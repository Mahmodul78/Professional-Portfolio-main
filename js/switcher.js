/*------------------ toggle style switcher ------------------*/

const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");

styleSwitcherToggler.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})

/*-- hide style switcher on scroll --*/
window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

/*------------------ theme colors ------------------*/

const alternateStyles = document.querySelectorAll(".alternate-style");
// console.log(alternateStyles);

function setActiveStyle(color) {
    localStorage.setItem("color", color);
    // console.log(localStorage.getItem("color"));
    changeColor();
}

function changeColor() {
    alternateStyles.forEach((style) => {
        if (localStorage.getItem("color") === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        }
        else {
            style.setAttribute("disabled", "true");
        }
    })
}

/*-- checking if 'color' key exists --*/
if (localStorage.getItem("color") !== null) {
    //     console.log("exists");
    // }
    // else{
    //     console.log("Not exists");
    // }
    changeColor();

}


//     // console.log(color);
//     // alternateStyles.forEach((style) =>{
//     //     // console.log(style);
//     //     if (color === style.getAttribute("title")) {
//     //         style.removeAttribute("disabled");
//     //     }
//     //     else{
//     //         style.setAttribute("disabled","true");
//     //     }
//     // })
// }


/*------------------ theme light & dark mode ------------------*/

const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme","dark");
    }
    else{
        localStorage.setItem("theme","light");
    }
    updateIcon();
})


function themeMode() {
    /*-- checking if 'theme' key exists --*/
    if (localStorage.getItem("theme") !== null) {
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.remove("dark");
        }
        else{
            document.body.classList.add("dark");
        }
    }
    updateIcon();
}
themeMode();


function updateIcon() {
    if (document.body.classList.contains("dark")) {
        // console.log("true");
        dayNight.querySelector("i").classList.remove("fa-moon");
        dayNight.querySelector("i").classList.add("fa-sun");
    }
    else {
        // console.log("false");
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
    }
}

// window.addEventListener("load", () =>{
//     if (document.body.classList.contains("dark")) {
//         dayNight.querySelector("i").classList.add("fa-sun");
//     }
//     else{
//         dayNight.querySelector("i").classList.add("fa-moon");
//     }
// })




/*------------------ theme light & dark mode (previous work) ------------------*/

// const dayNight = document.querySelector(".day-night");

// dayNight.addEventListener("click", () =>{
//     dayNight.querySelector("i").classList.toggle("fa-sun");
//     dayNight.querySelector("i").classList.toggle("fa-moon");
//     document.body.classList.toggle("dark");
// })

// window.addEventListener("load", () =>{
//     if (document.body.classList.contains("dark")) {
//         dayNight.querySelector("i").classList.add("fa-sun");
//     }
//     else{
//         dayNight.querySelector("i").classList.add("fa-moon");
//     }
// })