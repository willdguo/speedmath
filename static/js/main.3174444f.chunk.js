(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{255:function(e,t,n){e.exports=n(511)},511:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),l=n(241),r=n.n(l),i=n(26),c=n(513),m=n(509),d=n(20),s=n(510),u=n(508),g=function(e){var t=e.toggle,n=e.score,l=e.problems,r=e.setProblems,c=e.data,m=e.setData,d=Object(a.useState)(t%2===0?120:0),s=Object(i.a)(d,2),u=s[0],g=s[1],y=t%2===0?"Race Timer: ":"Countdown Timer: ",b=Object(a.useRef)(new Date),p=Object(a.useRef)([n,new Date]),h=function(){if(n!==p.current[0]){var e=(o=new Date,i=p.current[1],((Date.parse(o)-Date.parse(i))/1e3+(o.getMilliseconds()-i.getMilliseconds())/1e3).toFixed(2));p.current=[n,new Date],document.getElementById(n-1).style.color=["green","grey","red"][(a=e,a<1.5?0:a<3.5?1:2)],document.getElementById(n-1).style.opacity=.5;var t=l.pop();t.time=e,r(l.concat(t)),f(t),console.log(t)}var a,o,i},f=function(e){m(c.concat([{x:e.id+1,time:e.time}]))};return Object(a.useEffect)(function(){var e=setInterval(function(){!function(e){t%2===1?e/1e3<=120?g(120-e/1e3):(document.getElementById("game").style.visibility="hidden",document.getElementById("score").style.textAlign="center",document.getElementById("score").style.fontSize="30px"):n<40?g(e/1e3):(document.getElementById("game").style.visibility="hidden",document.getElementById("timer").style.textAlign="center",document.getElementById("timer").style.fontSize="30px")}(Date.parse(new Date)-Date.parse(b.current)),h()},100);return function(){return clearInterval(e)}},[n,t]),o.a.createElement("p",{id:"timer"}," ",y," ",u," ")};var y=function(e){var t=e.toggle,n=Object(a.useState)(0),l=Object(i.a)(n,2),r=l[0],y=l[1],b=Object(a.useState)([]),p=Object(i.a)(b,2),h=p[0],f=p[1],E=Object(a.useState)([{x:0,time:0}]),v=Object(i.a)(E,2),I=v[0],M=v[1],w=10,S=100,j=["+","-","x","/"],B=Object(a.useState)(""),O=Object(i.a)(B,2),x=O[0],P=O[1],D=Object(a.useState)([0,0,0]),k=Object(i.a)(D,2),R=k[0],C=k[1];function T(e){if(1===e){var t=[R[0]+R[1],R[0]-R[1],R[0]*R[1],R[0]/R[1]][R[2]];return R[0]+" "+j[R[2]]+" "+R[1]+" = "+t}return R[0]+" "+j[R[2]]+" "+R[1]}function q(){var e=Math.floor(Math.random()*(S-w))+w,t=Math.floor(Math.random()*(S-w))+w;console.log("random add"),console.log(e,t),C([e,t,0])}function H(){var e=Math.floor(Math.random()*(2*S-w))+w,t=Math.floor(Math.random()*(2*S-w))+w;console.log("random minus"),C([Math.max(e,t),Math.min(e,t),1])}function J(){var e=Math.ceil(Math.random()*Math.sqrt(2*S))+1,t=Math.ceil(Math.random()*Math.sqrt(2*S))+1;console.log("random mult"),C([e,t,2])}function z(){var e=Math.ceil(Math.random()*Math.sqrt(2*S))+1,t=Math.ceil(Math.random()*Math.sqrt(2*S))+1,n=e*t;console.log("random div"),C([n,t,3])}function A(){var e=[q,q,H,H,J,z];e[Math.floor(Math.random()*e.length)]()}return window.addEventListener("load",function(){A()}),o.a.createElement("div",null,o.a.createElement("p",{id:"score"}," Score: ",r),o.a.createElement(g,{toggle:t,score:r,problems:h,setProblems:f,data:I,setData:M}),o.a.createElement("div",{id:"game"},R[0]," ",j[R[2]]," ",R[1]," = ",o.a.createElement("input",{value:x,onChange:function(e){var t=e.target.value;console.log(parseInt("a",10)),isNaN(t)?""===t&&P(t):(P(t),function(e){var t=0===R[2]&&e===R[0]+R[1],n=1===R[2]&&e===R[0]-R[1],a=2===R[2]&&e===R[0]*R[1],o=3===R[2]&&e===R[0]/R[1];if(t||n||a||o){var l={problem:T(1),time:0,id:h.length};f(h.concat(l)),A(),P(""),y(r+1)}}(parseInt(t,10)))}})),o.a.createElement("dl",{id:"problem-list"},h.map(function(e){return o.a.createElement("li",{key:e.id,id:e.id},e.problem," ",e.time)}).reverse()),o.a.createElement("div",{id:"graph"},o.a.createElement(c.a,{width:600,height:400,margin:{top:5,right:10,left:50,bottom:20}},o.a.createElement(m.a,{type:"number",dataKey:"x"},o.a.createElement(d.a,{value:"Problems",position:"bottom"})),o.a.createElement(s.a,{type:"number",dataKey:"time"},o.a.createElement(d.a,{value:"Time",position:"insideRight",angle:-90,offset:50})),o.a.createElement(u.a,{data:I,fill:"black",lineJointType:"monotoneX",line:!0}))))};var b=function(){var e=Object(a.useState)("Show Problems"),t=Object(i.a)(e,2),n=t[0],l=t[1],r=Object(a.useState)(0),c=Object(i.a)(r,2),m=c[0],d=c[1];return window.onload=function(){"toggle"in localStorage&&(console.log(localStorage.getItem("toggle")),d(parseInt(localStorage.getItem("toggle"))+1)),"displayProblems"in localStorage?"hidden"===localStorage.getItem("displayProblems")?(document.getElementById("problem-list").style.display="none",document.getElementById("graph").style.display="none",l("Show Problems")):(document.getElementById("problem-list").style.display="block",document.getElementById("graph").style.display="flex",l("Hide Problems")):(document.getElementById("problem-list").style.display="none",document.getElementById("graph").style.display="none")},o.a.createElement("div",null,o.a.createElement("div",{id:"buttons"},o.a.createElement("button",{onClick:function(){return window.location.reload()}}," Restart "),o.a.createElement("button",{onClick:function(){d(m+1),localStorage.setItem("toggle",m),window.location.reload()}}," Toggle Mode "),o.a.createElement("button",{onClick:function(){"Hide Problems"===n?(l("Show Problems"),document.getElementById("problem-list").style.display="none",document.getElementById("graph").style.display="none",localStorage.setItem("displayProblems","hidden")):(l("Hide Problems"),document.getElementById("problem-list").style.display="block",document.getElementById("graph").style.display="flex",localStorage.setItem("displayProblems","visible"))}},"  ",n," ")),o.a.createElement("div",{id:"main"},o.a.createElement(y,{toggle:m})))};r.a.createRoot(document.getElementById("root")).render(o.a.createElement(b,null))}},[[255,2,1]]]);
//# sourceMappingURL=main.3174444f.chunk.js.map