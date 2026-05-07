import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private s3Client: S3Client | null = null;
  private bucket: string;
  private region: string;

  constructor() {
    this.bucket = process.env.AWS_S3_BUCKET || 'entrepreneur-network-uploads';
    this.region = process.env.AWS_REGION || 'us-east-1';

    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      this.s3Client = new S3Client({
        region: this.region,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });
    }
  }

  async generatePresignedUrl(userId: string): Promise<{
    uploadUrl: string;
    fileUrl: string;
    expiresIn: number;
  }> {
    const fileKey = `profiles/${userId}/${uuidv4()}.jpg`;
    const expiresIn = 3600; // 1 hour

    if (!this.s3Client) {
      // Return mock URLs for development without AWS credentials
      return {
        uploadUrl: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${fileKey}?mock=true`,
        fileUrl: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${fileKey}`,
        expiresIn,
      };
    }

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
      ContentType: 'image/jpeg',
    });

    const uploadUrl = await getSignedUrl(this.s3Client, command, { expiresIn });
    const fileUrl = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${fileKey}`;

    return {
      uploadUrl,
      fileUrl,
      expiresIn,
    };
  }
}
