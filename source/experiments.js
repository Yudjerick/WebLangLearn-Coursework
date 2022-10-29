var selected = null;
var selectedLeft = true;
var task2 = { type: "match", tasktext: "Match words and translations", content: [["general","generous","genetic"],["основной","щедрый","генетический"]]}
var task3 = { type: "match", tasktext: "Match words and translations", content: [["brave","brain","bread","bird","break","beard"],["смелый","мозг","хлеб","птица","перерыв","борода"]]}
var task4 = { type: "match", tasktext: "Match words and their meanings", content: [["ergonomics","economics","etymology"],["the study of people's efficiency in their working environment","the branch of knowledge concerned with the production, consumption, and transfer of wealth","the history of a linguistic form (such as a word) shown by tracing its development since its earliest recorded occurrence in the language where it is found, by tracing its transmission from one language to another, by analyzing it into its component parts, by identifying its cognates in other languages, or by tracing it and its cognates to a common ancestral form in an ancestral language"]]}
loadMatchTask(task4, document.querySelector('#taskcont'));

function loadMatchTask(task, container){
    let div = document.createElement('div');
    let taskText = document.createElement('p');
    taskText.innerHTML = task.tasktext;
    div.append(taskText);
    let taskBorder = document.createElement('div');
    taskBorder.className = "matchborder";
    div.append(taskBorder);

    let buttons = [];
    let lines = [];
    let connections = [];
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
                    selected.className = "matchelemselected";
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
                    selected.className = "matchelemselected";
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
        lines.push(drawLine(from,to,container));
        from.className = "matchelemjoint";
        from.disabled = true;
        to.className = "matchelemjoint";
        to.disabled = true;
        selected = null;
    }
    
    let clearBtn = document.createElement('button');
    clearBtn.innerHTML = "Clear connections";
    clearBtn.style.zIndex = 2;
    clearBtn.addEventListener('click',function(){
        for(var line of lines){
            line.remove();
        }
        for(var button of buttons){
            button.disabled = false;
            button.className = "matchelem";
        }
    });
    div.append(clearBtn);

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
    div.append(checkBtn);
    
    container.append(div);
}

function drawLine(from,to,container){
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
    ctx.stroke();
    container.append(canvas);
    return canvas;
}