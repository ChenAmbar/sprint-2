'use strict'
const STORAGE_KEY = 'memeDB'
let gElCanvas
let gCtx
let gPositions = [{ x: 200, y: 40 }, { x: 200, y: 360 }, { x: 200, y: 200 }]


function onInIt() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    renderGallery()
    hidenMeme()
}
function hidenMeme(){
    document.querySelector('.meme').style.display='none'
}
function showMeme(){
    document.querySelector('.meme').style.display='block'
}

function renderMeme() {
    drawImg()
}
function inputColorText() {
    const {selectedLineIdx,lines}= getMeme()
    const colorInput = document.querySelector('.color-input').value
    lines[selectedLineIdx].color = colorInput
}
function onIncrease() {
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
    if (meme.lines[lineIdx].size > 90) return
    meme.lines[lineIdx].size += 5
    renderMeme()
}

function onDecrease() {
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
    if (meme.lines[lineIdx].size < 0) return
    meme.lines[lineIdx].size -= 5
    renderMeme()

}
function drawText(text, x, y,size,align,color) {
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = size + 'px Arial'
    gCtx.textAlign =align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    
}

function onAddLine() {
    const meme = getMeme()
    meme.selectedLineIdx++
    if (meme.selectedLineIdx === 3) {
        meme.selectedLineIdx = 0
    }
    const{lines,selectedLineIdx}=getMeme()
    document.querySelector('input').value=lines[selectedLineIdx].txt
    renderMeme()
}

function drawImg() {
    const { selectedImgId, selectedLineIdx, lines } = getMeme()
    const elImg = new Image()
    elImg.src = selectedImgId
    elImg.onload = () => {
        
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        lines.forEach((line,idx) => {
            
            const positions = gPositions[idx]
            const {txt,size,align,color}=line
            
            drawText(txt, positions.x, positions.y,size,align,color)
        })
    }
    inputColorText()

}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
}

function inputText(ev) {
    if (ev.keyCode === 13) {

        return
    }
    const text = document.querySelector('input').value

    console.log(text);
    setLineTxt(text)
    // inputColorText()
    renderMeme()

}
function onSubmit(ev) {
    ev.preventDefault()
    document.querySelector('input').value = ''
}

function _saveToStorage() {
    saveToStorage(STORAGE_KEY, gMeme)

}