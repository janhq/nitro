import { Module } from '@nestjs/common';
import { AppController } from './infrastructure/controllers/app.controller';
import { ThreadsController } from './infrastructure/controllers/threads.controller';
import { ModelsController } from './infrastructure/controllers/models.controller';
import { MessagesModule } from './usecases/messages/messages.module';
import { ThreadsModule } from './usecases/threads/threads.module';
import { ModelsModule } from './usecases/models/models.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ChatModule } from './usecases/chat/chat.module';
import { AssistantsModule } from './usecases/assistants/assistants.module';
import { InferenceSettingsModule } from './usecases/inference-settings/inference-settings.module';
import { CortexModule } from './cortex/cortex.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    DatabaseModule,
    MessagesModule,
    ThreadsModule,
    ModelsModule,
    ChatModule,
    AssistantsModule,
    InferenceSettingsModule,
    CortexModule,
  ],
  controllers: [AppController, ThreadsController, ModelsController],
})
export class AppModule {}
