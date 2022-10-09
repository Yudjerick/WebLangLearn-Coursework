var buttons = document.querySelectorAll('.matchelem');
var selected = null;

for(var button of buttons){
    button.addEventListener('click',function(event){
        console.log("works");
        if(!selected){
            selected = event.currentTarget;
            selected.className = "matchelemselected";
        }
        else{
            drawLine(selected,event.currentTarget);
            selected.className = "matchelemjoint";
            event.currentTarget.className = "matchelemjoint";
            selected = null;
        }
        
    })
}

//drawLine(document.querySelector('#A'),document.querySelector('#D'));
//drawLine(document.querySelector('#B'),document.querySelector('#C'));

function drawLine(from,to){
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
    document.body.append(canvas);
}