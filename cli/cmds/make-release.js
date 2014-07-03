/*
 * Copyright 2014, Gregg Tavares.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Gregg Tavares. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";

var path = require('path');
var utils = require('../utils');
var release = require('../../management/release');

var makeRelease = function(args) {
  if (args._.length < 2) {
    utils.badArgs(module, "missing dstPath");
  }

  if (args._.length > 2) {
    utils.badArgs(module, "too many arguments");
  }

  var destPath = path.resolve(args._[1]);
  var fullPath = args.src ? path.resolve(args.src) : process.cwd();

  release.make(fullPath, destPath, function(err, files) {
    if (err) {
      console.error("ERROR: " + err);
      process.exit(1);
    }
    if (args.json) {
      console.log(JSON.stringify(files, undefined, "  "));
    } else {
      files.forEach(function(file) {
        console.log("created " + file.filename);
      });
    }
  });
};

exports.usage = [
  "dstpath",
  "",
  "make-release can be used see what data will be in a release. Example:",
  "",
  "   hft make-release /tmp",
  "",
  "Normally releases are made at publish time",
  "",
  "options:",
  "",
  "    --src=srcpath: path to source. If not supplied assumes current working directory.",
  "    --json:        format output as json",
].join("\n");
exports.cmd = makeRelease;


