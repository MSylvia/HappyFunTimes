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

requirejs(
  [ 'hft/hft-system',
    'hft/misc/strings',
  ], function(
    HFTSystem,
    Strings) {

  var $ = function(id) {
    return document.getElementById(id);
  };

  var gamemenu = $("gamemenu");
  var nogames  = $("nogames");
  var template = $("item-template").text;
  var oldHtml = "";

  var hftSystem = new HFTSystem();
  hftSystem.on('runningGames', function(obj) {
console.log(obj);
    // If there's only one game just go to it.
    if (obj.length == 1 && obj[0].controllerUrl) {
      window.location.href = obj[0].controllerUrl;
      return;
    }

    var items = [];
    for (var ii = 0; ii < obj.length; ++ii) {
      var game = obj[ii];
      var runtimeInfo = game.runtimeInfo;
      if (!runtimeInfo) {
      } else {
        var hftInfo = runtimeInfo.info.happyFunTimes;
        // Not sure how I should figure out the name and screenshot.
        var basePath = game.controllerUrl.substring(0, game.controllerUrl.lastIndexOf('/') + 1);
        var dev = (runtimeInfo.originalGameId != hftInfo.gameId) ? "(*)" : "";
        game.name = dev + (hftInfo.name || runtimeInfo.originalGameId);
        game.screenshotUrl = game.screenshotUrl;
        items.push(Strings.replaceParams(template, game));
      }
    }
    var html = items.join("");
    if (html != oldHtml) {
      oldHtml = html;
      gamemenu.innerHTML = html;
    }

    nogames.style.display = items.length ? "none" : "block";

  });
});


