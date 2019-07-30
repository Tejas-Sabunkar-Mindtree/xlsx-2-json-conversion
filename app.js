xlsxj = require("xlsx-to-json");
readXlsxFile = require('read-excel-file/node');

const schema = {
    'actions': {
        prop: 'actions',
        parse(value) {
            return value;
        }
    }
}

const regEx = new RegExp('^(?!\s*$)(?:retrieve|subscribe|delete|perform|update|notify| )+$');

readXlsxFile('./sample.xlsx', { schema }).then(({ rows }) => {
    let rowsNotMatched = 0;
    rows.forEach(element => {
        if (!regEx.test(element.actions)) {
            rowsNotMatched++;
        }
    });
    if (rowsNotMatched === 0) {
        xlsxj({
            input: "sample.xlsx",
            output: "mapper.json"
        }, function (err, result) {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
            }
        });
    } else {
        console.log('Excel contains invalid actions');
    }
})

// xlsxj({
//     input: "sample.xlsx",
//     output: "mapper.json"
// }, function (err, result) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(result);
//     }
// });

