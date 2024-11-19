import {disableProxy, setSelectiveProxy} from '/proxy.js';

(async () => {
    const {userSettings} = await chrome.storage.local.get('userSettings');
    if (!userSettings) return;
    if (userSettings.isProxyEnabled) {
        setSelectiveProxy();
    } else {
        disableProxy();
    }
})();
