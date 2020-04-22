import {
    setupMessageListener
} from "chrome-extension-message-wrapper";
import config from "./config.json"

let currentPlaylist = [];

const SET_PLAYLIST = "SET_PLAYLIST";

const getIdx = (title, {
    regexp,
    groupIdx = 1,
    base = 1
}) => {
    const m = title.match(new RegExp(regexp));
    if (m) return parseInt(m[groupIdx]) - base

    return undefined;
}

const sortPlaylist = (playlist, c) =>
    playlist.filter(([title]) => title.match(new RegExp(c.regexp))).sort(([a], [b]) => getIdx(a, c) - getIdx(b, c))

const setPlaylist = (playlist, module) => {
    if (config.modules[module]) {
        const sorted = sortPlaylist(playlist, config.modules[module])
        console.log("Sorted: ", sorted)
        currentPlaylist = sorted;
        return true
    }
};

const getNext = (currTitle, module) => {
    if (config.modules[module]) {
        const idx = getIdx(currTitle, config.modules[module]);
        return idx && currentPlaylist[idx + 1];
    }
}

chrome.runtime.onMessage.addListener(
    setupMessageListener({
        setPlaylist,
        getNext
    }, {
        verbose: true
    })
);