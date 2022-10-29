var task2 = { type: "match", tasktext: "Match words and translations", content: [["general","generous","genetic"],["основной","щедрый","генетический"]]}
document.querySelector('#save_btn').addEventListener('click', function(){
    downloadAsFile(JSON.stringify(task2));
});

function downloadAsFile(data) {
    console.log("call");
    let a = document.createElement("a");
    let file = new Blob([data], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = "example.txt";
    a.click();
}