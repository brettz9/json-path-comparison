#!/usr/bin/env node

const jsonpath = require('./build/jsonpath_export');

const selector = process.argv[2];

const stdin = process.stdin,
      stdout = process.stdout,
      inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
    inputChunks.push(chunk);
});

stdin.on('end', function () {
    const input = inputChunks.join(),
          json = JSON.parse(input);

    const result = jsonpath(json, selector);

    if (result === false) {
        console.warn('jsonpath returned false, this might indicate an error');
        process.exit(1);
    }

    stdout.write(JSON.stringify(result));
});
