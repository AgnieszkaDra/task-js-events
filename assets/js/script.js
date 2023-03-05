const init = function() {
    const imagesList = document.querySelectorAll('.gallery__item');
    imagesList.forEach( img => {
        img.dataset.sliderGroupName = Math.random() > 0.5 ? 'nice' : 'good';
    }); // za każdym przeładowaniem strony przydzielaj inną nazwę grupy dla zdjęcia
    console.log(imagesList)

    runJSSlider();
}

document.addEventListener('DOMContentLoaded', init);

const runJSSlider = function() {
    const imagesSelector = '.gallery__item';
    const sliderRootSelector = '.js-slider'; 

    const imagesList = document.querySelectorAll(imagesSelector);
    const sliderRootElement = document.querySelector(sliderRootSelector);

    initEvents(imagesList, sliderRootElement);
    initCustomEvents(imagesList, sliderRootElement, imagesSelector);
}

const initEvents = function(imagesList, sliderRootElement) {
    imagesList.forEach( function(item)  {
        item.addEventListener('click', function(e) {
            fireCustomEvent(e.currentTarget, 'js-slider-img-click');
        });
        
    });

    // todo: 
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-next]
    // na elemencie [.js-slider__nav--next]
    const navNext = sliderRootElement.querySelector('.js-slider__nav--next');
    navNext.addEventListener('click', function(){
        fireCustomEvent(navNext, 'js-slider-img-next')
        console.log('next')
    })

    
    
    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-prev]
    // na elemencie [.js-slider__nav--prev]
    const navPrev = sliderRootElement.querySelector('.js-slider__nav--prev');
   navPrev.addEventListener('click', function(e){
        fireCustomEvent(navPrev, 'js-slider-img-prev')
        console.log('prev')
   })
    

    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-close]
    // tylko wtedy, gdy użytkownik kliknie w [.js-slider__zoom]
    const zoom = sliderRootElement.querySelector('.js-slider__zoom');
    
        
        
    
    
}

const fireCustomEvent = function(element, name) {
    console.log(element.className, '=>', name);

    const event = new CustomEvent(name, {
        bubbles: true,
    });

    element.dispatchEvent( event );
}

const initCustomEvents = function(imagesList, sliderRootElement, imagesSelector) {
    imagesList.forEach(function(img) {
        img.addEventListener('js-slider-img-click', function(event) {
            onImageClick(event, sliderRootElement, imagesSelector);
        });
    });

    sliderRootElement.addEventListener('js-slider-img-next', onImageNext);
    sliderRootElement.addEventListener('js-slider-img-prev', onImagePrev);
    sliderRootElement.addEventListener('js-slider-close', onClose);
}

const onImageClick = function(event, sliderRootElement, imagesSelector) {
    // todo:  
    // 1. dodać klasę [.js-slider--active], aby pokazać całą sekcję
    console.log(event.target)
    console.log(sliderRootElement)
    console.log(imagesSelector)
      
    const sliderActive = document.querySelector('.js-slider')
    sliderActive.classList.add('js-slider--active')
    
    // 2. wyszukać ściężkę (atrybut [src]) do klikniętego elementu i wstawić do [.js-slider__image]
    const srcEvent = event.target.children[0].getAttribute('src')
    console.log(srcEvent)
    
    const srcImg = document.querySelector('.js-slider__image')
    srcImg.setAttribute('src', srcEvent)
    // 3. pobrać nazwę grupy zapisaną w dataset klikniętego elementu
    const dataEvent = event.target.getAttribute('data-slider-group-name')
   
    console.log(dataEvent)
    // 4. wyszukać wszystkie zdjęcia należące do danej grupy, które wykorzystasz do osadzenia w dolnym pasku
    const dateNiceEventElements =document.querySelectorAll('[data-slider-group-name = "nice"]')
    const dateGoodEventElements = document.querySelectorAll('[data-slider-group-name = "good"]')
    
    console.log(dateNiceEventElements)
    
    // 5. utworzyć na podstawie elementu [.js-slider__thumbs-item--prototype] zawartość dla [.js-slider__thumbs]
    const thumbsItem = document.querySelector('.js-slider__thumbs')
    thumbsItem.classList.add('js-slider__thumbs-item')
    thumbsItem.classList.remove('js-slider__thumbs-item--prototype')
if(dataEvent === 'nice'){
    
    dateNiceEventElements.forEach(function(e){
        thumbsItem.appendChild(e)
        console.log(e)
    })
    
} else if(dataEvent === 'good'){
    dateGoodEventElements.forEach(function(e){
        thumbsItem.appendChild(e)
    })
}
    // 6. zaznaczyć przy pomocy klasy [.js-slider__thumbs-image--current], który element jest aktualnie wyświetlany
    event.target.classList.add('js-slider__thumbs-image--current')
    
}

const onImageNext = function(event) {
    console.log(this, 'onImageNext');
    // [this] wskazuje na element [.js-slider]
    
    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    const actualElement = document.querySelector('.js-slider__thumbs-image--current')
    //actualElement.classList.add('.js-slider__thumbs-image--current')
    console.log(actualElement)
    // 2. znaleźć element następny do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    let nextElement = actualElement.nextElementSibling
    
   
    console.log(nextElement)
    // 3. sprawdzić czy ten element istnieje - jeśli nie to [.nextElementSibling] zwróci [null]
    if(!nextElement){
        nextElement = null
        console.log(nextElement)
    } 
    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    if(nextElement){
        console.log(actualElement.classList)
        actualElement.classList.remove('js-slider__thumbs-image--current')
        nextElement.classList.add('js-slider__thumbs-image--current')
        
        
    }
    // 5. podmienić atrybut o nazwie [src] dla [.js-slider__image]
    const srcNext = nextElement.children[0].getAttribute('src')
        const actualSrc = document.querySelector('.js-slider__image')
        console.log(actualSrc)
        actualSrc.setAttribute('src', srcNext)

}




const onImagePrev = function(event) {
    console.log('prev')
    console.log(this, 'onImagePrev');
    // [this] wskazuje na element [.js-slider]
    
    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    const actualElement = document.querySelector('.js-slider__thumbs-image--current')
    // 2. znaleźć element poprzedni do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    let previousElement = actualElement.previousElementSibling
    console.log(previousElement)
    // 3. sprawdzić czy ten element istnieje i czy nie posiada klasy [.js-slider__thumbs-item--prototype]
    // if(previousElement.classList.contains('js-slider__thumbs-item--prototype')){
        
    //     alert('yes')
    // } 
    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    // if(previousElement && previousElement.classList.contains('js-slider__thumbs-item--prototype')){
    //     alert('yes')
    //     actualElement.classList.remove('js-slider__thumbs-image--current')
    //     previousElement.classList.add('js-slider__thumbs-image--current')
        
        
    // }
    if(previousElement ){
        alert('yes')
        actualElement.classList.remove('js-slider__thumbs-image--current')
        previousElement.classList.add('js-slider__thumbs-image--current')
        
        
    }else if ( previousElement.classList.contains('js-slider__thumbs-item--prototype')){
     previousElement = previousElement.nextElementSibling
     alert('no')
    }
    // 5. podmienić atrybut [src] dla [.js-slider__image]
    const srcNext = previousElement.children[0].getAttribute('src')
    const actualSrc = document.querySelector('.js-slider__image')
    console.log(actualSrc)
    actualSrc.setAttribute('src', srcNext)
}

const onClose = function(event) {
    // todo:
    // 1. należy usunać klasę [js-slider--active] dla [.js-slider]
    // 2. należy usunać wszystkie dzieci dla [.js-slider__thumbs] pomijając [.js-slider__thumbs-item--prototype]
}