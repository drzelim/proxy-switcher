import {setSelectiveProxy, disableProxy} from '../proxy.js';

const proxySwitcherCheckbox = document.querySelector('#proxy-enable');

(async () => {
    const {userSettings} = await chrome.storage.local.get('userSettings');
    if (!userSettings) return;
    proxySwitcherCheckbox.checked = !!userSettings.isProxyEnabled;
})();

proxySwitcherCheckbox.addEventListener('change', async (evt) => {
    const userSettings = {
        isProxyEnabled: evt.target.checked,
    };

    if (userSettings.isProxyEnabled) {
        setSelectiveProxy();
    } else {
        disableProxy();
    }

    await chrome.storage.local.set({userSettings});
});
