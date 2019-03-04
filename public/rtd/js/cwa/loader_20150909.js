/*! LINE Corporation - linecorp.com/license */
var sC = document.cookie,
    aC = sC.split("; "),
    daC = null,
    REGEX_CORDOVA_VERSION = /^\d+\.\d+\.\d+$/,
    retOS = "",
    sVer = "";
getValueFromCookie = function(a, b) {
    for (var c, d = "", e = 0; e < aC.length; e++)
        if (c = aC[e].split("="), c[0] == a)
            if (b && "function" == typeof b.test) {
                if (b.test(c[1])) {
                    d = c[1];
                    break
                }
            } else d = c[1];
    return d
}, retOS = getValueFromCookie("os").toLowerCase(), sVer = getValueFromCookie("cordovaVersion", REGEX_CORDOVA_VERSION);
var sAndroid = navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/),
    sWp = navigator.userAgent.match(/Windows Phone ([\d.]+)/);
if (!retOS) retOS = sAndroid ? "android" : sWp ? "windows phone" : "ios";
if (window.ONLOAD_WEBVIEW = function() {}, "android" === retOS) {
    if (sVer && REGEX_CORDOVA_VERSION.test(sVer)) document.write('<script type="text/javascript" src="https://scdn.line-apps.com/channel/sdk/js/android/' + sVer + '/cordova_20150326.js"></script>');
    else document.write('<script type="text/javascript" src="https://scdn.line-apps.com/channel/sdk/js/android/cordova_20150326.js"></script>');
    document.write('<script type="text/javascript" src="https://scdn.line-apps.com/channel/sdk/js/OPENLCS_20150326.js"></script>')
} else if ("windows phone" === retOS) {
    if (sVer && REGEX_CORDOVA_VERSION.test(sVer)) document.write('<script type="text/javascript" src="https://scdn.line-apps.com/channel/sdk/js/windows/phone/' + sVer + '/cordova_20150326.js"></script>');
    else document.write('<script type="text/javascript" src="https://scdn.line-apps.com/channel/sdk/js/windows/phone/cordova_20150326.js"></script>');
    document.write('<script type="text/javascript" src="https://scdn.line-apps.com/channel/sdk/js/OPENLCS_20150326.js"></script>')
}// else if ("ios" === retOS) document.write("<script type='text/javascript' src='linelocal://cordova.js'><\/sc" + "ript>"), document.write("<script type='text/javascript' src='linelocal://OPENLCS.js'>><\/sc" + "ript>");
if ("android" === retOS && !window.LineDeviceInfo) {
    var locale = getValueFromCookie("locale")
        language = getValueFromCookie("language"),
        timezone = getValueFromCookie("timezone"),
        hardwareModel = getValueFromCookie("hardwareModel"),
        appSDKVersion = getValueFromCookie("appSDKVersion");
    window.LineDeviceInfo = {
        locale: locale,
        language: language,
        timezone: timezone,
        hardwareModel: hardwareModel,
        appSDKVersion: appSDKVersion
    }
}