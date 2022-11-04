let selected = null;
let selectedLeft = true;

let task1 = { type: "test", tasktext: "Pick a synonym to 'funny'" ,content: ["sad", "boring", "hillarious", "generous"], answer: "hillarious"}
var task2 = { type: "match", tasktext: "Match words and translations", content: [["general","generous","genetic"],["основной","щедрый","генетический"]]}
var task3 = { type: "match", tasktext: "Match words and translations", content: [["brave","brain","bread","bird","break","beard"],["смелый","мозг","хлеб","птица","перерыв","борода"]]}
var task4 = { type: "match", tasktext: "Match words and their meanings", content: [["ergonomics","economics","etymology"],["the study of people's efficiency in their working environment","the branch of knowledge concerned with the production, consumption, and transfer of wealth","the history of a linguistic form (such as a word) shown by tracing its development since its earliest recorded occurrence in the language where it is found, by tracing its transmission from one language to another, by analyzing it into its component parts, by identifying its cognates in other languages, or by tracing it and its cognates to a common ancestral form in an ancestral language"]]}

load_button1 = document.querySelector('#load_json1');
load_button2 = document.querySelector('#load_json2');
load_button3 = document.querySelector('#load_json3');
let loadButtons = [load_button1,load_button2,load_button3];

load_button1.addEventListener('click', function() {
    loadTask(task2, document.querySelector('.task-container'));
    hideLoadButtons();
});

load_button2.addEventListener('click', () =>{
    loadTask(task1, document.querySelector('.task-container'));
    hideLoadButtons();
});

load_button3.addEventListener('click', () =>{
    loadTask(task3, document.querySelector('.task-container'));
    hideLoadButtons();
});

function hideLoadButtons(){
    for (let i of loadButtons) {
        i.style.visibility = 'hidden';
    }
}

function loadTask(task, container = document.body) {
    switch (task.type) {
        case 'test':
            loadTestTask(task, container);
            break;
        case 'match':
            loadMatchTask(task, container);
        default:
            break;
    }
}

function loadTestTask(task, container){
    let div = document.createElement('div');
    div.className = "test-task";
    var innerStr = "<p>" + task.tasktext + "</p>";
    for (var i = 0; i < task.content.length; i++) {
        innerStr += '<p><input type="radio" name="a" value="'+ task.content[i] +'">' + task.content[i] + '</input></p>';
    }
    innerStr += '<input type="submit" id="button">';
    div.innerHTML = innerStr;
    container.append(div);
    let button = document.querySelector('#button');
    let radios = document.querySelectorAll('input[type="radio"]');
    button.addEventListener('click', function() {
        for (let radio of radios) {
            if (radio.checked) {
                if(radio.value == task.answer){
                    div.style.backgroundColor = "lightgreen";
                    //div.innerHTML += "<p>Correct!</p>";
                }
                else{
                    div.style.backgroundColor = "lightcoral";
                    //div.innerHTML += "<p>Wrong!</p>";
                }
            }
        }
    });
}

function loadMatchTask(task, container){
    let div = document.createElement('div');
    let taskText = document.createElement('p');
    taskText.innerHTML = task.tasktext;
    taskText.className = 'task-text';
    let taskBorder = document.createElement('div');
    taskBorder.className = "matchborder";
    taskBorder.prepend(taskText);
    div.append(taskBorder);

    let buttons = [];
    let lines = [];
    let connections = [];
    let joinedButtons = [];

    window.addEventListener('resize', function(){
        for(var line of lines){
            line.remove();
        }
        for(let i = 0; i < joinedButtons.length; i+=2){
            rejoinWords(joinedButtons[i],joinedButtons[i+1]);
        }
        function rejoinWords(from,to){
            connections[task.content[0].indexOf(from.innerHTML)] = to.innerHTML;
            lines.push(drawLineSVG(from,to,container));
            let lineEffect = drawLine(from,to,container);
            lineEffect.className = 'line-effect';
            lines.push(lineEffect);
            from.className = "matchelem matchelemjoint";
            from.disabled = true;
            to.className = "matchelem matchelemjoint";
            to.disabled = true;
        }
    })

    for(let i = 0; i < task.content[0].length; i++){
        connections.push("");
    }

    answers = [...task.content[1]];
    answers.sort(()=>Math.random()-0.5)

    for(let i = 0; i < task.content[0].length; i++){
        let row = document.createElement('div');
        row.className = "matchrow";
        taskBorder.append(row);

        let matchElem = document.createElement('button');
        matchElem.className = "matchelem";
        matchElem.innerHTML = task.content[0][i];
        row.append(matchElem);
        buttons.push(matchElem);

        let matchElem2 = document.createElement('button');
        matchElem2.className = "matchelem";
        matchElem2.innerHTML = answers[i];
        row.append(matchElem2);
        buttons.push(matchElem2);
    }

    for(let i = 0; i < buttons.length; i++){
        button = buttons[i];
        if(i%2 == 0){
            button.addEventListener('click',function(event){
                if(!selected){
                    selectedLeft = true;
                    selected = event.currentTarget;
                    selected.className = "matchelem matchelemselected";
                }
                else{
                    if(!selectedLeft){
                        joinWords(event.currentTarget, selected);
                    }
                }
            })
        }
        else{
            button.addEventListener('click',function(event){
                if(!selected){
                    selectedLeft = false;
                    selected = event.currentTarget;
                    selected.className = "matchelem matchelemselected";
                }
                else{
                    if(selectedLeft){
                        joinWords(selected, event.currentTarget);
                    }
                }
            })
        }
    }

    function joinWords(from,to){
        connections[task.content[0].indexOf(from.innerHTML)] = to.innerHTML;
        lines.push(drawLineSVG(from,to,container));
        let lineEffect = drawLine(from,to,container);
        lineEffect.className = 'line-effect';
        lines.push(lineEffect);
        joinedButtons.push(from);
        joinedButtons.push(to);
        from.className = "matchelem matchelemjoint";
        from.disabled = true;
        to.className = "matchelem matchelemjoint";
        to.disabled = true;
        selected = null;
    }
    
    let clearBtn = document.createElement('button');
    clearBtn.innerHTML = "Clear connections";
    clearBtn.style.zIndex = 2;
    clearBtn.addEventListener('click',function(){
        for(let line of lines){
            line.remove();
        }
        for(let button of buttons){
            button.disabled = false;
            button.className = "matchelem";
        }
        joinedButtons = [];
    });
    taskBorder.append(clearBtn);

    let checkBtn = document.createElement('button'); //works correctly only if left word picked first
    checkBtn.style.zIndex = 4;
    checkBtn.innerHTML = "Check";
    checkBtn.addEventListener('click',function(){
        console.log(task.content[1]);
        console.log(connections);
        for(let i = 0; i < task.content[0].length; i++){
            if(task.content[1][i] == connections[i]){
                buttons[i*2].style.backgroundColor = "lightgreen";
            }
            else{
                buttons[i*2].style.backgroundColor = "lightcoral";
            }
        }
    });
    taskBorder.append(checkBtn);
    
    container.append(div);
}

function drawLine(from,to,container,color = '#f2f7ff'){
    var canvas = document.createElement('canvas');
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    canvas.style.position = "absolute";
    canvas.style.top = 0;
    canvas.style.left = 0;
    const ctx = canvas.getContext('2d');
    var boxFrom = from.getBoundingClientRect();
    var boxTo = to.getBoundingClientRect();
    var pointFrom = {x:boxFrom.right, y:boxFrom.top + boxFrom.height/2};
    var pointTo = {x:boxTo.left, y:boxTo.top + boxTo.height/2};
    ctx.beginPath();       
    ctx.moveTo(pointFrom.x, pointFrom.y);    
    ctx.lineTo(pointTo.x, pointTo.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    container.append(canvas);
    return canvas;
}

function drawLineSVG(from,to,container,color = '#f2f7ff'){
    let svg = document.querySelector("svg");
    var boxFrom = from.getBoundingClientRect();
    var boxTo = to.getBoundingClientRect();
    var pointFrom = {x:boxFrom.right, y:boxFrom.top + boxFrom.height/2};
    var pointTo = {x:boxTo.left, y:boxTo.top + boxTo.height/2};
    let line = document.createElementNS('http://www.w3.org/2000/svg','line');;
    svg.append(line);
    line.setAttribute('x1',pointFrom.x);
    line.setAttribute('y1',pointFrom.y);
    line.setAttribute('x2',pointTo.x);
    line.setAttribute('y2',pointTo.y);
    line.style = `stroke:${color};stroke-width:2`;
    return line;
}
