import { HttpService } from '@nestjs/axios';
import { EngineExtension } from './engine.abstract';
import stream from 'stream';

export abstract class OAIEngineExtension extends EngineExtension {
  abstract apiUrl: string;

  constructor(protected readonly httpService: HttpService) {
    super();
  }

  override async inference(
    createChatDto: any,
    headers: Record<string, string>,
  ): Promise<stream.Readable | any> {
    const { stream } = createChatDto;
    const response = await this.httpService
      .post(this.apiUrl, createChatDto, {
        headers: {
          'Content-Type': headers['content-type'] ?? 'application/json',
          Authorization: headers['authorization'],
        },
        responseType: stream ? 'stream' : 'json',
      })
      .toPromise();
    if (!response) {
      throw new Error('No response');
    }

    return response.data;
  }
}
