import ffmpeg from 'fluent-ffmpeg';
import { v4 } from 'uuid';
import { writeFile, unlink } from 'fs/promises';
import { join } from "path";
import * as fileType from "file-type";
import gm from 'gm';

export const saveFile = async (buffer) => {
    const type = await fileType.fileTypeFromBuffer(buffer.data);
    let name = '';
    let mime = '';

    if (type) {
        mime = type.mime.split('/')[0];

        if(mime === 'image') {
            const result = await optimizeImage(buffer);
        } else if(mime === 'video') {
            name = await optimizeVideo(buffer);
        } else {
            mime = 'document';
            name = v4().replace(/[ @$/\-(),]/g, '_') + '.' + buffer.filename.split('.').pop();
            await writeFile(join(process.cwd(), 'public', 'files', name), buffer.data);
        }
    }

    return {
        filename: name,
        filetype: mime
    };
}

export const optimizeImage = async (buffer) => {
    try {
        const name = v4().replace(/[ @$/\-(),]/g, '_') + '.webp';
        const path = join(process.cwd(), 'public', 'files', name);

        const image = gm(buffer.data);

        image.resize(720);

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

export const optimizeVideo = async (buffer) => {
    const tmpFileName = `${v4().replace(/[ @$/\-(),]/g, '_')}.mp4`;
    const outputFileName = `${v4().replace(/[ @$/\-(),]/g, '_')}.webm`;

    const tmpFilePath = join(process.cwd(), 'public', 'files', tmpFileName);
    const outputFilePath = join(process.cwd(), 'public', 'files', outputFileName);

    //ffmpeg has issues working with buffers, so temporary file is needed
    await writeFile(tmpFilePath, buffer.data);

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