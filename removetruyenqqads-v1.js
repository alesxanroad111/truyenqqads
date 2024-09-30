// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-09-30
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    // Function to remove the popup
    function removePopup() {
        const popup = document.getElementById('popup-truyenqq');
        if (popup) {
            popup.remove();
        }
    }

    function removeBottomAds() {
        const BottomAds = document.getElementsByClassName('catfish-content');
        if (BottomAds.length > 0) {
            // Loop through all found ads and remove them
            for (let i = 0; i < BottomAds.length; i++) {
                BottomAds[i].remove();
            }
        }
    }

    function removeBannerAds() {
        const BannerAds = document.getElementsByClassName('banner');
        if (BannerAds.length > 0) {
            // Loop through all found ads and remove them
            for (let i = 0; i < BannerAds.length; i++) {
                BannerAds[i].remove();
            }
        }
    }

    function removeScript() {
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const scriptSrc = scripts[i].src;
            // Check if the script src contains the specific domain or part of the URL
            if (scriptSrc.includes('ads.mxhnkn.pro/popup/')) {
                scripts[i].remove();
            }
        }
    }

    // Create a MutationObserver to listen for changes in the DOM
    const observer = new MutationObserver(function(mutationsList, observer) {
        let popupRemoved = false;
        let bottomAdsRemoved = false;
        let BannerAdsRemoved = false;
        let scriptRemoved = false;

        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const popup = document.getElementById('popup-truyenqq');
                const BottomAds = document.getElementsByClassName('catfish-content');
                const BannerAds = document.getElementsByClassName('banner');
                const scripts = document.getElementsByTagName('script');

                if (popup) {
                    removePopup();
                    popupRemoved = true;
                }

                if (BottomAds.length > 0) {
                    removeBottomAds();
                    bottomAdsRemoved = true;
                }

                if (BannerAds.length > 0) {
                    removeBannerAds();
                    BannerAdsRemoved = true;
                }

                for (let i = 0; i < scripts.length; i++) {
                    const scriptSrc = scripts[i].src;
                    if (scriptSrc.includes('ads.mxhnkn.pro/popup/')) {
                        removeScript();
                        scriptRemoved = true;
                        break;
                    }
                }

                // If both have been removed, stop observing
                if (popupRemoved && bottomAdsRemoved && BannerAdsRemoved && scriptRemoved) {
                    observer.disconnect();
                }
            }
        }
    });

    // Start observing the document's body for changes
    observer.observe(document.body, { childList: true, subtree: true });
})();