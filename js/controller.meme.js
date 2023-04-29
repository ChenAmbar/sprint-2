'use strict'
const STORAGE_KEY = 'memeDB'
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
let gElCanvas
let gCtx
let gStartPos
let gIsDrag = false
let gPositions

function renderMeme() {
    drawImg()
}
function drawImg() {
    const { selectedImgId, selectedLineIdx, lines } = getMeme()
    const elImg = new Image()
    elImg.src = selectedImgId
    elImg.onload = () => {
        
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        lines.forEach((line, idx) => {
            
            const positions = gPositions[idx]
            const { txt, size, align, color,font } = line
            
            drawText(txt, positions.x, positions.y, size, align, color,font)
        })
    }
    
}

function drawText(text, x, y, size, align, color,font) {
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
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

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onSaveMeme(){
    const imgContent = gElCanvas.toDataURL('image/jpeg') 
    const meme=getMeme()
    gMemes.push([imgContent,{meme}])
    _saveToStorage(gMemes)
}

function onInputEmoji() {
    const elEmoji = document.querySelector('.emoji').value
    console.log(elEmoji);
    setEmoji(elEmoji)
    const { lines, selectedLineIdx } = getMeme()
    document.querySelector('input').value = lines[selectedLineIdx].txt
    renderMeme()
    document.querySelector('.emoji').value=''
    
}
function onImpact(){
    const elInpact=document.querySelector('.impact').value
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
        // onInIt()
        gPositions= [{ x: gElCanvas.width/2, y: 40 }, { x: gElCanvas.width/2, y: gElCanvas.height-40 }, { x: gElCanvas.width/2, y: gElCanvas.height/2 }]
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
    gIsDrag = true
    const pos = getEvPos(ev)
    gStartPos = pos

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
    const { selectedLineIdx, lines } = getMeme()
    lines[selectedLineIdx].align = "right"
    gPositions[selectedLineIdx].x = gElCanvas.width-10

    renderMeme()

}
function onCenterTextLine() {
    const { selectedLineIdx, lines } = getMeme()
    lines[selectedLineIdx].align = "center"
    gPositions.forEach(pos => {
        gPositions[selectedLineIdx].x = gElCanvas.width/2
    })
    renderMeme()

}
function onAlingLeftLine() {
    const { selectedLineIdx, lines } = getMeme()
    lines[selectedLineIdx].align = "left"
    gPositions.forEach(pos => {
        gPositions[selectedLineIdx].x = 10
    })
    renderMeme()
}
function hidenMeme() {
    document.querySelector('.gallery-meme').style.display = 'none'
}
function showMeme() {
    document.querySelector('.gallery-meme').style.display = 'block'
}

function inputColorText() {
    const { selectedLineIdx, lines } = getMeme()
    const colorInput = document.querySelector('.color-input').value
    console.log(colorInput);
    lines[selectedLineIdx].color = colorInput
    renderMeme()
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

function onAddLine() {
    const meme = getMeme()
    meme.selectedLineIdx++
    if (meme.selectedLineIdx === 3) {
        meme.selectedLineIdx = 0
    }
    const { lines, selectedLineIdx } = getMeme()
    document.querySelector('input').value = lines[selectedLineIdx].txt
    renderMeme()
}



function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetWidth
}
function onDeleteLine() {
    const { selectedLineIdx, lines } = getMeme()
    lines[selectedLineIdx].txt = ''
    document.querySelector('input').value = lines[selectedLineIdx].txt
    renderMeme()
}
function inputText(ev) {
    if (ev.keyCode === 13) return
    const text = document.querySelector('.text-input').value

    console.log(text);
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
    console.log(id);
    setGmeme(gMemes[id][1].meme)
    hideMyMemesPage()
    renderMeme()
    showMeme()
}
function hideMyMemesPage() {
    document.querySelector('.my-memes').style.display = 'none'
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    const meme=getMeme()
    reader.onload = function (event) {
        let img = new Image() 
        img.src = event.target.result 
        img.onload = onImageReady.bind(null, img)
        meme.selectedImgId=img.src
    }
    reader.readAsDataURL(ev.target.files[0])
    renderMeme()
}
function onSubmit(ev) {
    ev.preventDefault()
    document.querySelector('input').value = ''
}

function _saveToStorage(val) {
    saveToStorage(STORAGE_KEY, val)

}