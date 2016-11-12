/**
 * Credit Unit Object
 */
function CreditUnit(decimal, romain) {
  this.decimal = decimal || null;
  this.romain = romain || null;
  this.symbol = null;
}

/**
 * Credit Object as a reference array
 */
function Credit() {
  this.reference = [];
  this.iron = 1;
  this.silver = 1;
  this.gold = 1;
  this.init();
}

/**
 * Initializes credit system with Romain letters and returns it as a reference array
 * @return {array} creditDict
 */
Credit.prototype.init = function () {
  var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var romain = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

  for (var i = 0; i < decimal.length; i++) {
    this.reference.push(new CreditUnit(decimal[i], romain[i]));
  }
};

/**
 * Sets a symbol as a reference to a romain letter
 * @param {string} romain
 * @param {string} symbol
 * @return {integer} -1 or 0, if not set or set
 */
Credit.prototype.setSymbol = function (romain, symbol) {
  var creditDictIndex = this.reference.findIndex(o => o.romain === romain);
  if (creditDictIndex === -1)
    return -1;
  this.reference[creditDictIndex].symbol = symbol;
  return 0;
};

/**
 * Set metal prices based on the credits calculate from assoicated symbols
 * @param {string} metal, can be Iron, Silver or Gold
 * @param {integer} symbolsCredits
 * @param {integer} totalCredits
 * @return {integer} value, the set value or -1 if not set
 */
Credit.prototype.setMetalPrice = function (metal, symbolsCredits, totalCredits) {
  var metalName = metal.toLowerCase();

  // check whether it's a valid metal
  if (!['iron', 'silver', 'gold'].includes(metalName)) {
    return -1;
  }

  this[metalName] = totalCredits / symbolsCredits;
  return this[metalName];
};

/**
 * Calculate credit based on given symbol combinations
 * @param {array} symbols
 * @param {integer} credits
 */
Credit.prototype.calculate = function (symbols) {
  var credits = 0;
  var romain = '';
  var metalName = null;

  // if the last symbol is a metal
  if (['iron', 'silver', 'gold'].includes(symbols[symbols.length - 1].toLowerCase())) {
    metalName = symbols.pop().toLowerCase();
  }

  // Construct the romain format
  for (var i = 0; i < symbols.length; i++) {
    var creditUnit = this.reference.find(o => o.symbol === symbols[i]);
    if (creditUnit) {
      romain += creditUnit.romain;
    }
  }

  // Convert romain to decimal numbers
  for (i = 0; i < this.reference.length; i++) {
    while (romain.indexOf(this.reference[i].romain) === 0) {
      credits += this.reference[i].decimal;
      romain = romain.replace(this.reference[i].romain, '');
    }
  }

  // if metal conbination
  if (metalName) {
    credits = credits * this[metalName];
  }

  return credits;
};

var credit = new Credit();
credit.setSymbol('I', 'glob');
credit.setSymbol('V', 'prok');
credit.setSymbol('X', 'pish');
credit.setSymbol('L', 'tegj');

var str = 'pish tegj glob glob';
console.log(credit.calculate(str.split(' ')));
var symbolMetal = 'glob glob';
console.log(credit.setMetalPrice('Silver', credit.calculate(symbolMetal.split(' ')), 34));
var metalCombo = 'glob prok Silver';
console.log(credit.calculate(metalCombo.split(' ')));
