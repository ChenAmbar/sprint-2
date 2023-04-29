'use strict'
let gImgs
let gKeywordSearchCountMap = { 'all':50,'men':25,'funny':32, 'cat': 46, 'baby': 18 }

_createImgs()
function _createImgs() {
    let imgs = [
        { id: 1, url: `img/${1}.jpg`, keywords: ['Donald Trump','President'] },
        { id: 2, url: `img/${2}.jpg`, keywords: ['Dogs'] },
        { id: 3, url: `img/${3}.jpg`, keywords: ['Baby','Dog'] },
        { id: 4, url: `img/${4}.jpg`, keywords: ['Cat'] },
        { id: 5, url: `img/${5}.jpg`, keywords: ['Baby','Funny'] },
        { id: 6, url: `img/${6}.jpg`, keywords: ['Men','Funny'] },
        { id: 7, url: `img/${7}.jpg`, keywords: ['Baby','Funny'] },
        { id: 8, url: `img/${8}.jpg`, keywords: ['Men','Funny'] },
        { id: 9, url: `img/${9}.jpg`, keywords: ['Baby','Funny'] },
        { id: 10, url: `img/${10}.jpg`, keywords: ['Barack Obama','President'] },
        { id: 11, url: `img/${11}.jpg`, keywords: ['Men','Kiss'] },
        { id: 12, url: `img/${12}.jpg`, keywords: ['Men'] },
        { id: 13, url: `img/${13}.jpg`, keywords: ['Leonardo Dicaprio'] },
        { id: 14, url: `img/${14}.jpg`, keywords: ['Men'] },
        { id: 15, url: `img/${15}.jpg`, keywords: ['Men'] },
        { id: 16, url: `img/${16}.jpg`, keywords: ['Men'] },
        { id: 17, url: `img/${17}.jpg`, keywords: ['Vladimir Putin'] },
        { id: 18, url: `img/${18}.jpg`, keywords: ['Toy story'] },

    ]
    
    gImgs = imgs
}

function getKeyWords(){
    return gKeywordSearchCountMap
}

function getImgs(){
    const imgs=gImgs.filter(img=>{
        console.log(img.keywords.join().toLowerCase());
        return img.keywords.join().toLowerCase().includes(gSearchInput)
    })
    return imgs
}

function getImg(id) {
    const img = gImgs.find(img => img.id === id)
    gMeme.selectedImgId = img.url
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
