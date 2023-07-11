// ==UserScript==
// @name         Github links: Open in new tab
// @namespace    io.kuc.ben
// @version      1.1
// @description  Open all links from github in new tab.
// @author       bkucera,powersee
// @match        https://github.com/*
// ==/UserScript==

(function() {
    'use strict';
    document.addEventListener('click', (e)=>{
        const aEl = e.path.find(el => el.tagName === 'A')
        if (aEl) {
            aEl.target = '_blank'
        }
    })
})();