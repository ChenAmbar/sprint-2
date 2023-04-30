'use strict'
let gSearchInput = ''

function onInIt() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    gPositions= [{ x: gElCanvas.width/2, y: 40 }, { x: gElCanvas.width/2, y: gElCanvas.height-40 }, { x: gElCanvas.width/2, y: gElCanvas.height/2 }]
    getSaveMeme()
    onGalleryPage()
    hidenMeme()
    addListeners()
}

function renderGallery() {
    const imgs = getImgs()
    let strHTML = ''
    imgs.forEach(img => {
        strHTML += ` <img onclick="onImgSelect(${img.id})" src="img/${img.id}.jpg">`
    })
    const elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHTML
}

function renderSearchSecsion() {
    const KeyWords = getKeyWords()
    const keyName = Object.keys(KeyWords)
    let strHTML = '<ul class="clean-list flex align-center ">'
    keyName.forEach(key => {
        strHTML += ` <li class="key ${key}" onclick="onSelectKey(event)">${key}</li>`
    })
    strHTML += '</ul>'
    const elMainSearch = document.querySelector('.key-words')
    elMainSearch.innerHTML = strHTML
    setSizeKeySearch()
}

function onSelectKey(key) {
    selectKey(key)
    renderGallery()
    renderSearchSecsion()
}

function inputSearch(ev) {
    const searchInput = document.querySelector('.search-input').value
    gSearchInput = searchInput
    renderGallery()
}

function setSizeKeySearch() {
    const keysWords=getKeyWords()
    document.querySelector('.baby').style.fontSize = keysWords.baby + 'px'
    document.querySelector('.cat').style.fontSize = keysWords.cat + 'px'
    document.querySelector('.funny').style.fontSize = keysWords.funny + 'px'
    document.querySelector('.all').style.fontSize = keysWords.all + 'px'
    document.querySelector('.men').style.fontSize = keysWords.men + 'px'
}

function onInputSearch() {
    inputSearch()
}

function onGalleryPage() {
    document.querySelector('.text-input').value=''
    clearText()
    hidenMeme()
    hideMyMemesPage()
    renderGallery()
    showGallery()
    renderSearchSecsion()
}

function onImgSelect(id) {
    getImg(id)
    hideGallery()
    showMeme()
    renderMeme()
    hideMyMemesPage()
}

function hideSerch(){
    document.querySelector('.search').style.display='none'
}

function showSearch(){
    document.querySelector('.search').style.display='flex'
}

function hideGallery() {
    document.querySelector('.gallery').style.display = "none"
    hideSerch()

}

function showGallery() {
    document.querySelector('.gallery').style.display = "grid"
    showSearch()
}




