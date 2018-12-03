const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, fd) => {
    if (err) throw err;

    const testList = fd.split('\n');

    let result = calculateFrequencyValue(testList);

    console.log(result);
});


function calculateFrequencyValue(fd) {
    return fd.map((frequencyValue) => {
        let isNegative = frequencyValue.indexOf('-') > -1;

        if(!isNegative) {
            frequencyValue = frequencyValue.substring(1);
        }

        return Number(frequencyValue);
    })
    .reduce((prev, currentValue) => {
        return prev + currentValue;
    });
}