var arrayFireworkCommands = [];

selectAxesObj = document.getElementById('select-axe');
selectAxesObj.addEventListener('change', function() {

    let gridsArray = document.getElementsByTagName('table');
    let imageAxe = document.getElementById('currentAxe');

    for (let i = 0; i < gridsArray.length; i++) 
            gridsArray[i].style='display: none';
    
    for (let i = 0; i < gridsArray.length; i++) {
        if (this.value === gridsArray[i].id) {
            gridsArray[i].removeAttribute('style');
            imageAxe.src = `img/axes/${i}.png`;
        }   
    }
});

window.oncontextmenu = function (e)
{
    printTemporalPaint(e);
    return false;     // cancel default menu
}

function printCoordsEvents(e) {
    let objCoords = document.getElementById("coords");
    objCoords.innerText = e.target.innerText;
}

function printPaint(e) {
    let obj = e.target;
    let infoCommandObj = document.getElementById("amountOfCommands");

    if(obj.getAttribute("style")) { 
        for (let i = 0; i < arrayFireworkCommands.length; i++) {
            if(arrayFireworkCommands[i].includes(e.target.innerText))
                arrayFireworkCommands.splice(i, 1);
        }

        infoCommandObj.innerText = arrayFireworkCommands.length;
        obj.removeAttribute("style");

    } else {
        let paintings = document.getElementsByClassName('individual-painting');
        for (let i = 0; i < paintings.length; i++) {
            const paintObj = paintings[i].getElementsByTagName('input');

            if(paintObj.paint.checked === true) {
                const styleObj = paintings[i].getElementsByClassName('square-paintings')[0].getAttribute('style').toString(); //Get the style
                obj.style = styleObj; //Print the style on the clicked square

                const command = paintObj.paint.value; //Get the command
                const coords = obj.innerText;

                const newCommand = command.replace(/~ ~1 ~/g, coords).substring(1);
                arrayFireworkCommands.push(newCommand);
                infoCommandObj.innerText = arrayFireworkCommands.length;
            }
        }
    }

    let coords = obj.innerText;
    console.log('Coords: ' + coords);
}

async function printTemporalPaint(e) {
    e.preventDefault();
    let obj = e.target;
    console.log(obj.toString())

    if(!obj.getAttribute("class") && obj.toString().includes("TableCell"))  
        obj.classList.add("temporalPrint");
    else if(obj.getAttribute("class") && obj.toString().includes("TableCell"))
        obj.removeAttribute("class");
    
    let coords = obj.innerText;
    console.log('Coords: ' + coords);
}

function getCommandFromInput(event) {
    if (event.keyCode === 13) { //If user press Enter on Input Text Command
        let command = document.getElementById("command-input").value;
        validateCommand(command);
      }
}

function decimalToRgb(decimal) {
    return {
      red: (decimal >> 16) & 0xff,
      green: (decimal >> 8) & 0xff,
      blue: decimal & 0xff,
    };
  }



function readCommand(command) {
    obj = {
        type: '',
        trail: '',
        flicker: '',
        colors: [],
        command: command
    }

    if(command.includes('Type:0')) obj.type = '0';
    else if(command.includes('Type:1')) obj.type = '1';
    else if(command.includes('Type:2')) obj.type = '2';
    else if(command.includes('Type:3')) obj.type = '3';
    else if(command.includes('Type:4')) obj.type = '4';

    if(command.includes('Flicker:0')) obj.flicker = '0'
    else if(command.includes('Flicker:1')) obj.flicker = '1'

    if(command.includes('Trail:0')) obj.trail = '0'
    else if(command.includes('Trail:1')) obj.trail = '1'

    if(command.includes('Colors:')) {
        let stringColorMatch = command.match(/Colors:\[.+?\]/g).join(); //This match all decimal colors from the command (Colors:I[123,456,789] , Colors:I[987,654])
        const decimalColorsArray = stringColorMatch.split(',');

        
            for (let i = 0; i < decimalColorsArray.length; i++) 
            decimalColorsArray[i] = decimalColorsArray[i].replace(/\D/g, ''); //Delete all characters except numbers
        
            console.log('New array: ' + decimalColorsArray)

            const rgbColorsArray = [];

            if(!command.includes(',Colors:[') && command.includes('FadeColors:[')) 
                rgbColorsArray.push( decimalToRgb(1973019));

            for (let i = 0; i < decimalColorsArray.length; i++) 
                rgbColorsArray.push( decimalToRgb(decimalColorsArray[i]) );

            for (let i = 0; i < rgbColorsArray.length; i++) 
                obj.colors[i] = rgbColorsArray[i];
            
        }

        return obj;
    }

function modifyCommand(command) {
    command = command.replace(/LifeTime:[0-9][0-9]/g,'LifeTime:0'); //This change the fireworks duration to 0
    return command;
}

function validateCommand(command) {
    if(command.includes('/summon firework_rocket ~ ~1 ~') && command.includes('id:firework_rocket') && command.includes('Type:') && command.includes('Flicker:') && command.includes('Trail:')) {
        let newCommand = modifyCommand(command);
        let infoCommand = readCommand(newCommand);
        let style = iconVisualConstructor(infoCommand);
        createNewPaintSelectable(style, infoCommand);
        console.log(infoCommand);
        //console.log(command);
  
    } else {
        console.log(`It's not a valid command`);
    }
}

function iconVisualConstructor(infoCommand) {
    let styleString = "";
    let typeImage = "";

    /* Type */
    if(infoCommand.type === '0') typeImage = "img/smallball.png";
    if(infoCommand.type === '1') typeImage = "img/largeball.png";
    if(infoCommand.type === '2') typeImage = "img/star.png";
    if(infoCommand.type === '3') typeImage = "img/creeper.png";
    if(infoCommand.type === '4') typeImage = "img/burst.png";

    styleString += `background-image: url('${typeImage}'),`;

    /* Colors */

    styleString += `linear-gradient(`
    if(infoCommand.colors.length === 1) {
        styleString += `rgb(${infoCommand.colors[0].red},${infoCommand.colors[0].green},${infoCommand.colors[0].blue}), `;
        styleString += `rgb(${infoCommand.colors[0].red},${infoCommand.colors[0].green},${infoCommand.colors[0].blue}) `;
    } else {
        for (let i = 0; i < infoCommand.colors.length; i++) {
            styleString += `rgb(${infoCommand.colors[i].red},${infoCommand.colors[i].green},${infoCommand.colors[i].blue})`;
    
            if(i !== infoCommand.colors.length - 1)
                styleString += `, `;
        }
    }

    styleString += `); `;
    

    if(infoCommand.trail === '1' && infoCommand.flicker === '0') styleString += `outline: 3px solid black; outline-offset: -4px;`;
    else if(infoCommand.trail === '0' && infoCommand.flicker === '1') styleString += `outline: 3px dashed black; outline-offset: -4px;`;
    else if(infoCommand.trail === '1' && infoCommand.flicker === '1') styleString += `outline: 7px double black; outline-offset: -5px;`;

    return styleString;
}

function createNewPaintSelectable(styleString, infoCommand) {
    let paintObject = document.getElementById("paints");

    let paintings = document.getElementsByClassName('individual-painting');
    console.log(paintings);
    console.log('Tamaño' + paintings.length);

    paintObject.innerHTML += `
    <div class="individual-painting">
        <input type="radio" id="${paintings.length + 1}" name="paint" value="${infoCommand.command}" checked>
        <label for="${paintings.length + 1}"><div style="${styleString}" class="square-paintings"></div></label>
    </div>
    `;
}

let inputCommand = document.getElementById("command-input");
inputCommand.addEventListener("keyup", getCommandFromInput, false);

/*function download() {
    let name = 'test.mcfunction';
    let text = arrayFireworkCommands.toString();
    let type = 'text/plain';
    var a = document.getElementById("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;

    var file = new File(["foo"], "foo.txt", {
        type: "text/plain",
      });
  }*/


  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }


  // Start file download.
document.getElementById("dwn-btn").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
    let customFileName = document.getElementById("text-val").value + '.mcfunction';
    let filename = "firework.mcfunction";

    let data = arrayFireworkCommands.join('\r\n');
    
    if(customFileName.length > 11)
        download(customFileName, data);
    else 
        download(filename, data);
}, false);


var inputNameFile = document.getElementById("text-val");

// Execute a function when the user releases a key on the keyboard
inputNameFile.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("dwn-btn").click();
  }
});



