#!/usr/bin/env node

/**
 * Intergalactic transaction translator app
 */

// Module dependencies
var Translator = require('./translator');

var translator = new Translator();
translator.setSymbol('glob', 'I');
translator.setSymbol('prok', 'V');
translator.setSymbol('pish', 'X');
translator.setSymbol('tegj', 'L');

// Test cases
var str = 'pish tegj glob glob';
console.log(translator.calculate(str.split(' ')));

var symbolMetal = 'glob glob';
console.log(translator.setMetalPrice('Silver', translator.calculate(symbolMetal.split(' ')), 34));

var metalCombo = 'glob prok Silver';
console.log(translator.calculate(metalCombo.split(' ')));
