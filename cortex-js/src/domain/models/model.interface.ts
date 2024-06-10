/**
 * Model type defines the shape of a model object.
 * @stored
 */
export interface Model {
  /**
   * Model identifier.
   */
  model: string;

  /**
   * GGUF metadata: general.name
   */
  name?: string;

  /**
   * GGUF metadata: version
   */
  version?: string;

  /**
   * The model download source. It can be an external url or a local filepath.
   */
  files: string[] | ModelArtifact;

  /**
   * GGUF metadata: tokenizer.chat_template
   */
  prompt_template?: string;

  /**
   * Defines specific tokens or phrases at which the model will stop generating further output.
   */
  stop?: string[];

  /// Inferencing
  /**
   * Set probability threshold for more relevant outputs.
   */
  top_p?: number;

  /**
   * Controls the randomness of the model’s output.
   */
  temperature?: number;

  /**
   * Adjusts the likelihood of the model repeating words or phrases in its output.
   */
  frequency_penalty?: number;

  /**
   * Influences the generation of new and varied concepts in the model’s output.
   */
  presence_penalty?: number;

  /// Engines
  /**
   * The context length for model operations varies; the maximum depends on the specific model used.
   */
  ctx_len?: number;

  /**
   * Enable real-time data processing for faster predictions.
   */
  stream?: boolean;

  /*
   * The maximum number of tokens the model will generate in a single response.
   */
  max_tokens?: number;

  /**
   * The number of layers to load onto the GPU for acceleration.
   */
  ngl?: number;

  /**
   * Number of parallel sequences to decode
   */
  n_parallel?: number;

  /**
   * Determines CPU inference threads, limited by hardware and OS. (Maximum determined by system)
   */
  cpu_threads?: number;

  /**
   * The prompt to use for internal configuration
   */
  pre_prompt?: string;

  /**
   * The batch size for prompt eval step
   */
  n_batch?: number;

  /**
   * To enable prompt caching or not
   */
  caching_enabled?: boolean;

  /**
   * Group attention factor in self-extend
   */
  grp_attn_n?: number;

  /**
   * Group attention width in self-extend
   */
  grp_attn_w?: number;

  /**
   * Prevent system swapping of the model to disk in macOS
   */
  mlock?: boolean;

  /**
   * You can constrain the sampling using GBNF grammars by providing path to a grammar file
   */
  grammar_file?: string;

  /**
   * To enable Flash Attention, default is true
   */
  flash_attn?: boolean;

  /**
   * KV cache type: f16, q8_0, q4_0, default is f16
   */
  cache_type?: string;

  /**
   * To enable mmap, default is true
   */
  use_mmap?: boolean;

  /**
   * The model engine.
   */
  engine?: string;
}

/**
 * The available model settings.
 */
export interface ModelSettingParams {
  ctx_len?: number;
  ngl?: number;
  embedding?: boolean;
  n_parallel?: number;
  cpu_threads?: number;
  prompt_template?: string;
  system_prompt?: string;
  ai_prompt?: string;
  user_prompt?: string;
  llama_model_path?: string;
  mmproj?: string;
  cont_batching?: boolean;
  engine?: string;
  stop?: string[];
  pre_prompt?: string;
  n_batch?: number;
  caching_enabled?: boolean;
  grp_attn_n?: number;
  grp_attn_w?: number;
  mlock?: boolean;
  grammar_file?: string;
  model_type?: string;
  model_alias?: string;
  flash_attn?: boolean;
  cache_type?: string;
  use_mmap?: boolean;
}

/**
 * The available model runtime parameters.
 */
export interface ModelRuntimeParams {
  temperature?: number;
  token_limit?: number;
  top_k?: number;
  top_p?: number;
  stream?: boolean;
  max_tokens?: number;
  stop?: string[];
  frequency_penalty?: number;
  presence_penalty?: number;
  engine?: string;
}

/**
 * The model artifact object.
 * In-case the model files is not a raw file list
 */
export interface ModelArtifact {
  mmproj?: string;
  llama_model_path?: string;
}
