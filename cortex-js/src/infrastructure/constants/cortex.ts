export const databaseName = 'cortex';

export const databaseFile = `${databaseName}.db`;

export const defaultCortexJsHost = 'localhost';
export const defaultCortexJsPort = 1337;

export const defaultCortexCppHost = '127.0.0.1';
export const defaultCortexCppPort = 3929;
// CORTEX CPP
export const CORTEX_CPP_EMBEDDINGS_URL = (
  host: string = defaultCortexCppHost,
  port: number = defaultCortexCppPort,
) => `http://${host}:${port}/inferences/server/embedding`;

export const CORTEX_CPP_PROCESS_DESTROY_URL = (
  host: string = defaultCortexCppHost,
  port: number = defaultCortexCppPort,
) => `http://${host}:${port}/processmanager/destroy`;

export const CORTEX_CPP_HEALTH_Z_URL = (
  host: string = defaultCortexCppHost,
  port: number = defaultCortexCppPort,
) => `http://${host}:${port}/healthz`;

export const CORTEX_CPP_MODELS_URL = (
  host: string = defaultCortexCppHost,
  port: number = defaultCortexCppPort,
) => `http://${host}:${port}/inferences/server/models`;

export const CORTEX_JS_HEALTH_URL = (
  host: string = defaultCortexJsHost,
  port: number = defaultCortexJsPort,
) => `http://${host}:${port}/health`;

export const CORTEX_JS_STOP_API_SERVER_URL = (
  host: string = defaultCortexJsHost,
  port: number = defaultCortexJsPort,
) => `http://${host}:${port}/process`;

// INITIALIZATION
export const CORTEX_RELEASES_URL =
  'https://api.github.com/repos/janhq/cortex/releases';

export const CORTEX_ENGINE_RELEASES_URL = (engine: string) =>
  `https://api.github.com/repos/janhq/${engine}/releases`;

export const CUDA_DOWNLOAD_URL =
  'https://catalog.jan.ai/dist/cuda-dependencies/<version>/<platform>/cuda.tar.gz';

export const telemetryServerUrl = 'http://192.168.100.30:1338';
