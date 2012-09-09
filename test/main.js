"use strict";
var should = require('should');
var predict = require('../lib/main');

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