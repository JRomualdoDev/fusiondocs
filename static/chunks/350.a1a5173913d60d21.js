"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[350],{9236:function(e,t,a){a.d(t,{C:function(){return s}}),a(4590);var s=(0,a(8064).$)("1008871c7dc407b607e5d4ef8a13b9da18ee4192")},1303:function(e,t,a){let s=(0,a(2265).createContext)({isAdmin:!1,setIsAdmin:()=>{}});t.Z=s},8350:function(e,t,a){let s;a.r(t),a.d(t,{default:function(){return J}});var l,n=a(7437),r=a(2265),o=a(2254),i=a(1303),d=a(2314);a(4590);var c=(0,a(8064).$)("b1fa02572de70816ef98041ff0b0407787553c3e"),u=a(9236);async function f(e){let t="";return(await (0,u.C)()).forEach(a=>{a.subMenu.forEach(a=>{let s=a.link.split("/").filter(e=>""!==e);if(s[2]===e.page&&s[3]===e.subpage)for(let[s,l]of Object.entries(a))l===e.subpage&&(t=a.content)})}),t}var m=a(23),x=a(9067),h=a(4020),p=a(6669),g=a(9354),v=a(9733);let b=p.fC;p.xz;let y=p.h_,N=r.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,n.jsx)(p.aV,{className:(0,g.cn)("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",a),...s,ref:t})});N.displayName=p.aV.displayName;let j=r.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,n.jsxs)(y,{children:[(0,n.jsx)(N,{}),(0,n.jsx)(p.VY,{ref:t,className:(0,g.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",a),...s})]})});j.displayName=p.VY.displayName;let w=e=>{let{className:t,...a}=e;return(0,n.jsx)("div",{className:(0,g.cn)("flex flex-col space-y-2 text-center sm:text-left",t),...a})};w.displayName="AlertDialogHeader";let Z=e=>{let{className:t,...a}=e;return(0,n.jsx)("div",{className:(0,g.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",t),...a})};Z.displayName="AlertDialogFooter";let k=r.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,n.jsx)(p.Dx,{ref:t,className:(0,g.cn)("text-lg font-semibold",a),...s})});k.displayName=p.Dx.displayName;let E=r.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,n.jsx)(p.dk,{ref:t,className:(0,g.cn)("text-sm text-muted-foreground",a),...s})});function C(){return(0,n.jsx)(b,{open:!0,onOpenChange:()=>{},children:(0,n.jsxs)(j,{children:[(0,n.jsxs)(w,{children:[(0,n.jsx)(k,{children:"Salvamento autom\xe1tico do documento."}),(0,n.jsx)(E,{children:"Documento em processo de salvamento."})]}),(0,n.jsx)(Z,{})]})})}E.displayName=p.dk.displayName,r.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,n.jsx)(p.aU,{ref:t,className:(0,g.cn)((0,v.d)(),a),...s})}).displayName=p.aU.displayName,r.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,n.jsx)(p.$j,{ref:t,className:(0,g.cn)((0,v.d)({variant:"outline"}),"mt-2 sm:mt-0",a),...s})}).displayName=p.$j.displayName;var R=a(402),T=a(5387),S=a(6410),z=a(3729),_=a(3835),q=a(3565),A=a(4216),P=a(2538),D=a(5890),M=a(6994),V=a(6025),I=a(4790),L=a(2660),O=a(5667),$=a(6209),B=a(8202);let H=a(7795),F=a(1916);var U=a(7138);let Y=(e,t)=>{let{messages:a,input:n,setInput:u,handleInputChange:m,handleSubmit:x,append:h}=(0,d.RJ)({api:"http://localhost:3000/api/chat"}),[p,g]=(0,r.useState)(),[v,b]=(0,r.useState)("gray"),[y,N]=(0,r.useState)(!1),[j,w]=(0,r.useState)({}),{isAdmin:Z,setIsAdmin:k}=(0,r.useContext)(i.Z),E=(0,r.useRef)(!1);return(0,r.useEffect)(()=>{E.current||(E.current=!0,(async()=>{s=await f(t),l=new o.Z({holder:e,autofocus:!0,tools:{header:{class:H,tunes:["tune"]},paragraph:{class:O.Z,inlineToolbar:!0},linkTool:{class:T.Z,config:{endpoint:"http://localhost:3000/api/teste",queryParam:"search"}},table:{class:S.Z,inlineToolbar:!0,config:{rows:2,cols:3}},list:{class:z.Z,inlineToolbar:!0,config:{defaultStyle:"unordered"}},warning:{class:_.Z,inlineToolbar:!0,config:{titlePlaceholder:"Title",messagePlaceholder:"Message"}},quote:{class:D.Z,inlineToolbar:!0,config:{quotePlaceholder:"Enter a quote",captionPlaceholder:"Quote's author"}},Marker:{class:M.Z},checklist:{class:V.Z,inlineToolbar:!0},list2:{class:B.Z,inlineToolbar:!0,config:{defaultStyle:"unordered"}},inlineCode:{class:L.Z,shortcut:"CMD+SHIFT+M"},tune:{class:F,config:{default:"right",blocks:{header:"center",list:"right"}}},aiText:{class:$.Z,config:{callback:e=>new Promise(e=>{h({role:"user",content:"Hello, how can I help you?"}),setTimeout(()=>{e(a),console.log(a)},1e3)})}},code:q.Z,image:A.Z,raw:P.Z,delimiter:I.Z},data:s,onReady:async()=>{g(l)},onChange:async(e,a)=>{!1===e.readOnly.isEnabled?await e.saver.save().then(e=>{w(e),c(e,t).then(e=>{"Arquivo salvo com sucesso!"===e&&(b("green"),setTimeout(()=>{b("gray")},1e3))})}):w(s)}})})())}),(0,r.useEffect)(()=>{if(!p)return;let t=document.getElementById(e),a=()=>N(!0),s=()=>N(!1);return null==t||t.addEventListener("focusin",a),null==t||t.addEventListener("focusout",s),()=>{null==t||t.removeEventListener("focusin",a),null==t||t.removeEventListener("focusout",s)}},[e,p]),(0,r.useEffect)(()=>{p&&l.readOnly.toggle(!Z)},[p,Z]),[p,v,y,j]};function J(e){var t;let{page:a}=e,s="editorjs",l=Y(s,a);l[0];let r=l[1],o=l[2],i=l[3];return document.querySelectorAll("[data-anchor]").forEach(e=>{let t=e.getAttribute("data-anchor"),a=document.createElement("a");a.id=t,e.parentNode.insertBefore(a,e),document.querySelectorAll('a[href="#'.concat(t,'"]')).forEach(e=>{e.href="#".concat(t)})}),(0,n.jsxs)("div",{className:"flex flex-col h-[calc(100vh-100px)] w-full p-4",children:[(0,n.jsxs)("div",{className:"w-full inline-flex h-[calc(100vh-100px)]",children:[(0,n.jsxs)("div",{className:"pt-10 ps-10 w-[1024px]",children:[(0,n.jsxs)("div",{className:"flex justify-end xl:pe-[20%] md:pe-[15%] sm:pe-0",children:["green"==r&&(0,n.jsx)(R._,{className:"text-xs font-semibold text-green-500 pe-2 items-center",children:"Salvando"}),(0,n.jsx)(x.Z,{size:18,color:null!=r?r:"gray"})]}),(0,n.jsx)(m.x,{className:"h-[calc(100vh-220px)]",children:(0,n.jsx)("div",{id:s})})]}),(0,n.jsxs)("div",{className:"flex flex-col w-[300px] ps-4",children:[(0,n.jsxs)("div",{className:"inline-flex h-8 mt-2 items-center",children:[(0,n.jsx)(h.Z,{className:"w-5 h-5 me-2"}),(0,n.jsx)(R._,{children:"Nesta P\xe1gina"})]}),null===(t=i.blocks)||void 0===t?void 0:t.map((e,t)=>{if("header"===e.type&&e.data.anchor){var a;return(0,n.jsx)("div",{className:" h-[30px] w-full ps-4 pt-1 border-l",children:(0,n.jsx)(U.default,{href:null!==(a="#".concat(e.data.anchor))&&void 0!==a?a:"#",className:"",children:e.data.text})},"".concat(e,"-").concat(t))}})]})]}),!1===o&&"green"==r&&(0,n.jsx)("div",{children:(0,n.jsx)(C,{})})]})}},9733:function(e,t,a){a.d(t,{d:function(){return i},z:function(){return d}});var s=a(7437),l=a(2265),n=a(1538),r=a(2218),o=a(9354);let i=(0,r.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),d=l.forwardRef((e,t)=>{let{className:a,variant:l,size:r,asChild:d=!1,...c}=e,u=d?n.g7:"button";return(0,s.jsx)(u,{className:(0,o.cn)(i({variant:l,size:r,className:a})),ref:t,...c})});d.displayName="Button"},402:function(e,t,a){a.d(t,{_:function(){return d}});var s=a(7437),l=a(2265),n=a(8364),r=a(2218),o=a(9354);let i=(0,r.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),d=l.forwardRef((e,t)=>{let{className:a,...l}=e;return(0,s.jsx)(n.f,{ref:t,className:(0,o.cn)(i(),a),...l})});d.displayName=n.f.displayName},23:function(e,t,a){a.d(t,{x:function(){return o}});var s=a(7437),l=a(2265),n=a(2286),r=a(9354);let o=l.forwardRef((e,t)=>{let{className:a,children:l,...o}=e;return(0,s.jsxs)(n.fC,{ref:t,className:(0,r.cn)("relative overflow-hidden",a),...o,children:[(0,s.jsx)(n.l_,{className:"h-full w-full rounded-[inherit]",children:l}),(0,s.jsx)(i,{}),(0,s.jsx)(n.Ns,{})]})});o.displayName=n.fC.displayName;let i=l.forwardRef((e,t)=>{let{className:a,orientation:l="vertical",...o}=e;return(0,s.jsx)(n.gb,{ref:t,orientation:l,className:(0,r.cn)("flex touch-none select-none transition-colors","vertical"===l&&"h-full w-2.5 border-l border-l-transparent p-[1px]","horizontal"===l&&"h-2.5 flex-col border-t border-t-transparent p-[1px]",a),...o,children:(0,s.jsx)(n.q4,{className:"relative flex-1 rounded-full bg-border"})})});i.displayName=n.gb.displayName}}]);