var util = require('util');
var bleno = require('../..');

var CustomCharacteristic = require('./custom-characteristic');

function CustomService() {
    bleno.PrimaryService.call(this, {
        uuid: '4fafc2011fb5459e8fccc5c9c331914b',
        characteristics: [
            new CustomCharacteristic()
        ]
    });
}

util.inherits(CustomService, bleno.PrimaryService);

module.exports = CustomService;
