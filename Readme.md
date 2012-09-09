#predict


A super simple prediction module that only implement linear regression.

## Installation

	npm install predict

## Usage
	
	var predict = require('predict');
	//provide input to the linear regression the first array is y and the second is x
	var lr = predict.linearRegression([0,2,4,6],[0,1,2,3]);
	//predict the future result for the value x=4 
	var result = lr.predict(4);	
	//result will be y=8
