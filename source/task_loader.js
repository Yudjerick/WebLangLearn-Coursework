var task1 = { type: "test", tasktext: "Pick a synonym to 'funny'" ,content: ["sad", "boring", "hillarious", "generous"], answer: "hillarious"}
var task2 = { type: "match", tasktext: "Match words and translations", content: [["general","основной"],["generous","щедрый"],["genetic","генетический"]]}
var json1 = JSON.stringify(task1);
var json_str_out = document.createElement('p');
json_str_out.innerHTML = json1;
document.body.append(json_str_out);

load_button = document.querySelector('#load_json');
load_button.addEventListener('click', function() {
    loadTask(JSON.parse(document.querySelector('#json_input').value));
});

function loadTask(task) {
    switch (task.type) {
        case 'test':
            loadTestTask(task);
            break;
        default:
            break;
    }
}

function loadMatchTask(task){
    let div = document.createElement('div');
    div.className = "task";
    var innerStr = "<p>" + task.tasktext + "</p><ta>";
    for (var i = 0; i < task.content.length; i++) {
        innerStr += '<p><input type="radio" name="a" value="'+ task.content[i] +'">' + task.content[i] + '</input></p>';
    }
}

function loadTestTask(task){
    let div = document.createElement('div');
    div.className = "task";
    var innerStr = "<p>" + task.tasktext + "</p>";
    for (var i = 0; i < task.content.length; i++) {
        innerStr += '<p><input type="radio" name="a" value="'+ task.content[i] +'">' + task.content[i] + '</input></p>';
    }
    innerStr += '<input type="submit" id="button">';
    div.innerHTML = innerStr;
    document.body.append(div);
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
