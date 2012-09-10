"use strict";
var should = require('should');
var predict = require('../lib/main');

describe('predict package', function() {
    describe('linear regression', function() {
        it('Test a simple linear regression once', function() {
            var lr = predict.linearRegression([0,2,4,6,8],[0,1,2,3,4]);
            var result = lr.predict(5);
            result.should.eql(10);
        });
        it('Test a simple linear regression twice', function() {
            var lr = predict.linearRegression([0,1,2,3],[0,1,2,3]);
            var result = lr.predict(4);
            result.should.eql(4);
        });
    });
    describe('moving average', function() {
        it('Test simple moving average with data within the size of the buffer', function() {
            var ma = predict.movingAverage();
            ma.pushValues([2,4,6,8,10]);
            var result = ma.averageArray;
            result.should.eql([2,3,4,5,6]);
            ma.predictNextValue().should.eql(6);
        });
        it('Test simple moving average with data outside the size of the buffer', function() {
            var ma = predict.movingAverage(2);
            ma.pushValues([2,4,6,8,10]);
            var result = ma.averageArray;
            console.log(result);
            result.should.eql([2,3,5,7,9]);
            ma.predictNextValue().should.eql(9);
            ma.pushValues([20]);
            ma.predictNextValue().should.eql(15);
        });
    });
});