# R/a/dio Archiver

Electron bundle of the existing [nora](https://github.com/Linkcube/Nora) backend with [svelte-radio-interface](https://github.com/Linkcube/svelte-radio-interface), in a frameless chromium presentation.

# Building
If you want to build this yourself, clone the git repo, run `yarn install` and then `yarn dist`.

## Usage
Install one of the release binaries, or build your own.

Change the `recordings folder` under server settings to your choice of an absolute file path, otherwise it will record streams to the install location.

## Warnings (to fix)
When exiting the program, make sure your recording is stopped if active, otherwise you will just have the raw audio stream without any metadata.

There is no indication of when a recording has finished, you can check `combined.log` for an output if you need the status.
