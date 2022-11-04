let task5 = { type: 'order',tasktext: 'Put words in correct order', content: ['Have','you','ever','been','in','Paris','?']};

function loadOrderTask(task, container)
{
    let div = document.createElement('div');
    let taskText = document.createElement('p');
    taskText.innerHTML = task.tasktext;
    taskText.className = 'task-text';
    let taskBorder = document.createElement('div');
    taskBorder.className = "matchborder";
    taskBorder.prepend(taskText);
    div.append(taskBorder);
    for(let i of task.content){
        let orderElem = document.createElement('button');
        orderElem.className = "orderelem";
        orderElem.innerText = task.content[i];
        taskBorder.append(orderElem);
    }
}