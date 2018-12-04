const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, fd) => {
    if (err) throw err;

    const measurements = fd.split('\n');
    
    // Remove the last line which is empty.
    measurements.pop();

    result = findOverlappingSlices(measurements);
});


