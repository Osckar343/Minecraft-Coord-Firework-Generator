/* I don't want to spend lots of time with this, so this code is very very inneficient*/


        //printCoords(0, -93, 53, 64); //Right axe GOOD
        //printCoords(1, -93, 129, 64); //Left Axe GOOD
        //printCoords(2, 53, -169, 64); //Straight Axe GOOD
        //printCoords(3, 53, -93, 64); //Back Axe GOOD

function printCoords(axe, coordHorizontalBase, coordApplicateBase, coordVerticalBase) {

    const divisor = 9;
    const distanceX = 3;
    const gridLimitX = 27 * distanceX;
    const gridLimitY = 45;
    let referenceDivisor = 0;
    let grid = "";
    let z = coordApplicateBase;

    grid += `<table id="grid-axe-${axe}">`

    //Creating the grid base
    for (let y = coordVerticalBase + gridLimitY - 1; y >= coordVerticalBase ; y--) {
        referenceDivisor = 0;
        z = coordApplicateBase;
        grid += "<tr>"
        for (let x = Math.abs(coordHorizontalBase); x < gridLimitX +  Math.abs(coordHorizontalBase) - 1; x++) {
            if(axe === 0)
                grid += `<td>${(Math.abs(x) * -1) - 1} ${y} ${z}</td>`;
            else if(axe === 1)
                grid += `<td>${(Math.abs(x) * -1) - 1} ${y} ${z}</td>`;
            else if(axe === 2)
                grid += `<td>${z - 1} ${y} ${Math.abs(x)}</td>`;
            else if(axe === 3)
                grid += `<td>${z - 1} ${y} ${Math.abs(x)}</td>`;

            /* X axe */
            if(x == Math.abs(coordHorizontalBase)) {
                x += 2;
            }
            else if(referenceDivisor == divisor - 1) {
                x += 2;
            }
            else if(referenceDivisor >= divisor && referenceDivisor <= ((divisor * 2) - 2)) {
                x = x;
            }
            else if(referenceDivisor == (divisor * 2) - 1) {
                x += 2
            } 
            else if(referenceDivisor == (divisor * 3) - 2) {
                x += 2;
            }
            else {
                x += distanceX;
            }

            /* Z axe */
            if(referenceDivisor < divisor) {
                if(axe === 1 || axe === 3)
                    z++;
                else
                    z--;
            }
            else if(referenceDivisor >= divisor && referenceDivisor <= ((divisor * 2) - 2)){
                z = z;
            }
            else if(referenceDivisor >= (divisor * 2) - 2) {
                if(axe === 1 || axe === 3)
                    z--;
                else
                    z++;
            } 
                
            referenceDivisor++;
        }
        grid += "</tr>";
    }
    grid += "</table>";

    document.getElementById("grid").innerHTML += grid;

    if(axe === 0 || axe === 2) {
        $('table tr').each(function() {
            var tds = $(this).children('td').get().reverse();
            $(this).append(tds);
        });
    }
}