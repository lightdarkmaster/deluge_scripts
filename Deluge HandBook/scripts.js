const code = 12;

function changeVowels() {
    const testArea = document.getElementById("testArea");

    const text = testArea.textContent;
    const result = text.replace(/[aeiou]/gi, "*");

    testArea.textContent = result;
}

function changeBgColor() {
    const testArea = document.getElementById("testArea");

    testArea.style.backgroundColor = "orange";
}

function changeHeader() {
    const header = document.querySelector("#testArea h1");

    header.textContent = "New Header";
}

function loop(){
    for (let i = 0; i < 10; i++) {
        console.log(i);
    }
}
function callFunctions(){
    changeVowels();
    changeBgColor();
    changeHeader();
}


if (code === 12) {
   callFunctions();
}