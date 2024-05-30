#include <string>
#if defined(_WIN32)
#define NOMINMAX
#endif
#pragma once

#include <drogon/HttpController.h>

#ifndef NDEBUG
// crash the server in debug mode, otherwise send an http 500 error
#define CPPHTTPLIB_NO_EXCEPTIONS 1
#endif

#include <condition_variable>
#include <cstddef>
#include <string>
#include <variant>

#include "common/base.h"
#include "cortex-common/EngineI.h"
#include "cortex-common/cortextensorrtllmi.h"
#include "cortex-common/cortexpythoni.h"
#include "trantor/utils/SerialTaskQueue.h"
#include "utils/dylib.h"
#include "utils/json.hpp"
#ifndef SERVER_VERBOSE
#define SERVER_VERBOSE 1
#endif

using json = nlohmann::json;

using namespace drogon;

namespace inferences {

class server : public drogon::HttpController<server>,
               public BaseModel,
               public BaseChatCompletion,
               public BaseEmbedding {
  struct SyncQueue;

 public:
  server();
  ~server();
  METHOD_LIST_BEGIN
  // list path definitions here;
  METHOD_ADD(server::ChatCompletion, "chat_completion", Post);
  METHOD_ADD(server::Embedding, "embedding", Post);
  METHOD_ADD(server::LoadModel, "loadmodel", Post);
  METHOD_ADD(server::UnloadModel, "unloadmodel", Post);
  METHOD_ADD(server::ModelStatus, "modelstatus", Post);
  METHOD_ADD(server::GetModels, "models", Get);
  METHOD_ADD(server::GetEngines, "engines", Get);

  // cortex.python API
  METHOD_ADD(server::FineTuning, "finetuning", Post);

  // Openai compatible path
  ADD_METHOD_TO(server::ChatCompletion, "/v1/chat/completions", Post);
  ADD_METHOD_TO(server::GetModels, "/v1/models", Get);
  ADD_METHOD_TO(server::FineTuning, "/v1/fine_tuning/job", Post);

  // ADD_METHOD_TO(server::handlePrelight, "/v1/chat/completions", Options);
  // NOTE: prelight will be added back when browser support is properly planned

  ADD_METHOD_TO(server::Embedding, "/v1/embeddings", Post);
  // ADD_METHOD_TO(server::handlePrelight, "/v1/embeddings", Options);

  // PATH_ADD("/llama/chat_completion", Post);
  METHOD_LIST_END
  void ChatCompletion(
      const HttpRequestPtr& req,
      std::function<void(const HttpResponsePtr&)>&& callback) override;
  void Embedding(
      const HttpRequestPtr& req,
      std::function<void(const HttpResponsePtr&)>&& callback) override;
  void LoadModel(
      const HttpRequestPtr& req,
      std::function<void(const HttpResponsePtr&)>&& callback) override;
  void UnloadModel(
      const HttpRequestPtr& req,
      std::function<void(const HttpResponsePtr&)>&& callback) override;
  void ModelStatus(
      const HttpRequestPtr& req,
      std::function<void(const HttpResponsePtr&)>&& callback) override;
  void GetModels(
      const HttpRequestPtr& req,
      std::function<void(const HttpResponsePtr&)>&& callback) override;
  void GetEngines(
      const HttpRequestPtr& req,
      std::function<void(const HttpResponsePtr&)>&& callback) override;
  void FineTuning(
      const HttpRequestPtr& req,
      std::function<void(const HttpResponsePtr&)>&& callback) override;

 private:
  void ProcessStreamRes(std::function<void(const HttpResponsePtr&)> cb,
                        std::shared_ptr<SyncQueue> q);
  void ProcessNonStreamRes(std::function<void(const HttpResponsePtr&)> cb,
                           SyncQueue& q);
  bool IsEngineLoaded(const std::string& e);

 private:
  struct SyncQueue {
    void push(std::pair<Json::Value, Json::Value>&& p) {
      std::unique_lock<std::mutex> l(mtx);
      q.push(p);
      cond.notify_one();
    }

    std::pair<Json::Value, Json::Value> wait_and_pop() {
      std::unique_lock<std::mutex> l(mtx);
      cond.wait(l, [this] { return !q.empty(); });
      auto res = q.front();
      q.pop();
      return res;
    }

    std::mutex mtx;
    std::condition_variable cond;
    // Status and result
    std::queue<std::pair<Json::Value, Json::Value>> q;
  };
  struct StreamStatus {
    void Done() {
      std::unique_lock<std::mutex> l(m);
      stream_done = true;
      cv.notify_all();
    }

    void Wait() {
      std::unique_lock<std::mutex> l(m);
      cv.wait(l, [this] { return stream_done; });
    }

   private:
    std::mutex m;
    std::condition_variable cv;
    bool stream_done = false;
  };

 private:
  using EngineV = std::variant<EngineI*, CortexPythonEngineI*, CortexTensorrtLlmEngineI*>;
  struct EngineInfo {
    std::unique_ptr<cortex_cpp::dylib> dl;
    EngineV engine;
  };
  std::unordered_map<std::string, EngineInfo> engines_;
};
};  // namespace inferences
