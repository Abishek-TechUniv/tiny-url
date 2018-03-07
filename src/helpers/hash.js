const md5 = require('md5');
const bases = require('bases');

module.exports = str => bases.toBase62(bases.fromBase16(md5(str)));
