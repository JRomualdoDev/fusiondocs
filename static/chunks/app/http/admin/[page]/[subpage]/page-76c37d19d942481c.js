(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[73],{2722:function(e,t,n){Promise.resolve().then(n.bind(n,166))},551:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a}});let r=n(9920);n(7437),n(2265);let l=r._(n(148));function a(e,t){var n;let r={loading:e=>{let{error:t,isLoading:n,pastDelay:r}=e;return null}};"function"==typeof e&&(r.loader=e);let a={...r,...t};return(0,l.default)({...a,modules:null==(n=a.loadableGenerated)?void 0:n.modules})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},912:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return l}});let r=n(5592);function l(e){let{reason:t,children:n}=e;if("undefined"==typeof window)throw new r.BailoutToCSRError(t);return n}},148:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return o}});let r=n(7437),l=n(2265),a=n(912),u=n(1481);function s(e){return{default:e&&"default"in e?e.default:e}}let i={loader:()=>Promise.resolve(s(()=>null)),loading:null,ssr:!0},o=function(e){let t={...i,...e},n=(0,l.lazy)(()=>t.loader().then(s)),o=t.loading;function d(e){let s=o?(0,r.jsx)(o,{isLoading:!0,pastDelay:!0,error:null}):null,i=t.ssr?(0,r.jsxs)(r.Fragment,{children:["undefined"==typeof window?(0,r.jsx)(u.PreloadCss,{moduleIds:t.modules}):null,(0,r.jsx)(n,{...e})]}):(0,r.jsx)(a.BailoutToCSR,{reason:"next/dynamic",children:(0,r.jsx)(n,{...e})});return(0,r.jsx)(l.Suspense,{fallback:s,children:i})}return d.displayName="LoadableComponent",d}},1481:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadCss",{enumerable:!0,get:function(){return a}});let r=n(7437),l=n(8512);function a(e){let{moduleIds:t}=e;if("undefined"!=typeof window)return null;let n=(0,l.getExpectedRequestStore)("next/dynamic css"),a=[];if(n.reactLoadableManifest&&t){let e=n.reactLoadableManifest;for(let n of t){if(!e[n])continue;let t=e[n].files.filter(e=>e.endsWith(".css"));a.push(...t)}}return 0===a.length?null:(0,r.jsx)(r.Fragment,{children:a.map(e=>(0,r.jsx)("link",{precedence:"dynamic",rel:"stylesheet",href:n.assetPrefix+"/_next/"+encodeURI(e),as:"style"},e))})}},166:function(e,t,n){"use strict";n.d(t,{default:function(){return i}});var r=n(7437),l=n(551),a=n.n(l);n(4077);var u=n(8358);let s=a()(()=>Promise.all([n.e(821),n.e(833),n.e(130),n.e(939),n.e(350)]).then(n.bind(n,8350)),{loadableGenerated:{webpack:()=>[8350]},ssr:!1,loading:()=>(0,r.jsx)("p",{children:"Loading ..."})});function i(e){let{page:t,subpage:n}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"inline-flex w-full p-3 border border-l-0 items-center",children:(0,r.jsx)(u.aG,{className:"ps-4 w-full",children:(0,r.jsxs)(u.Jb,{children:[(0,r.jsx)(u.gN,{children:(0,r.jsx)(u.At,{href:"/http/show/".concat(t),children:t})}),(0,r.jsx)(u.bg,{}),(0,r.jsx)(u.gN,{children:(0,r.jsx)(u.At,{href:"/http/show/".concat(t,"/").concat(n),children:n})})]})})}),(0,r.jsx)("div",{className:" w-full pt-8",children:(0,r.jsx)(s,{page:{page:t,subpage:n}})})]})}},8358:function(e,t,n){"use strict";n.d(t,{At:function(){return c},Jb:function(){return o},aG:function(){return i},bg:function(){return f},gN:function(){return d}});var r=n(7437),l=n(2265),a=n(4867),u=n(1538),s=n(9354);let i=l.forwardRef((e,t)=>{let{...n}=e;return(0,r.jsx)("nav",{ref:t,"aria-label":"breadcrumb",...n})});i.displayName="Breadcrumb";let o=l.forwardRef((e,t)=>{let{className:n,...l}=e;return(0,r.jsx)("ol",{ref:t,className:(0,s.cn)("flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",n),...l})});o.displayName="BreadcrumbList";let d=l.forwardRef((e,t)=>{let{className:n,...l}=e;return(0,r.jsx)("li",{ref:t,className:(0,s.cn)("inline-flex items-center gap-1.5",n),...l})});d.displayName="BreadcrumbItem";let c=l.forwardRef((e,t)=>{let{asChild:n,className:l,...a}=e,i=n?u.g7:"a";return(0,r.jsx)(i,{ref:t,className:(0,s.cn)("transition-colors hover:text-foreground",l),...a})});c.displayName="BreadcrumbLink",l.forwardRef((e,t)=>{let{className:n,...l}=e;return(0,r.jsx)("span",{ref:t,role:"link","aria-disabled":"true","aria-current":"page",className:(0,s.cn)("font-normal text-foreground",n),...l})}).displayName="BreadcrumbPage";let f=e=>{let{children:t,className:n,...l}=e;return(0,r.jsx)("li",{role:"presentation","aria-hidden":"true",className:(0,s.cn)("[&>svg]:size-3.5",n),...l,children:null!=t?t:(0,r.jsx)(a.XCv,{})})};f.displayName="BreadcrumbSeparator"},9354:function(e,t,n){"use strict";n.d(t,{cn:function(){return a}});var r=n(4839),l=n(6164);function a(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,l.m6)((0,r.W)(t))}},4077:function(){}},function(e){e.O(0,[772,310,967,971,23,744],function(){return e(e.s=2722)}),_N_E=e.O()}]);