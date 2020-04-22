# PlayNextIsis

Chrome extension which adds a "Play Next" button to isis lectures.

## Install

1. Clone the repository

```
    git clone git@github.com:venondev/IsisPlayNext.git
    cd IsisPlayNext
```

2. Install dependencies

```
    yarn install
```

3. Build the extension

```
    yarn build
```

4. Load the dist folder in Chrome

https://support.google.com/chrome/a/answer/2714278?hl=de

## Limitations

As the videos are not uploaded in the correct order in some modules, the extension
figures out the order by parsing the video title. As these are different per module,
this needs to be configured per module (See "src/config.json").

If you want to add your support for new modules, please open a PR and edit the config.

## How it works

When you visit the lecture overview page, all available videos get sorted and the keys
gets extracted. After clicking on a video, the key from that video gets extracted and
the extension looks up the next element in the sorted list after the key.
