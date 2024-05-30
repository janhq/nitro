#pragma once
#include <drogon/HttpClient.h>
#include <drogon/HttpResponse.h>
#include <trantor/utils/Logger.h>
#include <algorithm>
#include <fstream>
#include <iostream>
#include <ostream>
#include <regex>
#include <vector>
#include "cstdio"
#include "random"
#include "string"
// Include platform-specific headers
#ifdef _WIN32
#include <windows.h>
#include <winsock2.h>
#else
#include <dirent.h>
#include <unistd.h>
#endif

#if __APPLE__
#include <limits.h>
#include <mach-o/dyld.h>
#endif

namespace {
constexpr static auto kLlamaEngine = "cortex.llamacpp";
constexpr static auto kPythonRuntimeEngine = "cortex.python";
constexpr static auto kTensorrtLlmEngine = "cortex.tensorrt-llm";
}  // namespace

namespace cortex_utils {
constexpr static auto kLlamaLibPath = "/engines/cortex.llamacpp";
constexpr static auto kPythonRuntimeLibPath = "/engines/cortex.python";
constexpr static auto kTensorrtLlmLibPath = "/engines/cortex.tensorrt-llm";

inline std::string models_folder = "./models";

inline std::string extractBase64(const std::string& input) {
  std::regex pattern("base64,(.*)");
  std::smatch match;

  if (std::regex_search(input, match, pattern)) {
    std::string base64_data = match[1];
    base64_data = base64_data.substr(0, base64_data.length() - 1);
    return base64_data;
  }

  return "";
}

// Helper function to encode data to Base64
inline std::string base64Encode(const std::vector<unsigned char>& data) {
  static const char encodingTable[] =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  std::string encodedData;
  int i = 0;
  int j = 0;
  unsigned char array3[3];
  unsigned char array4[4];

  for (unsigned char c : data) {
    array3[i++] = c;
    if (i == 3) {
      array4[0] = (array3[0] & 0xfc) >> 2;
      array4[1] = ((array3[0] & 0x03) << 4) + ((array3[1] & 0xf0) >> 4);
      array4[2] = ((array3[1] & 0x0f) << 2) + ((array3[2] & 0xc0) >> 6);
      array4[3] = array3[2] & 0x3f;

      for (i = 0; i < 4; i++)
        encodedData += encodingTable[array4[i]];
      i = 0;
    }
  }

  if (i) {
    for (j = i; j < 3; j++)
      array3[j] = '\0';

    array4[0] = (array3[0] & 0xfc) >> 2;
    array4[1] = ((array3[0] & 0x03) << 4) + ((array3[1] & 0xf0) >> 4);
    array4[2] = ((array3[1] & 0x0f) << 2) + ((array3[2] & 0xc0) >> 6);

    for (j = 0; j < i + 1; j++)
      encodedData += encodingTable[array4[j]];

    while (i++ < 3)
      encodedData += '=';
  }

  return encodedData;
}

// Function to load an image and convert it to Base64
inline std::string imageToBase64(const std::string& imagePath) {
  std::ifstream imageFile(imagePath, std::ios::binary);
  if (!imageFile.is_open()) {
    throw std::runtime_error("Could not open the image file.");
  }

  std::vector<unsigned char> buffer(std::istreambuf_iterator<char>(imageFile),
                                    {});
  return base64Encode(buffer);
}

// Helper function to generate a unique filename
inline std::string generateUniqueFilename(const std::string& prefix,
                                          const std::string& extension) {
  // Get current time as a timestamp
  auto now = std::chrono::system_clock::now();
  auto now_ms = std::chrono::time_point_cast<std::chrono::milliseconds>(now);
  auto epoch = now_ms.time_since_epoch();
  auto value = std::chrono::duration_cast<std::chrono::milliseconds>(epoch);

  // Generate a random number
  std::random_device rd;
  std::mt19937 gen(rd());
  std::uniform_int_distribution<> dis(1000, 9999);

  std::stringstream ss;
  ss << prefix << value.count() << "_" << dis(gen) << extension;
  return ss.str();
}

inline void processLocalImage(
    const std::string& localPath,
    std::function<void(const std::string&)> callback) {
  try {
    std::string base64Image = imageToBase64(localPath);
    callback(base64Image);  // Invoke the callback with the Base64 string
  } catch (const std::exception& e) {
    std::cerr << "Error during processing: " << e.what() << std::endl;
  }
}

inline std::vector<std::string> listFilesInDir(const std::string& path) {
  std::vector<std::string> files;

#ifdef _WIN32
  // Windows-specific code
  WIN32_FIND_DATA findFileData;
  HANDLE hFind = FindFirstFile((path + "\\*").c_str(), &findFileData);

  if (hFind != INVALID_HANDLE_VALUE) {
    do {
      if (!(findFileData.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY)) {
        files.push_back(findFileData.cFileName);
      }
    } while (FindNextFile(hFind, &findFileData) != 0);
    FindClose(hFind);
  }
#else
  // POSIX-specific code (Linux, Unix, MacOS)
  DIR* dir;
  struct dirent* ent;

  if ((dir = opendir(path.c_str())) != NULL) {
    while ((ent = readdir(dir)) != NULL) {
      if (ent->d_type == DT_REG) {  // Check if it's a regular file
        files.push_back(ent->d_name);
      }
    }
    closedir(dir);
  }
#endif

  return files;
}

inline std::string rtrim(const std::string& str) {
  size_t end = str.find_last_not_of("\n\t ");
  return (end == std::string::npos) ? "" : str.substr(0, end + 1);
}

inline std::string generate_random_string(std::size_t length) {
  const std::string characters =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  std::random_device rd;
  std::mt19937 generator(rd());

  std::uniform_int_distribution<> distribution(
      0, static_cast<int>(characters.size()) - 1);

  std::string random_string(length, '\0');
  std::generate_n(random_string.begin(), length,
                  [&]() { return characters[distribution(generator)]; });

  return random_string;
}

#if (defined(__GNUC__) || defined(__clang__)) && \
    (defined(__x86_64__) || defined(__i386__))
#include <cpuid.h>
inline bool isAVX2Supported() {
  unsigned eax, ebx, ecx, edx;
  if (__get_cpuid_max(0, nullptr) < 7)
    return false;

  __get_cpuid_count(7, 0, &eax, &ebx, &ecx, &edx);
  return (ebx & (1 << 5)) != 0;
}
#elif defined(_MSC_VER) && defined(_M_X64) || defined(_M_IX86)
#include <intrin.h>
inline bool isAVX2Supported() {
  int cpuInfo[4];
  __cpuid(cpuInfo, 0);
  int nIds = cpuInfo[0];
  if (nIds >= 7) {
    __cpuidex(cpuInfo, 7, 0);
    return (cpuInfo[1] & (1 << 5)) != 0;
  }
  return false;
}
#else
inline bool isAVX2Supported() {
  return false;
}
#endif

inline void nitro_logo() {
  std::string rainbowColors[] = {
      "\033[93m",  // Yellow
      "\033[94m",  // Blue
  };

  std::string resetColor = "\033[0m";
  std::string asciiArt =
      "      ___                                   ___           ___     \n"
      "     /__/        ___           ___        /  /\\         /  /\\    \n"
      "     \\  \\:\\      /  /\\         /  /\\      /  /::\\       /  /::\\  "
      " \n"
      "      \\  \\:\\    /  /:/        /  /:/     /  /:/\\:\\     /  /:/\\:\\ "
      " \n"
      "  _____\\__\\:\\  /__/::\\       /  /:/     /  /:/  \\:\\   /  /:/  "
      "\\:\\ \n"
      " /__/::::::::\\ \\__\\/\\:\\__   /  /::\\    /__/:/ /:/___ /__/:/ "
      "\\__\\:\\\n"
      " \\  \\:\\~~\\~~\\/    \\  \\:\\/\\ /__/:/\\:\\   \\  \\:\\/:::::/ \\  "
      "\\:\\ /  /:/\n"
      "  \\  \\:\\  ~~~      \\__\\::/ \\__\\/  \\:\\   \\  \\::/~~~~   \\  "
      "\\:\\  /:/ \n"
      "   \\  \\:\\          /__/:/       \\  \\:\\   \\  \\:\\        \\  "
      "\\:\\/:/  \n"
      "    \\  \\:\\         \\__\\/         \\__\\/    \\  \\:\\        \\  "
      "\\::/   \n"
      "     \\__\\/                                 \\__\\/         \\__\\/    "
      "\n";

  int colorIndex = 0;

  for (char c : asciiArt) {
    if (c == '\n') {
      std::cout << resetColor << c;
      colorIndex = 0;
    } else {
      std::cout << rainbowColors[colorIndex % 2] << c;
      colorIndex++;
    }
  }

  std::cout << resetColor;  // Reset color at the endreturn;
}

inline drogon::HttpResponsePtr nitroHttpResponse() {
  auto resp = drogon::HttpResponse::newHttpResponse();
#ifdef ALLOW_ALL_CORS
  LOG_INFO << "Respond for all cors!";
  resp->addHeader("Access-Control-Allow-Origin", "*");
#endif
  return resp;
}

inline drogon::HttpResponsePtr nitroHttpJsonResponse(const Json::Value& data) {
  auto resp = drogon::HttpResponse::newHttpJsonResponse(data);
#ifdef ALLOW_ALL_CORS
  LOG_INFO << "Respond for all cors!";
  resp->addHeader("Access-Control-Allow-Origin", "*");
#endif
  // Drogon already set the content-type header to "application/json"
  return resp;
};

inline drogon::HttpResponsePtr nitroStreamResponse(
    const std::function<std::size_t(char*, std::size_t)>& callback,
    const std::string& attachmentFileName = "") {
  auto resp = drogon::HttpResponse::newStreamResponse(
      callback, attachmentFileName, drogon::CT_NONE, "text/event-stream");
#ifdef ALLOW_ALL_CORS
  LOG_INFO << "Respond for all cors!";
  resp->addHeader("Access-Control-Allow-Origin", "*");
#endif
  return resp;
}

inline void ltrim(std::string& s) {
  s.erase(s.begin(), std::find_if(s.begin(), s.end(), [](unsigned char ch) {
            return !std::isspace(ch);
          }));
};

#if defined(_WIN32)
inline std::string GetCurrentPath() {
  wchar_t path[MAX_PATH];
  DWORD result = GetModuleFileNameW(NULL, path, MAX_PATH);
  if (result == 0) {
    std::wcerr << L"Error getting module file name." << std::endl;
    return "";
  }
  std::wstring::size_type pos = std::wstring(path).find_last_of(L"\\/");
  auto ws = std::wstring(path).substr(0, pos);
  std::string res;
  std::transform(ws.begin(), ws.end(), std::back_inserter(res),
                 [](wchar_t c) { return (char)c; });
  return res;
}
#else
inline std::string GetCurrentPath() {
#ifdef __APPLE__
  char buf[PATH_MAX];
  uint32_t bufsize = PATH_MAX;

  if (_NSGetExecutablePath(buf, &bufsize) == 0) {
    auto s = std::string(buf);
    auto const pos = s.find_last_of('/');
    return s.substr(0, pos);
  }
  return "";
#else
  std::vector<char> buf(PATH_MAX);
  ssize_t len = readlink("/proc/self/exe", &buf[0], buf.size());
  if (len == -1 || len == buf.size()) {
    std::cerr << "Error reading symlink /proc/self/exe." << std::endl;
    return "";
  }
  auto s = std::string(&buf[0], len);
  auto const pos = s.find_last_of('/');
  return s.substr(0, pos);
#endif
}
#endif

inline std::string GetEnginePathByName(std::string_view engine_name) {
  if (engine_name == kLlamaEngine) {
    return kLlamaLibPath;
  }
  if (engine_name == kPythonRuntimeEngine) {
    return kPythonRuntimeLibPath;
  }
  if (engine_name == kTensorrtLlmEngine) {
    return kTensorrtLlmLibPath;
  }

  LOG_ERROR << "Invalid engine: " << engine_name;
  return "";
};

}  // namespace cortex_utils
