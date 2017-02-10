#!/usr/bin/env node

const fs = require('fs');

// Load custom config
const path = __dirname + '/config.js';
const config = fs.existsSync(path) ? require(path) : {};

require('./app/comet/server')(config);