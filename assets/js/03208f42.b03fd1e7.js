"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8690],{73485:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var s=t(85893),o=t(11151);const a={title:"Chat Completion",description:"Inference engine for chat completion, the same as OpenAI's",keywords:["Nitro","Jan","fast inference","inference server","local AI","large language model","OpenAI compatible","open source","llama"]},r=void 0,i={id:"features/chat",title:"Chat Completion",description:"Inference engine for chat completion, the same as OpenAI's",source:"@site/docs/features/chat.md",sourceDirName:"features",slug:"/features/chat",permalink:"/features/chat",draft:!1,unlisted:!1,editUrl:"https://github.com/janhq/nitro/tree/main/docs/docs/features/chat.md",tags:[],version:"current",lastUpdatedBy:"automaticcat",lastUpdatedAt:1706927510,formattedLastUpdatedAt:"Feb 3, 2024",frontMatter:{title:"Chat Completion",description:"Inference engine for chat completion, the same as OpenAI's",keywords:["Nitro","Jan","fast inference","inference server","local AI","large language model","OpenAI compatible","open source","llama"]},sidebar:"docsSidebar",previous:{title:"Nitro Features",permalink:"/features/feat"},next:{title:"Embedding",permalink:"/features/embed"}},l={},c=[{value:"Single Request Example",id:"single-request-example",level:3},{value:"Dialog Request Example",id:"dialog-request-example",level:3},{value:"Chat Completion Response",id:"chat-completion-response",level:3}];function p(e){const n={a:"a",code:"code",h3:"h3",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:"The Chat Completion feature in Nitro provides a flexible way to interact with any local Large Language Model (LLM)."}),"\n",(0,s.jsx)(n.h3,{id:"single-request-example",children:"Single Request Example"}),"\n",(0,s.jsx)(n.p,{children:"To send a single query to your chosen LLM, follow these steps:"}),"\n",(0,s.jsx)("div",{class:"code-snippet-left",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",metastring:'title="Nitro"',children:'curl http://localhost:3928/v1/chat/completions \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "model": "",\n    "messages": [\n      {\n        "role": "user",\n        "content": "Hello"\n      },\n    ]\n  }\'\n\n'})})}),"\n",(0,s.jsx)("div",{class:"code-snippet-right",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",metastring:'title="OpenAI"',children:'curl https://api.openai.com/v1/chat/completions \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer $OPENAI_API_KEY" \\\n  -d \'{\n    "model": "gpt-3.5-turbo",\n    "messages": [\n      {\n        "role": "user",\n        "content": "Hello"\n      }\n    ]\n  }\'\n'})})}),"\n",(0,s.jsx)(n.p,{children:"This command sends a request to your local LLM, querying about the winner of the 2020 World Series."}),"\n",(0,s.jsx)(n.h3,{id:"dialog-request-example",children:"Dialog Request Example"}),"\n",(0,s.jsx)(n.p,{children:"For ongoing conversations or multiple queries, the dialog request feature is ideal. Here\u2019s how to structure a multi-turn conversation:"}),"\n",(0,s.jsx)("div",{class:"code-snippet-left",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",metastring:'title="Nitro"',children:'curl http://localhost:3928/v1/chat/completions \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "messages": [\n      {\n        "role": "system",\n        "content": "You are a helpful assistant."\n      },\n      {\n        "role": "user",\n        "content": "Who won the world series in 2020?"\n      },\n      {\n        "role": "assistant",\n        "content": "The Los Angeles Dodgers won the World Series in 2020."\n      },\n      {\n        "role": "user",\n        "content": "Where was it played?"\n      }\n    ]\n  }\'\n\n'})})}),"\n",(0,s.jsx)("div",{class:"code-snippet-right",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",metastring:'title="OpenAI"',children:'curl https://api.openai.com/v1/chat/completions \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer $OPENAI_API_KEY" \\\n  -d \'{\n    "messages": [\n      {\n        "role": "system",\n        "content": "You are a helpful assistant."\n      },\n      {\n        "role": "user",\n        "content": "Who won the world series in 2020?"\n      },\n      {\n        "role": "assistant",\n        "content": "The Los Angeles Dodgers won the World Series in 2020."\n      },\n      {\n        "role": "user",\n        "content": "Where was it played?"\n      }\n    ]\n  }\'\n'})})}),"\n",(0,s.jsx)(n.h3,{id:"chat-completion-response",children:"Chat Completion Response"}),"\n",(0,s.jsx)(n.p,{children:"Below are examples of responses from both the Nitro server and OpenAI:"}),"\n",(0,s.jsx)("div",{class:"code-snippet-left",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",metastring:'title="Nitro"',children:'{\n  "choices": [\n    {\n      "finish_reason": "stop",\n      "index": 0,\n      "message": {\n        "content": "Hello, how may I assist you this evening?",\n        "role": "assistant"\n      }\n    }\n  ],\n  "created": 1700215278,\n  "id": "sofpJrnBGUnchO8QhA0s",\n  "model": "_",\n  "object": "chat.completion",\n  "system_fingerprint": "_",\n  "usage": {\n    "completion_tokens": 13,\n    "prompt_tokens": 90,\n    "total_tokens": 103\n  }\n}\n'})})}),"\n",(0,s.jsx)("div",{class:"code-snippet-right",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",metastring:'title="OpenAI"',children:'{\n  "choices": [\n    {\n      "finish_reason": "stop",\n      "index": 0,\n      "message": {\n        "role": "assistant",\n        "content": "Hello there, how may I assist you today?",\n      }\n    }\n  ],\n  "created": 1677652288,\n  "id": "chatcmpl-123",\n  "model": "gpt-3.5-turbo-0613",\n  "object": "chat.completion",\n  "system_fingerprint": "fp_44709d6fcb",\n  "usage": {\n    "completion_tokens": 12,\n    "prompt_tokens": 9,\n    "total_tokens": 21\n  }\n}\n'})})}),"\n",(0,s.jsxs)(n.p,{children:["The chat completion feature in Nitro showcases compatibility with OpenAI, making the transition between using OpenAI and local AI models more straightforward. For further details and advanced usage, please refer to the ",(0,s.jsx)(n.a,{href:"https://nitro.jan.ai/api-reference",children:"API reference"}),"."]})]})}function d(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(p,{...e})}):p(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>i,a:()=>r});var s=t(67294);const o={},a=s.createContext(o);function r(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);