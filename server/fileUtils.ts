import ffmpeg from 'fluent-ffmpeg';
import { v4 } from 'uuid';
import { writeFile, unlink } from 'fs/promises';
import { join } from "path";
import {fileTypeFromBuffer} from "file-type";
import gm from 'gm';

export const saveFile = async (file) => {
    let name = file.filename;
    const fileTypeResult = await fileTypeFromBuffer(file.data);
    let mime = fileTypeResult ? fileTypeResult.mime : file.type;

    if (mime.includes('image')) {
        mime = 'image';
        name = await optimizeImage(file);
    } else if (mime.includes('video')) {
        mime = 'video';
        name = await optimizeVideo(file);
    } else {
        mime = 'document';
        name = v4().replace(/[ @$/\-(),]/g, '_') + '.' + name.split('.').pop();
        await writeFile(join(process.cwd(), 'public', 'files', name), file.data);
    }

    return {
        filename: name,
        filetype: mime
    };
};

export const optimizeImage = async (file) => {
    try {
        const name = v4().replace(/[ @$/\-(),]/g, '_') + '.webp';
        const path = join(process.cwd(), 'public', 'files', name);

        const image = gm(file.data);
        image.resize(1028);

        await new Promise((resolve, reject) => {
            image.write(path, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });

        return name;
    } catch (error) {
        throw error;
    }
};

export const optimizeVideo = async (file) => {
    const tmpFileName = `${file.filename.substring(0, file.filename.lastIndexOf('.'))}.${file.filename.split('.').pop()}`;
    const outputFileName = v4().replace(/[ @$/\-(),]/g, '_') + '.webm';

    const tmpFilePath = join(process.cwd(), 'public', 'files', tmpFileName);
    const outputFilePath = join(process.cwd(), 'public', 'files', outputFileName);

    // ffmpeg has issues working with buffers, so temporary file is needed
    await writeFile(tmpFilePath, file.data);

    await new Promise((resolve, reject) => {
        ffmpeg(tmpFilePath)
            .size(`?x720`)
            .audioCodec('libvorbis')
            .videoCodec('libvpx')
            .on('end', () => {
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            })
            .output(outputFilePath)
            .run();
    });

    await unlink(tmpFilePath);

    return outputFileName;
};