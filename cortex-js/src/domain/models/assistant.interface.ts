import { Assistant as OpenAiAssistant } from 'openai/resources/beta/assistants';
import { AssistantResponseFormatOption as OpenAIAssistantResponseFormatOption } from 'openai/resources/beta/threads/threads';

export interface Assistant extends OpenAiAssistant {
  avatar?: string;

  response_format?: AssistantResponseFormatOption;

  tool_resources?: AssistantToolResources;
}

export type AssistantResponseFormatOption = OpenAIAssistantResponseFormatOption;

export interface AssistantToolResources extends OpenAiAssistant.ToolResources {}
