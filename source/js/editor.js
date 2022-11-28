let listContainer = document.getElementById('match-pair-list');
let pairs = [];

document.getElementById('add-pair').onclick = ()=>{
    addEmptyPair();
}

document.getElementById('download').onclick = function() {
    //let text = JSON.stringify(makeJSON());
    let text = JSON.stringify(makeWordPairs());
    let myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(text);
    this.href = myData;
    this.download = 'data.txt';
}

function addEmptyPair(){
    let newPair = document.createElement('div');
    newPair.className = 'match-pair';
    newPair.innerHTML = '<input type="text" class="input-pair" placeholder="A"><input type="text" class="input-pair" placeholder="B">';
    del_btn = document.createElement('button');
    del_btn.innerHTML = '-';
    del_btn.className = 'del-button';
    del_btn.onclick = ()=>{
        pairs.splice(pairs.indexOf(this.parent));
        newPair.remove();
        console.log(pairs);
    }
    pairs.push(newPair);
    newPair.append(del_btn);
    listContainer.append(newPair);
}

function makeWordPairs(){
    let results = [];
    for (const i of pairs) {
        let pair = {};
        pair.eng = i.children[0].value;
        pair.ru = i.children[1].value;
        results.push(pair);
    }
    return results;
}

function makeJSON(){
    let result = { type: "match"};
    result.tasktext = document.getElementById('tasktext').value;
    a = [];
    b = [];
    for (const i of pairs) {
        a.push(i.children[0].value);
        b.push(i.children[1].value);
    }
    result.content = [a,b];
    return result;
}