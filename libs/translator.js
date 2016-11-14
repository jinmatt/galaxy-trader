/**
 * Constants as representation of Decimal to Roman numerals(with edge cases) mapping
 */
const DECIMAL = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const ROMAN = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

/**
 * Intergalactic representation of credit units
 */
function IntergalacticUnit(decimal, roman) {
  this.decimal = decimal || null;
  this.roman = roman || null;

  // an Intergalactic unit can be mapped to special
  // objects like 'glob', 'prok', 'pish', 'tegj', etc. */
  this.symbol = null;
}

/**
 * Translator reference object
 */
function Translator() {
  this.dict = [];

  // Special metals
  this.iron = 1;
  this.silver = 1;
  this.gold = 1;

  // builds the Translator dict on construct call
  this.init();
}

/**
 * Initializes the Translator dict
 * @method init
 */
Translator.prototype.init = function () {
  for (var i = 0; i < DECIMAL.length; i++) {
    this.dict.push(new IntergalacticUnit(DECIMAL[i], ROMAN[i]));
  }
};

/**
 * Sets a symbol as reference to a roman letter/IntergalacticUnit
 * @method setSymbol
 * @param {string} symbol - things like 'glob', 'prok', 'pish', 'tegj', etc.
 * @param {string} roman
 * @return {IntergalacticUnit} intergalacticObject or -1 if not set
 */
Translator.prototype.setSymbol = function (symbol, roman) {
  var dictIndex = this.dict.findIndex(o => o.roman === roman);
  if (dictIndex === -1)
    return -1;
  this.dict[dictIndex].symbol = symbol;
  return this.dict[dictIndex];
};

/**
 * Set metal prices based on the credits calculate from assoicated symbols
 * @method setMetalPrice
 * @param {string} metal - can be Iron, Silver or Gold
 * @param {integer} creditFromSymbols - calculated value by adding symbols
 * @param {integer} totalCredits
 * @return {integer} metalPrice or -1 if not set
 */
Translator.prototype.setMetalPrice = function (metal, creditFromSymbols, totalCredits) {
  var metalName = metal.toLowerCase();

  // check whether it's a valid metal
  if (!['iron', 'silver', 'gold'].includes(metalName)) {
    return -1;
  }

  this[metalName] = totalCredits / creditFromSymbols;
  return this[metalName];
};

/**
 * Calculate credit based on given symbol combinations
 * @method calculate
 * @param {array} symbols - can be ['glob', 'pish', 'silver']
 * @return {integer} credits
 * @return {object} invalidSymbol - if unrecognisable symbols comes up
 */
Translator.prototype.calculate = function (symbols) {
  var credits = 0;
  var roman = '';
  var metalName = null;
  var intergalacticUnit = null;

  // if the last symbol is a metal
  if (['iron', 'silver', 'gold'].includes(symbols[symbols.length - 1].toLowerCase())) {
    metalName = symbols.pop().toLowerCase();
  }

  // Construct the Roman numeral format
  for (var i = 0; i < symbols.length; i++) {
    intergalacticUnit = this.dict.find(o => o.symbol === symbols[i]);
    if (intergalacticUnit) {
      roman += intergalacticUnit.roman;
    } else {
      return { invalidSymbol: symbols[i] };
    }
  }

  // Convert roman to decimal numbers
  for (i = 0; i < this.dict.length; i++) {
    while (roman.indexOf(this.dict[i].roman) === 0) {
      credits += this.dict[i].decimal;
      roman = roman.replace(this.dict[i].roman, '');
    }
  }

  // if metal conbination
  if (metalName) {
    credits = credits * this[metalName];
  }

  return credits;
};

module.exports = Translator;
