let listContainer = document.getElementById('match-pair-list');
let pairs = [];

document.getElementById('add-pair').onclick = ()=>{
    addEmptyPair();
}

document.getElementById('download').onclick = function() {
    let text = JSON.stringify(makeJSON());
    let myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(text);
    this.href = myData;
    this.download = 'data.txt';
}



function addEmptyPair(){
    let newPair = document.createElement('div');
    newPair.className = 'match-pair';
    newPair.innerHTML = '<input type="text" placeholder="A"><input type="text" placeholder="B">';
    pairs.push(newPair);
    listContainer.append(newPair);
}

function makeJSON(){
    let result = { type: "match", tasktext: ""};
    a = [];
    b = [];
    for (const i of pairs) {
        a.push(i.children[0].value);
        b.push(i.children[1].value);
    }
    result.content = [a,b];
    return result;
}