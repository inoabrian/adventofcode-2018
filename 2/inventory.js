const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, fd) => {
    if (err) throw err;

    const inventoryList = fd.split('\n');
    
    // Remove the last line which is empty.
    inventoryList.pop();

    let result = findFabricBoxIds(inventoryList);

    console.log(`part 1 result: ${result['2'].length * result['3'].length}`);

    let result2 = findPart2(result['2'].concat(result['3']));

    console.log(`part 2 result: ${result2}`);
});

// get every id
// go through every letter
// sum up letter counts in a dictionary for each id
// find ids which have 2+


function findFabricBoxIds(inventory) {
    let inventoryDictionary = { 
        '2' : [],
        '3' : []
    };

    for(let i = 0; i < inventory.length; i++) {
        let id = inventory[i];

        let letterCountDictionary = getIdLetterCount(id);      

        const letterCountInformation = Object.keys(letterCountDictionary);

        for(let j = 0; j < letterCountInformation.length; j++) {
            let key = letterCountInformation[j];

            if(letterCountDictionary[key] == 2 && inventoryDictionary['2'].indexOf(id) < 0) {
                inventoryDictionary['2'].push(id);
            }

            if(letterCountDictionary[key] == 3 && inventoryDictionary['3'].indexOf(id) < 0) {
                inventoryDictionary['3'].push(id);
            }
        }
    }
    
    return inventoryDictionary;
}

function getIdLetterCount(identification) {
    let letterCount = { };
    let id = identification.split('').sort().join('');

    for(let x = 0; x < id.length; x++) {
        let idLetter = id[x];

        if(letterCount[idLetter] !== undefined) {
            letterCount[idLetter]++;
        } else {
            letterCount[idLetter] = 1;
        }
    }

    return letterCount;
}



/* 
    PART 2
*/

// start from left of list
// [abc, acc, def] 
// abc, acc
// abc, def
function findPart2(possibleIDs) {
    let result = [];

    for(let i = 0; i < possibleIDs.length; i++) {
        let leftCompare = possibleIDs[i];

        for(let p = i; p < possibleIDs.length; p++) {
            let rightCompare = possibleIDs[p];
            let differenceIndexes = [];

            for(let a = 0; a < leftCompare.length; a++) {

                if(leftCompare[a] !== rightCompare[a]){
                    differenceIndexes.push(a);
                }
            }

            if(differenceIndexes.length === 1) {
                let diff = differenceIndexes[0];

                let match = leftCompare.split('').filter((v,i) => i !== diff).join('');

                if(result.indexOf(match) < 0)
                    result.push(match);
            }
        }
    }

    return result;
}