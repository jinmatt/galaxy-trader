#!/usr/bin/env node

/**
 * Intergalactic transaction translator app
 */

// Module dependencies
var readline = require('readline');
var fs = require('fs');
var Translator = require('./libs/translator');
var Klingon = require('./libs/klingon');
const transactType = require('./consts/transact-type');

var translator = new Translator();
var klingonParser = new Klingon();
var inputFile;
var transactOutput = [];

// Handle if no cli arguments passed
if (process.argv.length <= 2) {
  console.log('Usage: galaxy-trader inputFile');
  process.exit(-1);
}

// Check whether file accessible or not
inputFile = process.argv[2];
fs.stat(inputFile, (err, stats) => {
  if (err) {
    console.log('No file named ' + inputFile + ' exists or accessible.');
    process.exit(-1);
  }
});

var rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2]),
});

/**
 * Process statements line by line
 */
rl.on('line', (line) => {
  var statement = klingonParser.parse(line);

  switch (statement.type) {
    case transactType.SET_SYMBOL:
      var validRomainLetter = translator.setSymbol(statement.symbol, statement.romainLetter);
      if (validRomainLetter === -1) {
        transactOutput.push(statement.romainLetter + ' is not a valid Romain numeral');
      }
      break;
    case transactType.SET_METAL_PRICE:
      translator.setMetalPrice(statement.metal, translator.calculate(statement.symbols), statement.knownCredit);
      break;
    case transactType.CALCULATE_CREDITS:
      var symbolsAndMetals = statement.symbolsAndMetals.join(' ');
      var totalCredits = translator.calculate(statement.symbolsAndMetals);
      if (typeof totalCredits !== 'number') {
        transactOutput.push('I don\'t know what ' + totalCredits.invalidSymbol + ' is')
        break;
      }
      transactOutput.push(symbolsAndMetals + ' is ' + totalCredits + ' Credits');
      break;
    default:
      transactOutput.push('I have no idea what you are talking about');
  }
});

/**
 * Show proccessed transactions
 */
rl.on('close', () => {
  transactOutput.forEach((meaningfulLine) => {
    console.log(meaningfulLine);
  });
});
