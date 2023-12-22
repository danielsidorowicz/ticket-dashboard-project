fetch('/static/json/sliderFiles.json')
    .then((response) => response.json())
    .then((json) => {
        let images = json.directories
        images.unshift('../static/index.html')
        const slideshowContainer = document.querySelector('.slideshow-container')
        const dotsDiv = document.querySelector('.dots-div')
        images.forEach((element, index) => {
            const span = document.createElement('span')
            const elements = document.createElement('div')
            const mySlides = document.createElement('div')
            const img = document.createElement('img')
            const iframe = document.createElement('iframe')
            span.classList.add('dot')
            mySlides.classList.add('mySlides')
            mySlides.classList.add('fade')
            if (index === 0) {
                iframe.src = element
                iframe.style.overflow = 'hidden'
                iframe.style.width = '90vw'
                iframe.style.height = '100vh'
                iframe.style.borderRadius = '25px'
                elements.append(iframe)
                elements.style.borderRadius = '25px'
                elements.style.maxHeight = '90vh'
            } else {
                img.src = `../static/gfx/sliderImg/${element}`
                img.style.width = '90vw'
                img.style.height = '100vh'
                img.style.borderRadius = '25px'
                elements.append(img)
                elements.style.borderRadius = '25px'
                elements.style.maxHeight = '90vh'
            }
            mySlides.append(elements)
            dotsDiv.append(span)
            slideshowContainer.append(mySlides)


        })


        let slideIndex = 0;
        showSlides(slideIndex);

        function showSlides(n) {
            let i;
            let slides = document.getElementsByClassName("mySlides");
            let dots = document.getElementsByClassName("dot");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++
            if (slideIndex > slides.length) { slideIndex = 1 }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
            setTimeout(showSlides, 10000);
        }
    })
    .catch((e) => console.error(e));
