'use strict'
let minSize = 20;
let maxSize = 70;

function randomIntBetween(min,max){
    return Number(min) + Math.random()*(Number(max)-Number(min));
}

function createStartBlob(){
    let blob = document.createElement('div');
    blob.className = 'blob';
    blob.style.width = randomIntBetween(minSize,maxSize) + 'vmin';
    blob.style.left = randomIntBetween(0,window.innerWidth) + 'px';
    blob.style.top = randomIntBetween(0,window.innerHeight) + 'px';
    blob.style.animationName = 'flicker';
    blob.style.animationDuration = randomIntBetween(20000,50000) + 'ms';
    document.body.append(blob);
}

createStartBlob();
createStartBlob();
createStartBlob();
createStartBlob();
createStartBlob();
createStartBlob();
createStartBlob();
createStartBlob();