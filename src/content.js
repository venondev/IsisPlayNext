import {
    initBGFunctions
} from "chrome-extension-message-wrapper";

initBGFunctions(chrome).then(async bgFuncs => {
    const PAGES = {
        "BROWSE": "BROWSE",
        "VIEW": "VIEW"
    }

    let popStateRegistered = false;

    const getModule = () =>
        document.querySelectorAll("#page-header nav li a")[1].innerText

    const getVideoTitlePlayer = () =>
        document.querySelector(".video-view h3").innerText

    const getPlaylists = () => [...document.querySelectorAll(".video-list .video-item .title a")].map(({
        href,
        innerText
    }) => [innerText, href])

    const getLocation = () => {
        const split = window.location.href.split("/");
        const key = split[split.length - 1].toUpperCase()

        if (PAGES[key]) {
            return key
        } else {
            return "OTHER"
        }
    }

    const handleOverview = async ({
        setPlaylist
    }) => {
        const playlist = getPlaylists();
        const module = getModule();

        await setPlaylist(playlist, module);
    }

    const handlePlayer = async ({
        getNext
    }) => {
        const title = getVideoTitlePlayer();
        const module = getModule();
        const next = await getNext(title, module)

        const ele = document.createElement("div");
        ele.classList.add("play-next-container");
        const btn = document.createElement("a");
        btn.innerText = "Play Next"
        const info = document.createElement("span");

        document.querySelector(".video-info").appendChild(ele);
        ele.appendChild(info);

        if (next) {
            btn.href = next[1];
            info.innerText = next[0];
            ele.appendChild(btn);
        }
    }

    const addEventHandlers = () => {
        if (!popStateRegistered) window.addEventListener('popstate', main);

        // Video Links
        [...document.querySelectorAll(".video-list .video-item a")].map(x => {
            x.addEventListener("click", main)
        })

        // Back Button
        const b = document.querySelector(".video-view .navigation a")
        if (b) b.addEventListener("click", main)
    }

    const handlers = {
        [PAGES.BROWSE]: handleOverview,
        [PAGES.VIEW]: handlePlayer,
        OTHER: () => undefined
    }

    const main = () => {
        window.setTimeout(() => {
            addEventHandlers()
            console.log("loc", window.location.href);
            handlers[getLocation()](bgFuncs)
        }, 1000)
    }

    console.log("IsisPlayNext running...");
    main()
});