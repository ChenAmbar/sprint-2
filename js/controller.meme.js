'use strict'
const STORAGE_KEY = 'memeDB'
let gElCanvas
let gCtx

function onInIt() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    renderGallery()
}

function renderMeme() {
    drawImg()

}
function drawText(text, x, y) {
    const meme = getMeme()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = meme.lines[meme.selectedLineIdx].color
    gCtx.font = meme.lines[0].size + 'px Arial'
    gCtx.textAlign = meme.lines[0].align
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawImg() {
    const meme = getMeme()
    const elImg = new Image()
    const img = meme.selectedImgId
    const line = meme.selectedLineIdx
    elImg.src = img
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme.lines[line].txt, 200, 40)
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
}

function inputText(ev) {
    if (ev.keyCode === 13) return

    const text = document.querySelector('input').value
    console.log(text);
    setLineTxt(text)
    renderMeme()

    
}
function onSubmit(ev) {
    ev.preventDefault()
    document.querySelector('input').value=''
    
}

function _saveToStorage() {
    saveToStorage(STORAGE_KEY, gMeme)

}