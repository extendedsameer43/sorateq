(()=>{var e={};e.id=409,e.ids=[409],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},6749:(e,t,o)=>{"use strict";o.r(t),o.d(t,{GlobalError:()=>i.a,__next_app__:()=>d,originalPathname:()=>f,pages:()=>c,routeModule:()=>m,tree:()=>u}),o(9333),o(996),o(2767);var r=o(170),n=o(5002),a=o(3876),i=o.n(a),l=o(6299),s={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(s[e]=()=>l[e]);o.d(t,s);let u=["",{children:["/_not-found",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(o.t.bind(o,996,23)),"next/dist/client/components/not-found-error"]}]},{}]},{layout:[()=>Promise.resolve().then(o.bind(o,2767)),"C:\\Users\\Sameer Mishra\\Desktop\\SORATEQ\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(o.t.bind(o,996,23)),"next/dist/client/components/not-found-error"]}],c=[],f="/_not-found/page",d={require:o,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/_not-found/page",pathname:"/_not-found",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},6906:(e,t,o)=>{Promise.resolve().then(o.t.bind(o,3642,23)),Promise.resolve().then(o.t.bind(o,7586,23)),Promise.resolve().then(o.t.bind(o,7838,23)),Promise.resolve().then(o.t.bind(o,8057,23)),Promise.resolve().then(o.t.bind(o,7741,23)),Promise.resolve().then(o.t.bind(o,3118,23))},7644:(e,t,o)=>{Promise.resolve().then(o.bind(o,2632))},2632:(e,t,o)=>{"use strict";o.d(t,{default:()=>a});var r=o(7247),n=o(8964);let a=()=>{let e=(0,n.useRef)(null),t=(0,n.useRef)(),o=(0,n.useRef)({x:.5,y:.5}),a=(0,n.useRef)({x:.5,y:.5});return(0,n.useEffect)(()=>{let r=e.current;if(!r)return;let n=r.getContext("webgl");if(!n){console.warn("WebGL not supported, falling back to CSS background");return}let i=`
      attribute vec2 a_position;
      varying vec2 v_uv;
      
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `,l=`
      precision mediump float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      
      // Improved noise function for smoother gradients
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        
        vec2 u = f * f * (3.0 - 2.0 * f);
        
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      // Enhanced FBM for flowing plasma effect
      float fbm(vec2 st, float time) {
        float value = 0.0;
        float amplitude = 0.5;
        
        // Add time-based offset for flow
        st += time * vec2(0.1, 0.05);
        
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
      
      // Domain warping for organic distortion
      vec2 domainWarp(vec2 st, float time) {
        float warpStrength = 0.3;
        return st + warpStrength * vec2(
          fbm(st + vec2(0.0, time * 0.1), time),
          fbm(st + vec2(time * 0.12, 0.0), time)
        );
      }
      
      void main() {
        vec2 st = v_uv;
        vec2 normalizedCoord = gl_FragCoord.xy / u_resolution;
        
        // Center coordinates
        vec2 pos = normalizedCoord - 0.5;
        pos.x *= u_resolution.x / u_resolution.y;
        
        // Mouse interaction - create elastic pull effect
        vec2 mousePos = u_mouse - 0.5;
        mousePos.x *= u_resolution.x / u_resolution.y;
        
        // Calculate distance from center to mouse
        float mouseDistance = length(mousePos);
        vec2 mouseDirection = normalize(mousePos);
        
        // Create elastic offset - blob follows mouse but springs back
        float pullStrength = 0.15; // How much the blob moves toward mouse
        float maxPull = 0.3; // Maximum displacement
        vec2 elasticOffset = mouseDirection * min(mouseDistance * pullStrength, maxPull);
        
        // Apply smooth falloff so effect is strongest at center
        float centerInfluence = 1.0 - smoothstep(0.0, 0.8, length(pos));
        elasticOffset *= centerInfluence;
        
        // Offset the position for mouse interaction
        vec2 interactivePos = pos - elasticOffset;
        
        // Apply domain warping for organic flow using interactive position
        vec2 warpedPos = domainWarp(interactivePos * 2.0, u_time * 0.2);
        
        // Multiple flowing noise layers for plasma effect
        float plasma1 = fbm(warpedPos * 1.5 + u_time * 0.08, u_time);
        float plasma2 = fbm(warpedPos * 2.3 + u_time * 0.12, u_time + 100.0);
        float plasma3 = fbm(warpedPos * 3.1 + u_time * 0.15, u_time + 200.0);
        
        // Combine plasma layers
        float combinedPlasma = plasma1 * 0.5 + plasma2 * 0.3 + plasma3 * 0.2;
        
        // Add radial falloff for subtle background gradient (using interactive position)
        float centerDistance = length(interactivePos);
        float radialFalloff = 1.0 - smoothstep(0.0, 1.8, centerDistance);
        
        // Apply breathing effect
        float breathe = 0.9 + 0.2 * sin(u_time * 0.3);
        radialFalloff *= breathe;
        
        // Remove corner shrinking for full screen coverage
        // Keep the organic distortion but make it more subtle (using interactive position)
        float ballDistortion = sin(atan(interactivePos.y, interactivePos.x) * 3.0 + u_time * 0.15) * 0.1;
        ballDistortion += sin(atan(interactivePos.y, interactivePos.x) * 5.0 + u_time * 0.1) * 0.05;
        float distortedRadius = centerDistance + ballDistortion * 0.3;
        float organicGlow = 1.0 - smoothstep(0.3, 1.5, distortedRadius);
        radialFalloff *= (0.3 + organicGlow * 0.7);
        
        // Create flowing heat zones with much subtler intensity
        float heatZone1 = sin(combinedPlasma * 6.28 + u_time * 0.3) * 0.3 + 0.4;
        float heatZone2 = sin(combinedPlasma * 8.0 + u_time * 0.4 + 2.0) * 0.2 + 0.3;
        float heatZone3 = sin(combinedPlasma * 4.0 + u_time * 0.25 + 4.0) * 0.15 + 0.25;
        
        // Much more subtle color mapping to match reference image
        vec3 color1 = vec3(0.15, 0.05, 0.04) * heatZone1; // Dark red
        vec3 color2 = vec3(0.25, 0.08, 0.06) * heatZone2; // Slightly brighter red
        vec3 color3 = vec3(0.35, 0.12, 0.08) * heatZone3; // Medium red
        
        // Blend colors based on plasma values
        vec3 plasmaColor = mix(color1, color2, smoothstep(0.2, 0.6, plasma1));
        plasmaColor = mix(plasmaColor, color3, smoothstep(0.3, 0.7, plasma2));
        
        // Apply radial falloff but keep it very subtle for full screen coverage
        plasmaColor *= radialFalloff * 0.8 + 0.3; // Always some base intensity
        
        // Add very subtle flowing highlights only near center
        float edgeGlow = smoothstep(0.4, 0.7, combinedPlasma) * radialFalloff * 0.15;
        plasmaColor += edgeGlow * vec3(0.4, 0.15, 0.1);
        
        // Darker base background to match reference
        vec3 baseColor = vec3(0.05, 0.02, 0.015);
        
        // Combine everything with more prominent base color
        vec3 finalColor = baseColor + plasmaColor;
        
        // Reduce noise intensity
        float grain = noise(normalizedCoord * 150.0 + u_time * 0.05) * 0.01;
        finalColor += grain;
        
        // Reduce vignette effect for more uniform coverage
        float vignette = 1.0 - length(normalizedCoord - 0.5) * 0.2;
        finalColor *= vignette;
        
        // Add ambient temperature variation
        float ambient = 0.8 + 0.2 * sin(u_time * 0.1 + combinedPlasma * 2.0);
        finalColor *= ambient;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,s=(e,t,o)=>{let r=e.createShader(t);return r?(e.shaderSource(r,o),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS))?r:(console.error("Shader compilation error:",e.getShaderInfoLog(r)),e.deleteShader(r),null):null},u=s(n,n.VERTEX_SHADER,i),c=s(n,n.FRAGMENT_SHADER,l);if(!u||!c)return;let f=((e,t,o)=>{let r=e.createProgram();return r?(e.attachShader(r,t),e.attachShader(r,o),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS))?r:(console.error("Program linking error:",e.getProgramInfoLog(r)),e.deleteProgram(r),null):null})(n,u,c);if(!f)return;let d=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,d),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),n.STATIC_DRAW);let m=n.getAttribLocation(f,"a_position"),p=n.getUniformLocation(f,"u_time"),v=n.getUniformLocation(f,"u_resolution"),g=n.getUniformLocation(f,"u_mouse"),h=()=>{let e=window.innerWidth,t=window.innerHeight;(r.width!==e||r.height!==t)&&(r.width=e,r.height=t,n.viewport(0,0,e,t))},b=e=>{h(),a.current.x+=(o.current.x-a.current.x)*.1,a.current.y+=(o.current.y-a.current.y)*.1,n.clearColor(0,0,0,1),n.clear(n.COLOR_BUFFER_BIT),n.useProgram(f),n.uniform1f(p,.001*e),n.uniform2f(v,r.width,r.height),n.uniform2f(g,a.current.x,a.current.y),n.enableVertexAttribArray(m),n.bindBuffer(n.ARRAY_BUFFER,d),n.vertexAttribPointer(m,2,n.FLOAT,!1,0,0),n.drawArrays(n.TRIANGLE_STRIP,0,4),t.current=requestAnimationFrame(b)};h(),b(0);let _=e=>{let t=r.getBoundingClientRect();o.current.x=(e.clientX-t.left)/t.width,o.current.y=1-(e.clientY-t.top)/t.height},P=()=>{o.current.x=.5,o.current.y=.5},x=()=>h();return window.addEventListener("resize",x),window.addEventListener("mousemove",_),window.addEventListener("mouseleave",P),()=>{window.removeEventListener("resize",x),window.removeEventListener("mousemove",_),window.removeEventListener("mouseleave",P),t.current&&cancelAnimationFrame(t.current)}},[]),r.jsx("canvas",{ref:e,className:"fixed top-0 left-0 w-full h-full pointer-events-none",style:{zIndex:1}})}},6868:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var o in t)Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}(t,{isNotFoundError:function(){return n},notFound:function(){return r}});let o="NEXT_NOT_FOUND";function r(){let e=Error(o);throw e.digest=o,e}function n(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===o}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9333:(e,t,o)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var o in t)Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}(t,{PARALLEL_ROUTE_DEFAULT_PATH:function(){return n},default:function(){return a}});let r=o(6868),n="next/dist/client/components/parallel-route-default.js";function a(){(0,r.notFound)()}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2767:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>s,metadata:()=>l});var r=o(2051),n=o(7233),a=o.n(n);o(5023);let i=(0,o(5347).createProxy)(String.raw`C:\Users\Sameer Mishra\Desktop\SORATEQ\src\components\WebGLBackground.tsx#default`),l={title:"SORATEQ - AI Research Lab",description:"H is an AI Research Lab and Product Company. Agentic AI isn't just another tool. It's the next generation of intelligent automation."};function s({children:e}){return r.jsx("html",{lang:"en",children:(0,r.jsxs)("body",{className:a().className,children:[r.jsx(i,{}),e]})})}},5023:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[355],()=>o(6749));module.exports=r})();