'use strict';

function thankYou(payload) {
  console.log('Thank you for your order ' + payload.data.customer);
}

module.exports = thankYou;