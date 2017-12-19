#!/usr/bin/env node

var pg = require('pg');
var fs = require('file-system');

var conString = 'pg://localhost:5432/amazon';

var client = new pg.Client(conString);
client.connect();

