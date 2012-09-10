"use strict";
var predict = {};

//prediction using simple linear regression
//http://en.wikipedia.org/wiki/Simple_linear_regression
predict.linearRegression =  function (y,x){
        var lr = {};
        var n = y.length;
        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        var sum_yy = 0;
        for (var i in y) {           
            sum_x += x[i];
            sum_y += y[i];
            sum_xy += (x[i]*y[i]);
            sum_xx += (x[i]*x[i]);
            sum_yy += (y[i]*y[i]);
        }; 
        lr.slope = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
        lr.intercept = (sum_y - lr.slope * sum_x)/n;
        lr.r2 = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);
        lr.predict = function (x) { return this.slope * x + this.intercept; };        
        return lr;
};

//prediction using moving average. The buffer size is 10 by default
//http://en.wikipedia.org/wiki/Moving_average
predict.movingAverage =  function (bufferSize){
    if(bufferSize && bufferSize < 2){
        throw new Error('buffer size needs to be greater than 2');
    };
    var movingAverage = {};
    if(!bufferSize){
        //default to 10
        bufferSize = 10;    
    };
    movingAverage.bufferSize = bufferSize;
    movingAverage.averageArray = [];
    movingAverage.inputData = [];
    movingAverage.predictNextValue = function(){
        return this.averageArray[this.averageArray.length-1];
    }; 
    movingAverage.pushValues = function(values){
        for(var i in values){
             console.log('input length '+this.inputData.length);
             console.log('buffer size '+this.bufferSize);
            //first input
            if(this.averageArray.length===0){
                console.log('first input start');
                this.averageArray.push(values[i]);  
                this.inputData.push(values[i]);  
                console.log('first input done');
            }else if(this.inputData.length<this.bufferSize){
                //case where the input array is less than the buffer size
                console.log('less than buffer size start');
                var currentBufferSize =  this.inputData.length;
                this.inputData.push(values[i]);  
                var priorAverage = this.averageArray[this.averageArray.length-1];
                console.log('old priorAverage'+priorAverage);
                this.averageArray.push( ( (priorAverage*currentBufferSize) + values[i] ) / (currentBufferSize+1) );
                var average = this.averageArray[this.averageArray.length-1];
                console.log('new priorAverage '+average);
                console.log('less than buffer size done');
            }else{
                //case of the moving average
                console.log('greater than buffer size start');
                var firstData = this.inputData.shift();
                this.inputData.push(values[i]);  
                var priorAverage = this.averageArray[this.averageArray.length-1];
                console.log('old priorAverage step 1 : '+priorAverage);
                priorAverage = ( ( (priorAverage * (this.bufferSize) ) - firstData ) / (this.bufferSize -1)) ; 
                console.log('old priorAverage step 2 : '+priorAverage);
                this.averageArray.push( ( (priorAverage*(this.bufferSize-1)) + values[i] ) / this.bufferSize  ) ;
                var average = this.averageArray[this.averageArray.length-1];
                console.log('new priorAverage '+average);
                console.log('greater than buffer size done');
            };
        };
    };     
    return movingAverage;
};

module.exports = predict;