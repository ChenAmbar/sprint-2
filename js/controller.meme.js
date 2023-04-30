'use strict'
const STORAGE_KEY = 'memeDB'
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
let gElCanvas
let gCtx
let gStartPos
let gIsDrag = false

function renderMeme() {
    drawImg()
}
function deawBorderLine(x, y) {
    if (!gIsSave) return
    const { lines, selectedLineIdx } = getMeme()
    const size = lines[selectedLineIdx].size
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(5, y - (size - 10), gElCanvas.width - 10, 1.5 * size)
}
function drawImg() {
    const { selectedImgId, selectedLineIdx, lines } = getMeme()
    const elImg = new Image()
    elImg.src = selectedImgId
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        lines.forEach((line, idx) => {
            const positions = gPositions[idx]
            const { txt, size, align, color, font } = line
            drawText(txt, positions.x, positions.y, size, align, color, font)
        })
        deawBorderLine(gPositions[selectedLineIdx].x, gPositions[selectedLineIdx].y)
    }
}

function drawText(text, x, y, size, align, color, font) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderMeme)
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    downloadImg(elLink, imgContent)
}

function onSaveMeme() {
    gIsSave = false
    renderMeme()
    setTimeout(() => {
        saveMeme()
        gIsSave = true
    }, 10);
}

function onInputEmoji() {
    const elEmoji = document.querySelector('.emoji').value
    setEmoji(elEmoji)
    const { lines, selectedLineIdx } = getMeme()
    document.querySelector('input').value = lines[selectedLineIdx].txt
    renderMeme()
    document.querySelector('.emoji').value = ''
}

function onImpact() {
    const elInpact = document.querySelector('.impact').value
    setImpact(elInpact)
    renderMeme()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        gPositions = [{ x: gElCanvas.width / 2, y: 40 }, { x: gElCanvas.width / 2, y: gElCanvas.height - 40 }, { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }]
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    gStartPos = pos
    if (isLineClicked(pos)) {
        gIsDrag = true
    }
    lineClicked(pos)
}

function lineClicked(pos) {
    const yClick = pos.y
    const yLine1 = gPositions[0].y
    const yLine2 = gPositions[1].y
    const yLine3 = gPositions[2].y
    if (yClick < yLine1 + 20 && yClick > yLine1 - 20) {
        gMeme.selectedLineIdx = 0
    }
    if (yClick < yLine2 + 20 && yClick > yLine2 - 20) {
        gMeme.selectedLineIdx = 1
    }
    if (yClick < yLine3 + 20 && yClick > yLine3 - 20) {
        gMeme.selectedLineIdx = 2
    }
    renderMeme()
}

function onMove(ev) {
    if (!gIsDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    gIsDrag = false
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onAlingRightLine() {
    setAlingRightLine()
    renderMeme()
}

function onCenterTextLine() {
    centerTextLine()
    renderMeme()
}

function onAlingLeftLine() {
    alingLeftLine()
    renderMeme()
}

function hidenMeme() {
    document.querySelector('.gallery-meme').style.display = 'none'
}
function showMeme() {
    document.querySelector('.gallery-meme').style.display = 'block'
}

function inputColorText() {
    const colorInput = document.querySelector('.color-input').value
    setColorText(colorInput)
    renderMeme()
}

function onIncrease() {
    setIncrease()
    renderMeme()
}

function onDecrease() {
    setDecrease()
    renderMeme()
}

function onAddLine() {
    setAddLine()
    document.querySelector('.text-input').value = setTextLine()
    renderMeme()
}

function onUpDownLine() {
    upDownLine()
    document.querySelector('.text-input').value = setTextLine()
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetWidth
}
function onDeleteLine() {
    deleteLine()
    document.querySelector('.text-input').value = ''
    renderMeme()
}

function inputText(ev) {
    const text = document.querySelector('.text-input').value
    if (ev.keyCode === 13) {
        document.querySelector('.text-input').value = ''
    }
    setLineTxt(text)
    renderMeme()
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
    const memes=getMemes()
    setGmeme(memes[id][1].meme)
    hideMyMemesPage()
    renderMeme()
    showMeme()
}

function hideMyMemesPage() {
    document.querySelector('.my-memes').style.display = 'none'
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    const meme = getMeme()
    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
        meme.selectedImgId = img.src
    }
    reader.readAsDataURL(ev.target.files[0])
    renderMeme()
}

function onSubmit(ev) {
    ev.preventDefault()
    document.querySelector('input').value = ''
}
