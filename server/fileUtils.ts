import Jimp from 'jimp';
import ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfmpegPath('./ffmpeg/ffmpeg');

export const optimizeImageBuffer = async (buffer) => {
    const image = await Jimp.read(buffer);

    image.resize(800, Jimp.AUTO);

    return await image.getBufferAsync(Jimp.MIME_WEBP);
}

export const optimizeVideoBuffer = async (buffer) => {
    return new Promise((resolve, reject) => {
        const outputOptions = {
            format: 'webm',
            videoCodec: 'libvpx',
            audioCodec: 'libvorbis',
            videoBitrate: '1M',
        };

        const ffmpegCommand = ffmpeg(buffer)
            .audioCodec(outputOptions.audioCodec)
            .videoCodec(outputOptions.videoCodec)
            .videoBitrate(outputOptions.videoBitrate)
            .format(outputOptions.format)
            .on('end', () => {
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            });

        ffmpegCommand.toFormat(outputOptions.format);

        ffmpegCommand.pipe();
    });
};