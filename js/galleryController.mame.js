'use strict'

function renderGallery() {
    let strHTML=''
    for(let i=1 ; i<3 ;i++){
      strHTML+= ` <img onclick="onImgSelect(${i})" src="img/${i}.jpg">`
    }
    
    const elGallery=document.querySelector('.gallery')
    elGallery.innerHTML=strHTML
}

function onImgSelect(i){
    getImg(i)
    renderMeme()
console.log(i);
}