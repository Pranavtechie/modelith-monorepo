import { Elysia } from "elysia";
import AWS from 'aws-sdk'


const s3 = new AWS.S3({ region: 'us-east-1' });

export const app = new Elysia({ prefix: '/aws-s3' })
    .get('/', () => 'hello')
    .get('/presignedurl', async () => {

        // const params = {
        //     Bucket: 'bucketName',
        //     Key: key,
        //     Expires: 60, // URL valid for 60 seconds
        //     ContentType: contentType
        // };

        // await s3.getSignedUrlPromise('putObject', params);

    })