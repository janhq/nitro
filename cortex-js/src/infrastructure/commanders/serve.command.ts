import {
  defaultCortexJsHost,
  defaultCortexJsPort,
} from '@/infrastructure/constants/cortex';
import { CommandRunner, SubCommand, Option } from 'nest-commander';
import { SetCommandContext } from './decorators/CommandContext';
import { ServeStopCommand } from './sub-commands/serve-stop.command';
import { ContextService } from '../services/context/context.service';
import { getApp } from '@/app';
import chalk from 'chalk';

type ServeOptions = {
  address?: string;
  port?: number;
  detach: boolean;
};

@SubCommand({
  name: 'serve',
  description: 'Providing API endpoint for Cortex backend',
  subCommands: [ServeStopCommand],
})
@SetCommandContext()
export class ServeCommand extends CommandRunner {
  constructor(readonly contextService: ContextService) {
    super();
  }

  async run(passedParams: string[], options?: ServeOptions): Promise<void> {
    const host = options?.address || defaultCortexJsHost;
    const port = options?.port || defaultCortexJsPort;

    return this.startServer(host, port);
  }

  private async startServer(host: string, port: number) {
    const app = await getApp();

    try {
      await app.listen(port, host);
      console.log(chalk.blue(`Started server at http://${host}:${port}`));
      console.log(
        chalk.blue(`API Playground available at http://${host}:${port}/api`),
      );
    } catch {
      console.error(`Failed to start server. Is port ${port} in use?`);
    }
  }

  @Option({
    flags: '-a, --address <address>',
    description: 'Address to use',
  })
  parseHost(value: string) {
    return value;
  }

  @Option({
    flags: '-p, --port <port>',
    description: 'Port to serve the application',
  })
  parsePort(value: string) {
    return parseInt(value, 10);
  }
}
