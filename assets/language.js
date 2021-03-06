/*

Copyright (C) 2021 ππ€ππ²π²π» π‘πΆπΉππ.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const QueenNilu = require('queennilu-public');
const build = QueenNilu.build
const fs = require('fs');
const chalk = require('chalk');

if (fs.existsSync('./language/' + build.LANG + '.json')) {
    console.log(
        chalk.green.bold('π Loading ' + build.LANG + ' language..')
    );

    var json = JSON.parse(fs.readFileSync('./language/' + build.LANG + '.json'));
} else {
    console.log(
        chalk.red.bold('You entered an invalid language. English language was chosen.')
    );

    var json = JSON.parse(fs.readFileSync('./language/EN.json'));
}

function getString(file) {
    return json['STRINGS'][file];
}

module.exports = {
    language: json,
    getString: getString
}