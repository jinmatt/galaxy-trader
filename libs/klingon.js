/**
 * Input language parser helper lib
 */

// Module dependencies
const transactType = require('../consts/transact-type');

/**
 * Input language parser
 */
function Klingon() {
  this.setSymbolRegex = /^([\w]+)\ is\ ([A-Z]{1,2})$/;
  this.setMetalPriceRegex = /^([a-zA-z ]+)\ ([I|i]ron|[S|s]ilver|[G|g]old)\ is\ ([\d]+)\ [C|c]redits$/;
  this.calculateCreditsRegex = /^([H|h]ow much|[H|h]ow many [C|c]redits)\ is\ ([a-zA-z ]+)(\??)$/;
}

/**
 * Accepts an input line and returns parsed components and type of statement
 * @method parse
 * @param {string} text - e.g. 'glob is I'
 * @return {object} - with input statement type and parsed params
 */
Klingon.prototype.parse = function (text) {
  var parsed = [];
  if (this.setSymbolRegex.test(text)) {
    parsed = this.setSymbolRegex.exec(text);
    return {
      type: transactType.SET_SYMBOL,
      symbol: parsed[1],
      romainLetter: parsed[2],
    };
  }

  if (this.setMetalPriceRegex.test(text)) {
    parsed = this.setMetalPriceRegex.exec(text);
    return {
      type: transactType.SET_METAL_PRICE,
      symbols: parsed[1].split(' '),
      metal: parsed[2],
      knownCredit: parseInt(parsed[3]),
    };
  }

  if (this.calculateCreditsRegex.test(text)) {
    parsed = this.calculateCreditsRegex.exec(text);
    return {
      type: transactType.CALCULATE_CREDITS,
      symbolsAndMetals: parsed[2].trim().split(' '),
    };
  }

  return {
    type: transactType.UNKNOWN,
  };
};

module.exports = Klingon;
