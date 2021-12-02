var util = require('util');
var bleno = require('../..');
var test = 0;

function CustomCharacteristic() {
  bleno.Characteristic.call(this, {
    uuid: 'beb5483e36e14688b7f5ea07361b26a8',
    properties: ['read', 'write', 'notify'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Custom advertisment description'
      })
    ]
  });

}

util.inherits(CustomCharacteristic, bleno.Characteristic);

CustomCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('CustomCharacteristic onWriteRequest');
  test++;
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length !== 2) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
    console.log('CustomCharacteristic update value: ', test);
    callback(this.RESULT_SUCCESS);
  }
};

CustomCharacteristic.prototype.onReadRequest = function(offset, callback) {
  test++;
  console.log('CustomCharacteristic update value: ', test);
  callback(this.RESULT_SUCCESS, Buffer.from([test]));
};

CustomCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('EchoCharacteristic - onSubscribe');
  registerNotificationCallBack(updateValueCallback);
};

CustomCharacteristic.prototype.onUnsubscribe = function() {
  console.log('EchoCharacteristic - onUnsubscribe');
  registerNotificationCallBack(null);
};

var localUpdateValueCallback = null;
var i = 0;
var tid = setTimeout(repeatCall, 1000);
function repeatCall() {
  i++;
  if (i > 254) i = 0;
  console.log('loop...',i);
  var data = Buffer.alloc(1);
  data.writeUInt8(i, 0);

  if (localUpdateValueCallback) {
      localUpdateValueCallback(data);
  }

  tid = setTimeout(repeatCall, 300); // repeat myself
}

function abortTimer() { // to be called when you want to stop the timer
  clearTimeout(tid);
}

function registerNotificationCallBack(_localUpdateValueCallback) {
  localUpdateValueCallback = _localUpdateValueCallback
}

module.exports = CustomCharacteristic;
