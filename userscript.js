// ==UserScript==
// @name         Ocelot IDE Sudo Mod
// @namespace    http://slensky.com/
// @version      0.1
// @description  sorry Arjun :(
// @author       Stephan Lensky
// @match        https://www.ocelot-ide.org/
// @run-at       document-end
// @grant       GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/

// Define global configuration for the script here
var config = {
    tabSize: 4
}

function GM_main(config) {
    if (window.monaco === undefined) {
        console.error('window.monaco is undefined, sudo mod will not run');
        return;
    }
    var monaco = window.monaco;

    monaco.editor.onDidCreateEditor(function(e) {
        configureEditor(e);
    });

    async function configureEditor(e) {
        await e.model !== undefined && e.model !== null;

        // set the indentation length (in spaces)
        e.model.updateOptions({tabSize: config.tabSize});

        /* set the language of the editor to JS, instead of the default 'elementaryjs'
         * this has a number of side-effects, including:
         *   - auto-closing pairs (parens, brackets, etc.)
         *   - autocomplete
         */
        monaco.editor.setModelLanguage(e.model, "javascript")
    }
}

addJS_Node (null, null, GM_main);

function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
    var D = document;
    var scriptNode = D.createElement ('script');
    if (runOnLoad) {
        scriptNode.addEventListener ("load", runOnLoad, false);
    }
    scriptNode.type = "text/javascript";
    if (text) scriptNode.textContent = text;
    if (s_URL) scriptNode.src = s_URL;
    if (funcToRun) scriptNode.textContent = '(' + funcToRun.toString() + ')(' + JSON.stringify(config) + ')';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}