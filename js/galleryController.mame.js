'use strict'

function renderGallery() {
    let strHTML=''
    for(let i=1 ; i<=18 ;i++){
      strHTML+= ` <img onclick="onImgSelect(${i})" src="img/${i}.jpg">`
    }
    
    const elGallery=document.querySelector('.gallery')
    elGallery.innerHTML=strHTML
}

function onImgSelect(id){
    getImg(id)
    hideGallery()
    showMeme()
    renderMeme()

}
function hideGallery() {
    document.querySelector('.gallery').style.display="none"
}