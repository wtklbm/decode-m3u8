import { exec } from '@curong/process';
import { printError } from '@curong/term';

export default async function decodeM3u8(
    inputTsPath: string,
    output: string,
    iv: string,
    k: string
) {
    if (iv.startsWith('0x')) {
        iv = iv.slice(2);
    }

    if (iv.length !== 32) {
        return printError(`iv 不是 32 位的格式: ${iv}`);
    }

    if (!inputTsPath.endsWith('.ts')) {
        return printError(`inputTsPath 不是 ts 文件: ${inputTsPath}`);
    }

    if (k.length !== 32) {
        return printError(`k 不是 32 位的格式: ${k}`);
    }

    const command = `openssl aes-128-cbc -d -in ${inputTsPath} -out ${output} -nosalt -iv ${iv} -K ${k}`;

    const { stdout, stderr } = await exec(command, {
        cwd: process.cwd()
    });

    if (stderr) {
        return printError(`[decodeM3u8] 执行命令失败: ${command}`);
    }

    console.log(stdout);
}
