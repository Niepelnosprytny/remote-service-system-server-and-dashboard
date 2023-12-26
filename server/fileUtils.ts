import Jimp from 'jimp';
import ffmpeg from 'fluent-ffmpeg';
import { v4 } from 'uuid';
import { writeFile, unlink } from 'fs/promises';
import { join } from "path";

// ffmpeg.setFfmpegPath('./ffmpeg/ffmpeg');
// ffmpeg.setFfprobePath('./ffmpeg/ffprobe');
ffmpeg.d

export const optimizeImageBuffer = async (buffer) => {
    const image = await Jimp.read(buffer);

    // image.resize(800, Jimp.AUTO);
    //
    // return await image.getBufferAsync(Jimp.MIME_WEBP);
}

export const optimizeVideoBuffer = async (inputBuffer) => {
    const tmpFileName = `${v4().replace(/[ @$/\-(),]/g, '_')}.mp4`;
    const outputFileName = `${v4().replace(/[ @$/\-(),]/g, '_')}.webm`;
    const outputFilePath = join(process.cwd(), 'public', 'files', outputFileName);
    const tmpFilePath = join(process.cwd(), 'public', 'files', tmpFileName);

    console.log(`TMP file name: ${tmpFileName}`);
    console.log(`Output file name: ${outputFileName}`);

    try {
        await writeFile(tmpFilePath, inputBuffer.data);

        await new Promise((resolve, reject) => {
            ffmpeg(tmpFilePath)
                .audioCodec('libvorbis')
                .videoCodec('libvpx')
                .on('end', () => {
                    console.log("Success");
                    resolve();
                })
                .on('error', (error, stdout, stderr) => {
                    console.log('FFMpeg Error:', error);
                    console.log('FFMpeg Output:', stdout);
                    console.log('FFMpeg Error Output:', stderr);
                    reject(error);
                })
                .output(outputFilePath)
                .run();
        });

        await unlink(tmpFilePath);

        console.log('Optimization complete.');
        return outputFileName;
    } catch (error) {
        console.error('Optimization failed:', error.message);
        throw error;
    }
};