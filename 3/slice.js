const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, fd) => {
    if (err) throw err;

    const measurementClaims = fd.split('\n');
    
    // Remove the last line which is empty.
    measurementClaims.pop();

    const measurementClaimObjectList = [measurementClaims[6]].map((claim) => mapMeasurements(claim));
    
    // console.log(JSON.stringify(measurementClaimObjectList[0]));

    const maps = measurementClaimObjectList.map((measurementObject) => drawMeasurement(measurementObject));

    console.log(maps);

    result = findOverlappingSlices(measurementClaims);
});

function findOverlappingSlices() {

}

function mapMeasurements(claim) {
    let claimPartList = claim.replace(/[:@\r]/g, '').split(' ');
    console.log(claimPartList);

    return {
        "id" : claimPartList[0].split('#')[1],
        "top" : Number(claimPartList[2].split(',')[0]),
        "left" : Number(claimPartList[2].split(',')[1]),
        "size" : {
            "x" : Number(claimPartList[3].split('x')[0]),
            "y" : Number(claimPartList[3].split('x')[1])
        }
    };
}

function drawMeasurement(measurement) {
    console.log(`Measurement: ${JSON.stringify(measurement)}`);
    let xSize = 0;
    let ySize = 0;
    
    let yBuffer = measurement.top;
    let xBuffer = measurement.left;

    let mapHeight = yBuffer * 2;
    let mapWidth = xBuffer * 2;

    let mapString = [];

    for(let y = 0; y < mapHeight; y++) {
        let row = '';
        // console.log(`y >= yBuffer && ySize <= measurement.size.y: ${y >= yBuffer && ySize <= measurement.size.y}, y: ${y}, yBuffer: ${yBuffer}, ySize: ${ySize}, measurement.size.y: ${measurement.size.y}`);
        // if(y >= yBuffer) {
        //     if(ySize <= measurement.size.y){
        //         row += ('#');
        //         ySize++;
        //     }
        // }
        // else {            
        //     row += ('.');
        // }
        for(let x = 0; x < mapWidth; x++) {
            // console.log(`x >= xBuffer && xSize <= measurement.size.x: ${x >= xBuffer && ySize <= measurement.size.x}, x: ${x}, xBuffer: ${xBuffer}, xSize: ${xSize}, measurement.size.x: ${measurement.size.x}`);
            if(y >= yBuffer) {
                if(x >= xBuffer) {
                    if(xSize <= measurement.size.x) {
                        row += ('#');
                        xSize++;
                    }
                }
            }
            else {
                row += ('.');
            }
        }
        mapString.push(row);
    }

    return mapString;
}