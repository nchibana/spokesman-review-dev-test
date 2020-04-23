/*
Interactive image slider with transitions
*/

document.addEventListener("DOMContentLoaded", function(event) {

    const data = [
        {
        name: "Jesse Tinsley",
        text: "Meet Jesse Tinsley. As a certified drone pilot, this veteran Spokesman-Review photographer often can be seen capturing beautiful aerial photographs of our region. Sometimes though, the job requires getting down with the dogs.",
        image: "images/_JESSE_TINSLEY_NEWSROOM_SCRAPBOOK_t450.jpg"
        },
        {
        name: "Jim Meehan",
        text: "Jim Meehan is no stranger to Zag Nation. As the lead writer covering the Gonzaga men's basketball team, he tells the stories behind the game and gets fans a bit closer to their favorite players.",
        image: "images/MEEHAN2_t450.jpg"
        },
        {
        name: "Don Chareunsy",
        text: "Don Chareunsy is a foodie at heart. Whether it's interviewing acclaimed chefs such as Anita Lo or heading up The Spokesman-Review's features team, Don helps tell the stories that keep the Spokane region in the know, and well-fed.",
        image: "images/DON_t450.jpg"
        },
        {
        name: "Emma Epperly",
        text: "Emma Epperly does a lot of everything. As a general assignment reporter, she is called on to cover car accidents, interview movie stars, pitch in on breaking news and take on whatever story the day presents her with.",
        image: "images/EMMA2_t450.jpg"
        },
        {
        name: "Azaria Podplesky",
        text: "Features writer Azaria Podplesky always looks for ways to entertain her readers, whether it's by highlighting the best local events in her weekly columns in 7, or by going behind the scenes and finding interesting stories to tell.",
        image: "images/AZARIA_t450.jpg"
        },
        {
        name: "Amy Edelen",
        text: "Amy Edelen knows business. As a member of The Spokesman-Review's business team, she helps readers stay informed on housing prices, unemployment, growth trends, and business deals.",
        image: "images/AMY_t450.jpg"
        },
        {
        name: "Adam Shanks",
        text: "Meet Adam Shanks, our Spokane city government reporter. Although he was raised in upstate New York, Adam is a Northwesterner at heart. He sits through City Council meetings so you don't have to.",
        image: "images/ADAM_t450.jpg"
        },
        {
        name: "Shawn Vestal",
        text: "Shawn Vestal, our resident news columnist, has held officials accountable for their misdeeds and celebrated citizens who have risen to the occasion. His work has inspired some to take action, and others to fire off letters to the editor.",
        image: "images/VESTAL3_t450.jpg"
        },
        {
        name: "Arielle Dreher",
        text: "Arielle Dreher came to The Spokesman-Review thanks to support from Report for America and the Innovia Foundation.  Her reporting on critical health issues facing residents in rural Washington and Idaho is even more vital today.",
        image: "images/ARIELLE_t450.jpg"
        },
        {
        name: "Jim Camden",
        text: "When it comes to covering government, Jim Camden is the dean. Literally. As the most veteran member of the Statehouse press corps, Jim keeps our readers well-informed on all of the action in Olympia.",
        image: "images/CAMDEN_t450.jpg"
        },
        {
        name: "Molly Quinn",
        text: "There is no artist in Spokane like Molly Quinn. Her whimsical style is instantly recognizable to readers of The Spokesman-Review. She has painted gorgeous illustrations that instantly elevate the journalism accompanying it.",
        image: "images/MOLLY_t450.jpg"
        },
        {
        name: "Rob Curley",
        text: "Spokesman-Review editor Rob Curley loves to learn about people's lives, whether it's a best-selling author or a stranger he meets downtown on his walk to lunch. It's that inquisitive nature that helps make our newspaper different than most.",
        image: "images/ROB_t450.jpg"
        }
    ]

    const bioInfo = document.getElementById("bio-info");
    const bioName = document.getElementById("bio-name");
    const bioImage = document.getElementById("bio-image");
    const bioCopy = document.getElementById("bio-copy");
    const bioLine = document.getElementById("bio-line");
    const bioGallery = document.getElementById("gallery");
    const arrImages = bioGallery.getElementsByTagName("li");
    var intervalId;
    var counter = 0;
    var timer;

    //Switch between classes
    function addClass(element, effect1, effect2){
        element.classList.toggle(effect1);
        element.classList.toggle(effect2);
    }

    //Grab next item in data array
    function rotateItems(element) {
        bioName.innerHTML = data[element].name;
        bioImage.src = data[element].image;
        bioCopy.innerHTML = data[element].text;
    }

    //Move flexbox carousel to next image
    function animateSlider() {

        if(counter < data.length-1){
            counter++;
        }
        else{
            counter = 0;
        }

        slideFromLeft(counter);
        const next = (el) => el.nextElementSibling ? el.nextElementSibling : arrImages[0];
        const el = document.getElementsByClassName('is-ref')[0];
        el.classList.remove('is-ref');
        var new_seat = next(el);
        new_seat.classList.add('is-ref');
        new_seat.style.order = "1";
        document.querySelectorAll('img').forEach(function(elem) {
            elem.classList.remove("red-outline");
          });
        new_seat.getElementsByTagName('img')[0].classList.add('red-outline');
        for (i = 2; i <= arrImages.length; i++){
            new_seat = next(new_seat);
            new_seat.style.order = `${i}`;
        }

        addClass(bioGallery, "is-set", "is-set-alt");
    };

    //Automatically play image slider
    function startAnimation(){
        intervalId = setInterval(animateSlider, 3500);
    }

    //Stop animation when user clicks on image
    function stopAnimation() {
        clearInterval(intervalId);
        bioInfo.classList.remove("moveInRight");
        bioLine.classList.remove("slideInFromLeft");
      }
    
    //Listen for clicks on images
    function addListeners(){
        for(let i=0; i < arrImages.length; i++) {
            arrImages[i].addEventListener("click", interactiveSlider, false);
        }
    }

    //Slide in transitions for bio image and info
    function slideFromLeft(imageSelected){
        
        bioInfo.classList.remove("moveInRight");
        bioLine.classList.remove("slideInFromLeft");
        bioInfo.classList.add("moveOutLeft");
        bioLine.classList.add("slideOutFromRight");
        
        setTimeout(function(){
            rotateItems(imageSelected);
            addClass(bioInfo, "moveOutLeft", "moveInRight");
            addClass(bioLine, "slideOutFromRight", "slideInFromLeft");
        }, 1000);
    }

    //Get info for each person when user clicks image
    function interactiveSlider(){
        stopAnimation();
        clearTimeout(timer);
        document.querySelectorAll('img').forEach(function(elem) {
            elem.classList.remove("red-outline");
            elem.style.scale = 1;
          });
        this.querySelectorAll('img')[0].classList.remove("hover");
        var imageId = parseInt(this.id.split('-')[1]);
        this.getElementsByTagName('img')[0].classList.add('red-outline');
        slideFromLeft(imageId);
        timer = setTimeout(startAnimation, 8000);
    };

    startAnimation();
    addListeners();

});