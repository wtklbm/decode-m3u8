#!/usr/bin/env node

import decodeM3u8 from './decodeM3u8';

async function main() {
    const [, , inputTsPath, output, iv, k] = process.argv;
    const helps = [
        '帮助:',
        'dem3u8 input.ts output.mp4 00000000000000000000000000000000 32EB240847E93194844FD8D16ABB9426'
    ];

    if (inputTsPath === '--help' || inputTsPath === '-h') {
        return console.log(helps.join('\n '));
    }

    await decodeM3u8(inputTsPath, output, iv, k);
}

main().then(console.log, console.error);
