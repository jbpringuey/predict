#predict

[![Build Status](https://secure.travis-ci.org/jbpringuey/predict.png)](http://travis-ci.org/jbpringuey/predict)

A simple prediction module that implements:

Simple linear regression for basic forecasting http://en.wikipedia.org/wiki/Simple_linear_regression

Moving average to predict next value and remove noize http://en.wikipedia.org/wiki/Moving_average

## Installation

	npm install predict

## Usage
	
	var predict = require('predict');
	//provide input to the linear regression the first array is y and the second is x
	var lr = predict.linearRegression([0,2,4,6],[0,1,2,3]);
	//predict the future result for the value x=4 
	var result = lr.predict(4);	
	//result will be y=8
