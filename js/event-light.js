let arrayFrames = [];

let commandsObj = {
    duration: null,
    info: []
}

var arrayCoordsObj = document.getElementsByClassName('coordSelectable');

var isPlaying = false;

arrayFrames.push(commandsObj);

function getColor(event) {
    /* DOM objects */ 
    let selectedButton = document.querySelector('input[name="color"]:checked');
    let labels = document.getElementsByClassName('label-color');

    let color = event.target.style.background;

    /*Stylizing the templates*/
    for (let i = 0; i < labels.length; i++) {
        if(i === selectedButton.id - 1) {
            if(color.includes('air.jpg'))
                labels[i].innerHTML = `<div class="template-child" style="background: url('img/lights/air.jpg'); background-size: contain;"></div>`;
            else if(color.includes('block.png'))
                labels[i].innerHTML = `<div class="template-child" style="background: url('img/lights/block.png'); background-size: contain;"></div>`;
            else
                labels[i].innerHTML = `<div class="template-child" style="background: ${color}"></div>`;
        }   
    }

    let arrayPalettes = document.getElementsByClassName('template-child');
    let arrayNameColors = [];
    let arrayBlocks = [];

    for (let i = 0; i < arrayPalettes.length; i++) {
        if(arrayPalettes[i].style.background.includes('air.jpg'))
            arrayNameColors.push('air');
        else if(arrayPalettes[i].style.background.includes('block.png'))
            arrayNameColors.push('block');
        else
            arrayNameColors.push(arrayPalettes[i].style.background);
    }
        

    for (let i = 0; i < arrayNameColors.length; i++) 
        arrayBlocks.push(colourNameToBlock(arrayNameColors[i]));
    
    console.log(arrayBlocks);
    
    let arrayHexColors = [];
    for (let i = 0; i < arrayNameColors.length; i++) {
        if(arrayNameColors[i].includes("air")) {
            continue;
        } else if(arrayNameColors[i].includes("block")) {
            arrayHexColors.push('block');
            continue;
        } else if(arrayNameColors[i] === '') 
            continue;
        else
            arrayHexColors.push(colourNameToHex(arrayNameColors[i]));
    } 

    let objColorResult = document.getElementById('color-result');

    if(arrayHexColors.includes('block')) 
        objColorResult.style = `background: url('img/lights/block.png'); background-size: contain;`;
    else {
        let colorResult = '';
        if(arrayHexColors[0] && arrayHexColors[1] && arrayHexColors[2]) {
            colorResult = blendColors(arrayHexColors[0], arrayHexColors[1], 0.5);
            colorResult = blendColors(colorResult, arrayHexColors[2], 0.5);
        } else if(arrayHexColors[0] && arrayHexColors [1]) {
            colorResult = blendColors(arrayHexColors[0], arrayHexColors[1], 0.5);
        } else if(arrayHexColors[1] && arrayHexColors[2]) {
            colorResult = blendColors(arrayHexColors[1], arrayHexColors[2], 0.5);
        } else if(arrayHexColors[0] && arrayHexColors[2]) {
            colorResult = blendColors(arrayHexColors[0], arrayHexColors[2], 0.5);
        } else if(arrayHexColors[0]) {
            colorResult = arrayHexColors[0];
        } else if(arrayHexColors[1]) {
            colorResult = arrayHexColors[1];
        } else if(arrayHexColors[2]) {
            colorResult = arrayHexColors[2];
        }
    
        objColorResult.style = `background-color: ${colorResult}`;
    }
    objColorResult.innerText = arrayBlocks.toString();
    
}

function blendColors(colorA, colorB, amount) {
    const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
    const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
    const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
    const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
    const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
    return '#' + r + g + b;
}



function colourNameToHex(colour)
{
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32","lightgray":"d3d3d3"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return false;
}

function colourNameToBlock(colour)
{
    var colours = {
    "black":"black_stained_glass",
    "blue":"blue_stained_glass",
    "brown":"brown_stained_glass",
    "cyan":"cyan_stained_glass",
    "gray":"gray_stained_glass",
    "green":"green_stained_glass",
    "lightblue":"light_blue_stained_glass",
    "magenta":"magenta_stained_glass",
    "orange":"orange_stained_glass",
    "pink":"pink_stained_glass",
    "purple":"purple_stained_glass",
    "red":"red_stained_glass",
    "violet":"#ee82ee",
    "white":"white_stained_glass",
    "yellow":"yellow_stained_glass",
    "lime":"lime_stained_glass",
    "lightgray":"light_gray_stained_glass",
    "block":"cobblestone",
    "air":"air",};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return false;
}


function createNewPaintSelectable() {
    let paintsObject = document.getElementById("paints");
    let result = document.getElementById('color-result');

    let paintings = document.getElementsByClassName('individual-painting');
    console.log('Tama??o' + paintings.length);

    let style = '';
    if(!result.getAttribute('style')) 
        style = "background: white"
    else if(result.getAttribute('style').includes('air.jpg'))
        style = "background: url('img/lights/air.jpg'); background-size: contain";
    else if(result.getAttribute('style').includes('block.png'))
        style = "background: url('img/lights/block.png'); background-size: contain;";
    else 
        style = result.getAttribute('style');

    paintsObject.innerHTML += `
    <div class="individual-painting">
        <input type="radio" id="p${paintings.length + 1}" name="paint" value="${result.innerHTML}" checked>
        <label for="p${paintings.length + 1}"><div style="${style}" class="square-paintings"></div></label>
    </div>
    `;
}

function selectCoord(event) {
    let selectedObj = event.target;
    let resultObj = document.getElementById('color-result');

    let infoCommandObj = document.getElementById('amountOfCommands');

    const coords = selectedObj.innerText;

    let amountOfFramesObj = document.getElementById('amountOfFrames');

    let amountOfFrames = arrayFrames.length;
    let currentFrame = document.getElementById('frames-select').value;

    if(selectedObj.getAttribute("style")) { 

        for (let i = 0; i < arrayFrames[currentFrame - 1].info.length; i++) {
            if(arrayFrames[currentFrame - 1].info[i].coords === coords) {
                arrayFrames[currentFrame - 1].info.splice(i, 1); //delete the command.
                console.log(arrayFrames[currentFrame - 1]);
                console.log(`Command ${coords} deleted`);
            }
        }
      
        //infoCommandObj.innerText = arrayFrames[currentFrame].length;
        selectedObj.removeAttribute("style");

    } else {
        let paintings = document.getElementsByClassName('individual-painting');
        for (let i = 0; i < paintings.length; i++) {
            const paintObj = paintings[i].getElementsByTagName('input');

            if(paintObj.paint.checked === true) {
                const styleObj = paintings[i].getElementsByClassName('square-paintings')[0].getAttribute('style').toString(); //Get the style
                selectedObj.style = styleObj; //Print the style on the clicked square

                /* Store the info */
                const blocks = paintObj.paint.value; //Get the command

                let infoObj = {
                    coords: coords,
                    style: styleObj,
                    blocks: blocks.split(','),
                }

                arrayFrames[currentFrame - 1].info.push(infoObj) //Save a new light with its coords
                console.log(arrayFrames[currentFrame - 1]);
            }
        }
    }
}

function insertAt(array, index, ...elementsArray) {
    array.splice(index, 0, ...elementsArray);
}

function addFrame() {
    console.log('CLICK ON ADD FRAME');
    let currentFrame = document.getElementById('frames-select').value;

    /*let theFrameBefore = arrayFrames[currentFrame - 1];
    let newInfo = theFrameBefore.info.slice(

    );
    
    let commandsObj = {
        frame: theFrameBefore.frame + 1,
        duration: null,
        info: newInfo
    }*/

    commandsObj = {
        duration: null,
        info: []
    }

    //1, 2, x, 3, 4

    console.log(commandsObj);
    insertAt(arrayFrames, currentFrame, commandsObj); // [1,2,3,4,5,6,7,8]
    //arrayFrames.push(commandsObj);

    updateSelectableFrames();
    let selectFrameObj = document.getElementById('frames-select');
    selectFrameObj.value = parseInt(currentFrame) + 1;

    printer(arrayFrames.length);
}

async function deleteFrame() {
    if(arrayFrames.length !== 1) {
        let currentFrame = document.getElementById('frames-select').value;
    
        arrayFrames.splice(currentFrame - 1, 1);
        await updateSelectableFrames();
        let selectFrameObj = document.getElementById('frames-select');
    
        if(currentFrame === '1') {
            selectFrameObj.value = currentFrame;
            printer(currentFrame);
        } else {
            selectFrameObj.value = currentFrame - 1;
            printer(currentFrame - 1);
        }
            
        
    } 
}


function updateSelectableFrames() {
    let selectHTML = '';
    selectHTML += '<label for="frames">Frame:</label>';
    selectHTML += '<select name="frames" id="frames-select" onchange="if (this.selectedIndex) updateFrame();">';
    selectHTML += `<option hidden value="-1">---</option>`

    for (let i = 0; i < arrayFrames.length; i++) 
        selectHTML += `<option value="${i + 1}">${i + 1}</option>`
    
    selectHTML += `</select>`;
    document.getElementById('select-frames').innerHTML = selectHTML;
}

function printer(currentFrame) {

    let frameDurationObj = document.getElementById('duration');
    frameDurationObj.value = getTicks(currentFrame - 1);

    reStyleAllCoords();
    
    for (let i = 0; i < currentFrame; i++) {
        for (let j = 0; j < arrayFrames[i].info.length; j++) {
            $(`.coordSelectable:contains("${arrayFrames[i].info[j].coords}")`).attr('style', arrayFrames[i].info[j].style);
        }
         
    }



    /*for (let j = 0; j < currentFrame; j++) {        
        for (let i = 0; i < arrayFrames[j].info.length; i++) 
        arrayInfoCoords.push(arrayFrames[j].info[i]);

        for (let i = 0; i < arrayCoordsObj.length; i++) {
            if (arrayInfoCoords.some(e => e.coords === arrayCoordsObj[i].innerText)) {
                arrayCoordsObj[i].style = arrayInfoCoords[arrayInfoCoords.findIndex(e => e.coords === arrayCoordsObj[i].innerText)].style;
            } else {
                arrayCoordsObj[i].removeAttribute('style');
            }
        }
    }??*/

    
}

function printerPlayer(currentFrame) {

    for (let j = 0; j < arrayFrames[currentFrame].info.length; j++) {
            $(`.coordSelectable:contains("${arrayFrames[currentFrame].info[j].coords}")`).attr('style', arrayFrames[currentFrame].info[j].style);
    }

}

function updateFrame() {
    let currentFrame = document.getElementById('frames-select').value;
    printer(currentFrame);
}


function changeFrameDuration() {
    let currentFrame = document.getElementById('frames-select').value;
    const durationSelected = document.getElementById('duration').value;

    let newDuration;
    if(durationSelected <= 0) {
        newDuration = null;
    } else {
        newDuration = durationSelected;
    }

    arrayFrames[currentFrame - 1].duration = newDuration;
    console.log(arrayFrames[currentFrame - 1]);
}

function framePlayer() {
    let frameObj = document.getElementById('frames-select');
    document.getElementById('frames-select').getElementsByTagName('option')[0].selected = 'selected';
    frameObj.focus();

    console.log(arrayFrames.length);

    reStyleAllCoords();

    player();
}

const timer = ms => new Promise(res => setTimeout(res, ms))

async function player () { // We need to wrap the loop into an async function for this to work
    if(isPlaying) isPlaying = false;
    else isPlaying = true;

    let frameVisualizer = document.getElementById('frames-select').getElementsByTagName('option');

    for (let i = 0; i < arrayFrames.length; i++) {
        if(!isPlaying) break;
        frameVisualizer[i + 1].selected = 'selected';
        await timer( 50 * getTicks(i)); // then the created Promise can be awaited
        printerPlayer(i); 
    }

    isPlaying = false;
}


function getTicks(i) {
    let ticks = 0;

    if(i === 0)
        ticks = 0;
    else {
        if(!arrayFrames[i].duration) 
            ticks = document.getElementById('default-duration').value;
        else 
            ticks = arrayFrames[i].duration;
    }

    return ticks;
}

function reStyleAllCoords() {
    for (let i = 0; i < arrayCoordsObj.length; i++) 
        arrayCoordsObj[i].removeAttribute('style')  
}

async function rotateCanvas() {
    let canvas = document.getElementById('myImage');
    let currentDegrees = canvas.style.transform.match(/\d/g);
    currentDegrees = parseInt(currentDegrees.join(""));

    console.log(currentDegrees);

    let newDegrees = 0;

    newDegrees = currentDegrees + 90;

    console.log(newDegrees);

    const rotatePromise = new Promise((resolve, reject) => {
        document.getElementById("myImage").animate([
            // fotogramas clave
            { transform: `rotate(${newDegrees}deg)` },
          ], {
            // opciones de sincronizaci??n
            duration: 450,
            easing: "ease-out"
        })
        resolve(newDegrees);
    });
    
    rotatePromise.then((newDegrees) => {
        setTimeout( ()=> {
            canvas.style.transform = `rotate(${newDegrees}deg)`
        }, 420); 
    })

}

document.addEventListener('keydown', (event)=> {   

    let inputText = document.getElementById("text-val");

    if(inputText !== document.activeElement) {
        if(event.code === 'KeyA') {
            document.getElementById('add-frame-button').click();
        } else if(event.code === 'KeyD') {
            document.getElementById('delete-frame-button').click();
        }
    
        if(event.code === 'KeyE') {
            document.getElementById('player-frame-button').click();
        }
    
        if(event.code === 'KeyQ') {
            document.getElementById('rotate-button').click();
        }
    
        let selectFrame = document.getElementById('frames-select');
        let currentFrame = selectFrame.value;
        
        if(event.code === 'KeyW') {
            if(currentFrame !== '1')
               currentFrame--;
    
            selectFrame.value = currentFrame;
            printer(currentFrame);
        } else if(event.code === 'KeyS') {
            console.log(currentFrame + ' - ' + arrayFrames.length);
            if(currentFrame !== arrayFrames.length.toString()) 
                currentFrame++;
            
            selectFrame.value = currentFrame;
            printer(currentFrame);
        }
    
        if(event.code === 'KeyG') {
            saveData();
        }
    }
        

    
});

function generateData() {

}

function calculateDuration(i, arrayFrames) {
    let duration;

    if(i === 0) {
        duration = 2;
    } else {
        if(arrayFrames[i].duration === null) 
            duration = parseInt(document.getElementById('default-duration').value);
        else 
            duration = parseInt(arrayFrames[i].duration);
    }
    
    return duration;
}

function saveData() {
    let arrayInfoTest = [];
    let zip = new JSZip();

    let nameAnimation = document.getElementById("text-val").value;
    let fileContentAnimation = '';
    let folderPath = `${nameAnimation}/`;
    let duration = 0;

    for (let i = 0; i < arrayFrames.length; i++) {
        let fileName = `${i}`;
        let fileContent = '';

        duration += calculateDuration(i, arrayFrames); 
        fileContentAnimation += `schedule function anim-lights:${folderPath}${fileName} ${duration}t\n`;

        for (let j = 0; j < arrayFrames[i].info.length; j++) {
            let coords1 = arrayFrames[i].info[j].coords.replace(/~/g,'62');
            let coords2 = arrayFrames[i].info[j].coords.replace(/~/g,'61');
            let coords3 = arrayFrames[i].info[j].coords.replace(/~/g,'60');

            let block1 = arrayFrames[i].info[j].blocks[0];
            let block2 = arrayFrames[i].info[j].blocks[1];
            let block3 = arrayFrames[i].info[j].blocks[2];

            fileContent += `setblock ${coords1} minecraft:${block1}\n`;
            fileContent += `setblock ${coords2} minecraft:${block2}\n`;
            fileContent += `setblock ${coords3} minecraft:${block3}\n`;
        }

        zip.file(`${folderPath}${fileName}.mcfunction`, fileContent); //Storing file with a content
        
    }

    zip.file(`${folderPath}start.mcfunction`, fileContentAnimation);

    zip.generateAsync({type:"blob"})
        .then(function (blob) {
            saveAs(blob, `${nameAnimation}.zip`);
    });

    console.log(arrayInfoTest);
}

let coordSelectablesObj = document.getElementsByClassName('coordSelectable');
for (let i = 0; i < coordSelectablesObj.length; i++) 
    coordSelectablesObj[i].addEventListener('click', selectCoord, false);    