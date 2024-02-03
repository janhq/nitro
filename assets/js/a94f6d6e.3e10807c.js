"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8435],{29975:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var r=t(85893),s=t(11151);const i={title:"Architecture",slug:"/achitecture",keywords:["Nitro","Jan","fast inference","inference server","local AI","large language model","OpenAI compatible","open source","llama"]},o=void 0,a={id:"new/architecture",title:"Architecture",description:"Nitro Architecture",source:"@site/docs/new/architecture.md",sourceDirName:"new",slug:"/achitecture",permalink:"/achitecture",draft:!1,unlisted:!1,editUrl:"https://github.com/janhq/nitro/tree/main/docs/docs/new/architecture.md",tags:[],version:"current",lastUpdatedBy:"automaticcat",lastUpdatedAt:1706927510,formattedLastUpdatedAt:"Feb 3, 2024",frontMatter:{title:"Architecture",slug:"/achitecture",keywords:["Nitro","Jan","fast inference","inference server","local AI","large language model","OpenAI compatible","open source","llama"]}},c={},l=[{value:"Key Concepts",id:"key-concepts",level:2},{value:"Inference Server",id:"inference-server",level:2},{value:"Batching",id:"batching",level:2},{value:"Parallel Processing",id:"parallel-processing",level:2},{value:"Drogon Framework",id:"drogon-framework",level:2}];function d(e){const n={h2:"h2",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"Nitro Architecture",src:t(95738).Z+"",width:"1251",height:"346"})}),"\n",(0,r.jsx)(n.h2,{id:"key-concepts",children:"Key Concepts"}),"\n",(0,r.jsx)(n.h2,{id:"inference-server",children:"Inference Server"}),"\n",(0,r.jsx)(n.p,{children:"An inference server is a type of server designed to process requests for running large language models and to return predictions. This server acts as the backbone for AI-powered applications, providing real-time execution of models to analyze data and make decisions."}),"\n",(0,r.jsx)(n.h2,{id:"batching",children:"Batching"}),"\n",(0,r.jsx)(n.p,{children:"Batching refers to the process of grouping several tasks and processing them as a single batch. In large language models inference, this means combining multiple inference requests into one batch to improve computational efficiency, leading to quicker response times and higher throughput."}),"\n",(0,r.jsx)(n.h2,{id:"parallel-processing",children:"Parallel Processing"}),"\n",(0,r.jsx)(n.p,{children:"Parallel processing involves executing multiple computations simultaneously. For web servers and applications, this enables the handling of multiple requests at the same time, ensuring high efficiency and preventing delays in request processing."}),"\n",(0,r.jsx)(n.h2,{id:"drogon-framework",children:"Drogon Framework"}),"\n",(0,r.jsx)(n.p,{children:"Drogon is an HTTP application framework based on C++14/17, designed for its speed and simplicity. Utilizing a non-blocking I/O and event-driven architecture, Drogon manages HTTP requests efficiently for high-performance and scalable applications."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Event Loop"}),": Drogon uses an event loop to wait for and dispatch events or messages within a program. This allows for handling many tasks asynchronously, without relying on multi-threading."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Threads"}),': While the event loop allows for efficient task management, Drogon also employs threads to handle parallel operations. These "drogon threads" process multiple tasks concurrently.']}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Asynchronous Operations"}),": The framework supports non-blocking operations, permitting the server to continue processing other tasks while awaiting responses from databases or external services."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Scalability"}),": Drogon's architecture is built to scale, capable of managing numerous connections at once, suitable for applications with high traffic loads."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},95738:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/architecture.drawio-a660cbefddbbda18138ef4639fa64167.png"},11151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>o});var r=t(67294);const s={},i=r.createContext(s);function o(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);