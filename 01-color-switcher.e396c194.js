const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");function d(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,n=setInterval((()=>{document.body.style.backgroundColor=d()}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(n)}));let n=setInterval((()=>{document.body.style.backgroundColor=d()}),1e3);
//# sourceMappingURL=01-color-switcher.e396c194.js.map