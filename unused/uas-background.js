chrome.storage.onChanged.addListener(function(changes, namespace) {
    updateCache(function() {});
    for (key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' + 'Old value was "%s", new value is "%s".', key, namespace, storageChange.oldValue, storageChange.newValue);
    }
});
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action == "blacklist")
        getSpoofValues(sender.tab.url, function(values) {
            sendResponse(values);
        });
    else if (request.action == "js_blacklist")
        getDoNotSpoofJSObjects(function(dont_spoof_js) {
            if (dont_spoof_js)
                sendResponse({});
            else
                getSpoofValues(sender.tab.url, function(values) {
                    sendResponse(values);
                });
        });
    else if (request.action == "add_ua") {
        addCustomUAOption(request.name, request.user_agent, request.append_to_default_ua, request.indicator);
        sendResponse({
            result: "success"
        });
    } else if (request.action == "options")
        _getUserAgentList(function(user_agent_list) {
            sendResponse({
                options: JSON.stringify(user_agent_list)
            });
        });
    else if (request.action == "update") {
        updateListeners();
        sendResponse({});
    } else if (request.action == "clear_presets")
        clearPresets();
    else if (request.action == "badge")
        updateBadge(sender.tab);
    else {
        console.log("Got an invalid request:" + request.action);
        sendResponse({});
    }
    return false;
});
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "update" && _isUsingLocalStorage()) {
        console.log("On install: Attempting to migrate legacy items");
        _moveLocalStorageToSyncStorage();
    }
    _getUserAgentPointerList(function(pointer_list) {
        if (!pointer_list || pointer_list.length == 0) {
            console.log("Didn't find any existing UAs.  Attempting to populate some.");
            getBaseOptionsList(true);
        }
    });
});
function replaceHeader(user_agent, requestHeaders) {
    if (!user_agent || !user_agent.ua_string)
        return requestHeaders;
    var newHeaders = [];
    for (var i = 0; i < requestHeaders.length; i++)
        if (requestHeaders[i].name != "User-Agent")
            newHeaders.push(requestHeaders[i]);
        else {
            var new_value = requestHeaders[i].value;
            if (user_agent.ua_string != "")
                new_value = (user_agent.append_to_default_ua ? new_value + " " + user_agent.ua_string : user_agent.ua_string);
            newHeaders.push({
                "name": "User-Agent",
                "value": new_value
            });
        }
    return newHeaders;
}
function updateListeners() {
    if (!listener)
        listener = function(details) {
            var header_map = {
                requestHeaders: details.requestHeaders
            };
            if (details && details.url && details.requestHeaders && details.requestHeaders.length > 0)
                header_map = {
                    requestHeaders: replaceHeader(getCacheSpoofValues(details.url, details.tabId), details.requestHeaders)
                };
            return header_map;
        }
        ;
    chrome.webRequest.onBeforeSendHeaders.addListener(listener, {
        "urls": ["http://*/*", "https://*/*"]
    }, ["requestHeaders", "blocking"]);
}
var listener = null ;
updateListeners();
_reportErrors();
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        updateBadge(tab);
    });
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    updateBadge(tab);
});
