#!/usr/bin/env node

var pg = require('pg');

var conString = 'pg://localhost:5432/amazon';

var client = new pg.Client(conString);
client.connect();

module.exports = client;
