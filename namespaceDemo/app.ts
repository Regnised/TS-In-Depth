/// <reference path="utility-functions.ts" />

import util = Utility.Fees;
const result = util.calculateFee(12);

console.log(result);

const result2 = Utility.maxBooksAllowed(20);
console.log(result2);
