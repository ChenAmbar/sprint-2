'use strict'

function renderGallery() {
    let strHTML = ''
    for (let i = 1; i <= 18; i++) {
        strHTML += ` <img onclick="onImgSelect(${i})" src="img/${i}.jpg">`
    }

    const elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHTML
}

function onImgSelect(id) {
    clearMeme()
    getImg(id)
    hideGallery()
    showMeme()
    renderMeme()
    hideMyMemesPage()

}
function hideGallery() {
    document.querySelector('.gallery').style.display = "none"
}
function showGallery() {
    document.querySelector('.gallery').style.display = "grid"
}

function onMyMemesPage() {
    const memes = loadFromStorage(STORAGE_KEY)
    let strHTML = ''
    memes.forEach((meme, id) => {
        return strHTML += ` <img onclick="onMemeSelect(${id})" src="${meme[0]}">`
    })
    const elGallery = document.querySelector('.my-memes')
    elGallery.innerHTML = strHTML
    elGallery.style.display = 'grid'
    hideGallery()
    hidenMeme()
}
function onMemeSelect(id) {
    console.log(id);
    setGmeme(gMemes[id][1].meme)
    hideMyMemesPage()
    renderMeme()
    showMeme()
}

function hideMyMemesPage() {
    document.querySelector('.my-memes').style.display = 'none'
}

