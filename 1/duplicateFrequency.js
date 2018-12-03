const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, fd) => {
    if (err) throw err;

    const testList = fd.split('\n');

    let result = findFirstDuplicateResult(testList);

    console.log(result);
});


function findFirstDuplicateResult(fd) {
    let frequencyRunningValueDictionary = {};
    let frequencyRunningValue = 0;
    fd.pop();
    const frequency = fd.map((frequencyValue) => {
        let isNegative = frequencyValue.indexOf('-') > -1;

        if(!isNegative) {
            frequencyValue = frequencyValue.substring(1);
        }

        return Number(frequencyValue);
    });
    let i = 0;
    do {
        if(i === frequency.length)
            i = 0;

        frequencyRunningValue += frequency[i];

        console.log(`frequencyRunningValueDictionary[${frequencyRunningValue}] ${frequencyRunningValueDictionary[frequencyRunningValue]}`);

        if(frequencyRunningValueDictionary[frequencyRunningValue] === true) {
            console.log(frequencyRunningValue);
            return frequencyRunningValue;
        }

        frequencyRunningValueDictionary[frequencyRunningValue] = true;

        i++;
    }while(true)
}