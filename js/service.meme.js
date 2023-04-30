'use strict'

let gMemes
let gPositions
let gIsSave = true

let gMeme = {
    selectedImgId: 'img/1.jpg',
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 40,
            align: 'center',
            color: 'black',
            font: 'Ariel'
        }
    ]
}

function createLine() {
    const line = {
        txt: '',
        size: 40,
        align: 'center',
        color: 'black',
        font: 'Ariel'
    }
    if (gMeme.lines.length >= 3) return
    gMeme.lines.push(line)
}

function isLineClicked(clickedPos) {
    const { x, y } = gPositions[gMeme.selectedLineIdx]
    const distanceX = (x - clickedPos.x)
    const distanceY = (y - clickedPos.y)
    if (distanceX <= 195 && distanceX >= -195 && distanceY <= 30 && distanceY >= -30) {
        return true
    }
}

function setTextLine(){
    const { lines, selectedLineIdx } = getMeme()
    return lines[selectedLineIdx].txt
}

function deleteLine(){
    const { selectedLineIdx, lines } = getMeme()
    lines[selectedLineIdx].txt = ''
}

function upDownLine(){
    const meme = getMeme()
    const { lines } = getMeme()
    if(lines.length<=2) return
    meme.selectedLineIdx++
    if (meme.selectedLineIdx === 3) {
        meme.selectedLineIdx = 0
    }
}

function setAddLine(){
    createLine()
    const meme = getMeme()
    meme.selectedLineIdx++
    if (meme.selectedLineIdx >= 3) {
        meme.selectedLineIdx = 0
    }
}

function setIncrease(){
    const {selectedLineIdx,lines}=getMeme()
    if (lines[selectedLineIdx].size > 90) return
    lines[selectedLineIdx].size += 5
}

function setDecrease(){
    const {selectedLineIdx,lines}=getMeme()
    if (lines[selectedLineIdx].size > 90) return
    lines[selectedLineIdx].size -= 5
}

function setColorText(colorInput){
    const { selectedLineIdx, lines } = getMeme()
    lines[selectedLineIdx].color = colorInput
}

function alingLeftLine(){
    const { selectedLineIdx, lines } = getMeme()
    lines[selectedLineIdx].align = "left"
    gPositions.forEach(pos => {
        pos.x = 10
    })
}

function centerTextLine(){
    const { selectedLineIdx, lines } = getMeme()
    lines[selectedLineIdx].align = "center"
    gPositions.forEach(pos => {
        pos.x = gElCanvas.width / 2
    })
}

function downloadImg(link,img){
    link.href = img
}

function setAlingRightLine(){
    const { selectedLineIdx, lines } = getMeme()
    lines[selectedLineIdx].align = "right"
    gPositions[selectedLineIdx].x = gElCanvas.width - 10
}

function saveMeme(){
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    const meme = getMeme()
    gMemes.push([imgContent, { meme }])
    _saveToStorage(gMemes)
}

function setGmeme(meme) {
    gMeme = meme
}

function getSaveMeme() {
    if (loadFromStorage(STORAGE_KEY)) {
        gMemes = loadFromStorage(STORAGE_KEY)
    } else {
        gMemes = []
    }
}

function _saveToStorage(val) {
    saveToStorage(STORAGE_KEY, val)
}

function getMemes(){
    return gMemes
}

function moveText(dx, dy) {
    const { selectedLineIdx } = getMeme()
    gPositions[selectedLineIdx].x += dx
    gPositions[selectedLineIdx].y += dy
}

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setEmoji(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt += text
}

function setImpact(impact) {
    gMeme.lines[gMeme.selectedLineIdx].font = impact
}