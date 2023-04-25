'use strict'

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] }
];

let gMeme = {
    selectedImgId: 'img/1.jpg',
    selectedLineIdx: 0,
    lines: [
        {
            txt:'',
            size: 30,
            align: 'center',
            color: 'blue'
        }
    ]
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