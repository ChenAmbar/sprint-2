'use strict'

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

let gImgs 
let gMeme = {
    selectedImgId: 'img/1.jpg',
    selectedLineIdx: 0,
    lines: [
        {
            txt:'',
            size: 40,
            align: 'center',
            color:'blue',
        },
        {
            txt:'',
            size: 40,
            align: 'center',
            color:'blue'
        },
        {
            txt:'',
            size: 40,
            align: 'center',
            color:'blue'
        }
    ]
}

_createImgs()
function _createImgs(){
    let imgs=[]
    for (let i = 1; i <= 18; i++) {
        imgs.push({ id: i, url: `img/${i}.jpg`, keywords: [] })
    }
    gImgs=imgs
}

function moveText(dx, dy) {
    const {selectedLineIdx}=getMeme()

    gPositions[selectedLineIdx].x += dx
    gPositions[selectedLineIdx].y += dy
  }


function getMeme() {
    return gMeme
}

function getImg(id) {
    const img = gImgs.find(img => img.id === id)
    gMeme.selectedImgId= img.url
}

function setLineTxt(text){
    gMeme.lines[gMeme.selectedLineIdx].txt=text
    console.log(gMeme);
}
function setEmoji(text){
    gMeme.lines[gMeme.selectedLineIdx].txt+=text
    console.log(gMeme);
}