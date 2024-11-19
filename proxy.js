/* global chrome */
import {PROXY_URL, PROXY_PORT} from './env.js';

export const setAllProxy = () => {
    // Настройка прокси
    chrome.proxy.settings.set(
            {
                value: {
                    mode: "fixed_servers",
                    rules: {
                        singleProxy: {
                            scheme: "http",
                            host: PROXY_URL,
                            port: PROXY_PORT
                        },
                        bypassList: ["<local>"]
                    }
                },
                scope: "regular"
            },
            () => {
                console.log("Proxy settings applied");
            }
    );
};

const fullHosts = [
    'www.youtube.com',
    'rr1---sn-gxuo03g-ig3e.googlevideo.com', // узел с которого запрашивается видео для youtube
    'chatgpt.com',
];

const partialHosts = ['googlevideo.com'];

const pacScriptData =
        `function FindProxyForURL(url, host) {
        const fullHosts = ${JSON.stringify(fullHosts)};
        const partialHosts = ${JSON.stringify(partialHosts)};
        
        let isNeedProxy = false;
    
        for (let i = 0; i < fullHosts.length; i++) {
            if (fullHosts[i] === host) {
                isNeedProxy = true;
                break;
            }
        }
        
        if (isNeedProxy || partialHosts.some(item => host.includes(item))) {
            return 'PROXY ${PROXY_URL}:${PROXY_PORT}';
        }
               
        return 'DIRECT';
    }`;

export const setSelectiveProxy = () => {
    const config = {
        mode: "pac_script",
        pacScript: {
            data: pacScriptData
        }
    };
    chrome.proxy.settings.set(
            {value: config, scope: 'regular'},
            function() {}
    );
};

export const disableProxy = () => {
    chrome.proxy.settings.set(
        {
            value: {
                mode: "direct",
            },
            scope: "regular"
        },
        () => {}
    );
}
