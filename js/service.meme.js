'use strict'

let gMemes

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
        },
        {
            txt: '',
            size: 40,
            align: 'center',
            color: 'black',
            font: 'Ariel'
        },
        {
            txt: '',
            size: 40,
            align: 'center',
            color: 'black',
            font: 'Ariel'
        }
    ]
}

function setGmeme(meme) {
    gMeme = meme
}
function getSaveMeme(){
    
    if(loadFromStorage(STORAGE_KEY)){
        gMemes=loadFromStorage(STORAGE_KEY)
    }else{
        gMemes=[]
    }
}

function moveText(dx, dy) {
    const { selectedLineIdx } = getMeme()

    gPositions[selectedLineIdx].x += dx
    gPositions[selectedLineIdx].y += dy
}


function getMeme() {
    return gMeme
}
function clearMeme(){
    gMeme= {
        selectedImgId: 'img/1.jpg',
        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                size: 40,
                align: 'center',
                color: 'black',
                font: 'Ariel'
            },
            {
                txt: '',
                size: 40,
                align: 'center',
                color: 'black',
                font: 'Ariel'
            },
            {
                txt: '',
                size: 40,
                align: 'center',
                color: 'black',
                font: 'Ariel'
            }
        ]
    }
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
    console.log(gMeme);
}
function setEmoji(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt += text
    console.log(gMeme);
}

function setImpact(impact) {
    gMeme.lines[gMeme.selectedLineIdx].font = impact
    console.log(impact);

}