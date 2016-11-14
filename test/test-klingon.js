/**
 * Tests for translator lib
 */

// Module dependencies
var chai = require('chai');
var Klingon = require('../libs/klingon');
const transactType = require('../consts/transact-type');

var expect = chai.expect;
var klingon = new Klingon();

describe('Klingon functions', function () {
  describe('#parse()', function () {
    it('should return object with `transactType.UNKNOWN` when invalid statement is passed', function () {
      var statementType = klingon.parse('how much wood could a woodchuck chuck if a woodchuck could chuck wood?');
      expect(statementType).to.have.property('type', transactType.UNKNOWN);
    });

    it('should return object with `transactType.SET_SYMBOL` for a statement like `glob is I`', function () {
      var statementType = klingon.parse('glob is I');
      expect(statementType).to.contain.all.keys({
        type: transactType.SET_SYMBOL,
        symbol: 'glob',
        romainLetter: 'I',
      });
    });

    it('should return object with `transactType.SET_METAL_PRICE` for a statement like `glob glob Silver is 34 Credits`', function () {
      var statementType = klingon.parse('glob glob Silver is 34 Credits');
      expect(statementType).to.contain.all.keys({
        type: transactType.SET_METAL_PRICE,
        symbols: ['glob', 'glob'],
        metal: 'Silver',
        knownCredit: 34,
      });
    });

    it('should return object with `transactType.CALCULATE_CREDITS` for a statement like `how many Credits is glob prok Silver`', function () {
      var calcStatementType1 = klingon.parse('how many Credits is glob prok Silver');
      expect(calcStatementType1).to.contain.all.keys({
        type: transactType.CALCULATE_CREDITS,
        symbolsAndMetals: ['glob', 'prok', 'Silver'],
      });

      var calcStatementType2 = klingon.parse('how much is pish tegj glob glob ?');
      expect(calcStatementType1).to.contain.all.keys({
        type: transactType.CALCULATE_CREDITS,
        symbolsAndMetals: ['pish', 'tegi', 'glob', 'glob'],
      });
    });
  });
});
