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
        strHTML += ` <li class="key ${key}" onclick="onSelectKey(event)" value="${key}">${key}</li>`
    })
    strHTML += '</ul>'
    const elMainSearch = document.querySelector('.key-words')
    elMainSearch.innerHTML = strHTML
    setSizeKeySearch()

}
function onSelectKey(key) {
    // let keysWords= getKeyWords()
    // console.log(keysWords.all);
    gSearchInput = key.target.innerHTML
    if (gSearchInput === 'all') gSearchInput = ''
    // console.log(key.target.innerHTML);
    // let a = document.querySelector(`.${gSearchInput}`).innerHTML
    // console.log(a);
    renderGallery()
    renderSearchSecsion()
}
function inputSearch(ev) {
    const searchInput = document.querySelector('.search-input').value
    gSearchInput = searchInput
    renderGallery()
}
function setSizeKeySearch() {
    document.querySelector('.baby').style.fontSize = gKeywordSearchCountMap.baby + 'px'
    document.querySelector('.cat').style.fontSize = gKeywordSearchCountMap.cat + 'px'
    document.querySelector('.funny').style.fontSize = gKeywordSearchCountMap.funny + 'px'
    document.querySelector('.all').style.fontSize = gKeywordSearchCountMap.all + 'px'
}
function onInputSearch() {
    inputSearch()
}
function onGalleryPage() {
    hidenMeme()
    hideMyMemesPage()
    renderGallery()
    showGallery()
    renderSearchSecsion()
}

function onImgSelect(id) {
    clearMeme()
    getImg(id)
    hideGallery()
    showMeme()
    renderMeme()
    hideMyMemesPage()

}




