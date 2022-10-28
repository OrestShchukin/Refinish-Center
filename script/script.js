const burgerOpen = () =>{
    const body = document.body;
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav')
    const navLinks = document.querySelectorAll('.nav-link');
    const navBackgroundFull = document.querySelector('.nav-background-full');
    const navOptionMenu = document.querySelector('.nav-option-menu-selector');
    const navExploreMoreList = document.querySelector('.nav-explore-more-list');


    function navToggleClasses () {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('burger-active'); 
        navBackgroundFull.classList.toggle('nav-background-full-active');
        if(body.style.overflow == "hidden"){
            body.style.overflow = "auto"
        }
        else{body.style.overflow = "hidden";}
    };

    burger.addEventListener('click', navToggleClasses);

    navLinks.forEach((element) =>{
        if(element.classList.contains('nav-option-menu')){
            return 0;
        }
        element.addEventListener('click', navToggleClasses)
    })
    navBackgroundFull.addEventListener('click', () =>{     
        navToggleClasses();
    });

    navOptionMenu.addEventListener('click', () =>{
        navExploreMoreList.classList.toggle('nav-explore-more-list-active')
    });
    
}
burgerOpen();
// Burger code ended;

// Slider strats
const gallerySliding = () =>{
    const galleryContainerInner = document.querySelector('.gallery-container-inner');
    const galleryElements = document.querySelectorAll('.gallery-element');

    const prevBtn = document.querySelector('.gallery-button-left');
    const nextBtn = document.querySelector('.gallery-button-right');
    
    const gallerySize = galleryElements[0].clientWidth;
    console.log(`The width is ${gallerySize} px`);
    let galleryCounter = 1;
    
    let sliderInterval;
    const sliderIntervalTime = 10000; // В мілісекундах
    const galleryTransition = "all .6s ease-in-out"

    const prevImage = () => {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(nextImage, sliderIntervalTime);
        if(galleryCounter<=0){
            return 0;
        };
        galleryContainerInner.style.transition = galleryTransition;
        galleryCounter--;
        console.log(galleryCounter);
        galleryContainerInner.style.transform = 'translateX(' + (-gallerySize * galleryCounter) +'px)';
        galleryContainerInner.addEventListener('transitionend', () => {
            if(galleryCounter == 0){
                galleryContainerInner.style.transition = "none";
                galleryCounter = galleryElements.length - 2;
                galleryContainerInner.style.transform = 'translateX(' + (-gallerySize * galleryCounter) +'px)';
            } 
        })
    };
    
    const nextImage = () =>{
        clearInterval(sliderInterval);
        sliderInterval = setInterval(nextImage, sliderIntervalTime);
        if(galleryCounter >= galleryElements.length - 2){
            return 0;
        };
        galleryContainerInner.style.transition = galleryTransition;
        galleryCounter++;
        console.log(galleryCounter);
        galleryContainerInner.style.transform = 'translateX(' + (-gallerySize * galleryCounter) +'px)';
        prevBtn.addEventListener('click', prevImage);
        galleryContainerInner.addEventListener('transitionend', () =>{
            if(galleryCounter == (galleryElements.length - 2)){
                galleryContainerInner.style.transition = "none";
                galleryCounter = 0;
                galleryContainerInner.style.transform = 'translateX(' + (-gallerySize * galleryCounter) +'px)';
            }
        })
    };
    
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
    nextImage();
}
gallerySliding();
// Slider ends

const questionAndAnwer =() => {
    const qaBlockText = document.querySelectorAll('.qa-question');
    qaBlockText.forEach((element) =>{
        element.addEventListener('click', () =>{
            element.classList.toggle('qa-text-active');
            console.log("It came hereeee");
        })
        
    })
}
questionAndAnwer();


// slider triple starts
const reviewBlock = () => {
    let objectsOnPage = 2;
    if (window.innerWidth < 500){
        objectsOnPage = 1;
    }
    const reviewButtonLeft = document.querySelector('.review-button-left');
    const reviewButtonRight = document.querySelector('.review-button-right');
    const reviewContainer = document.querySelector('.review-container');
    const reviewContainerInner = document.querySelector('.review-container-inner');
    let reviewElements = document.querySelectorAll('.review-element');
    const reviewSlidingWidth = (reviewContainer.clientWidth)/objectsOnPage;
    let reviewElementsLength = reviewElements.length;

    let reviewCounter = objectsOnPage;
    // const reviewFirstDuplicate = reviewElements[0].cloneNode(true);
    // const reviewSecondDuplicate = reviewElements[1].cloneNode(true);
    // const reviewThirdDuplicate = reviewElements[2].cloneNode(true);
    // const reviewPrePreLastDuplicate  = reviewElements[reviewElements.length - 3].cloneNode(true);
    // const reviewPreLastDuplicate  = reviewElements[reviewElements.length - 2].cloneNode(true);
    // const reviewLastDuplicate = (reviewElements[reviewElements.length - 1]).cloneNode(true);
    // reviewContainerInner.prepend(reviewPrePreLastDuplicate,reviewPreLastDuplicate,reviewLastDuplicate);
    // reviewContainerInner.append(reviewFirstDuplicate,reviewSecondDuplicate,reviewThirdDuplicate);
    
    reviewElements.forEach((element)=>{
        element.style.width = `calc(var(--review-width)/${objectsOnPage})`;
    })

    function cloneElements(massive, times, containerToAppend) {
        for (let i = 0; i < times; i++) {
          let appendElement = massive[i].cloneNode(true);
          containerToAppend.append(appendElement);
        }
        for (let k = 1; k <= times;k++){
          let prependElement = massive[massive.length - k ].cloneNode(true);
          containerToAppend.prepend(prependElement);
        }
    }

    cloneElements(reviewElements, objectsOnPage, reviewContainerInner);



    let reviewInterval;
    const reviewIntervalTime = 10000;

    let reviewHeight = reviewContainerInner.clientHeight;

    reviewButtonRight.style.top = "" + reviewHeight/2 + "px";
    reviewButtonLeft.style.top = "" + reviewHeight/2 + "px";
    reviewButtonRight.style.transform = "translateY(-50%)";
    reviewButtonLeft.style.transform = "translateY(-50%)";
    
    const reviewTransition = "all .5s cubic-bezier(0.075, 0.82, 0.165, 1)";

    const reviewSlide = () => {
        reviewContainerInner.style.transform = 'translateX(' + (-reviewCounter * reviewSlidingWidth) + 'px)';
    }
    reviewSlide();
    
    const nextReviewBlock = () => {
        if (reviewCounter >= reviewElementsLength + objectsOnPage - 1){
            return 0;
        }
        clearInterval(reviewInterval);
        reviewInterval = setInterval(nextReviewBlock, reviewIntervalTime);
        reviewContainerInner.style.transition = reviewTransition;
        reviewCounter++;
        console.log(reviewCounter)
        reviewSlide();
        reviewContainerInner.addEventListener('transitionend', () =>{
            if (reviewCounter == reviewElementsLength + objectsOnPage -1){
                reviewCounter = objectsOnPage - 1;
                reviewContainerInner.style.transition = 'none';
                reviewSlide();
                return 0;
            }
        });
       
    };
    

    const previousReviewBlock = () => {
        if (reviewCounter <= 0){
            return 0;
        }
        clearInterval(reviewInterval);
        reviewInterval = setInterval(nextReviewBlock, reviewIntervalTime);
        reviewContainerInner.style.transition = reviewTransition;
        reviewCounter--;
        console.log(reviewCounter);
        reviewSlide();
        reviewContainerInner.addEventListener('transitionend', () =>{
            if (reviewCounter == 0){
                reviewCounter = (reviewElementsLength);
                reviewContainerInner.style.transition = 'none';
                reviewSlide();
            }
        })
        
    };

    reviewButtonRight.addEventListener('click', nextReviewBlock);
    reviewButtonLeft.addEventListener('click', previousReviewBlock);
    nextReviewBlock();
}
reviewBlock();

// slider triple ends
