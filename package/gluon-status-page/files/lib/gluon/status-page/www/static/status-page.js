"use strict";!function(){var i=JSON.parse(document.body.getAttribute("data-translations"));function r(t,e){return t.toFixed(e).replace(/\./,i["."])}function o(t,e){e--;for(var n=t;10<=n&&0<e;n/=10)e--;return r(t,e)}function a(t){var e=["","K","M","G","T"],n=1024,r=t,i=0;if(void 0===r)return"- ";for(;n<r&&i<e.length-1;)r/=n,i++;return(r=o(r,3))+" "+e[i]}String.prototype.sprintf=function(){var t=0,e=arguments;return this.replace(/%s/g,function(){return e[t++]})};var u={id:function(t){return t},decimal:function(t){return r(t,2)},percent:function(t){return i["%s used"].sprintf(o(100*t,3)+"%")},memory:function(t){t=1-t.available/t.total;return u.percent(t)},time:function(t){var t=Math.round(t/60),e=Math.floor(t/1440),n=Math.floor(t%1440/60),t=Math.floor(t%60),r="";return 1===e?r+=i["1 day"]+", ":1<e&&(r+=i["%s days"].sprintf(e)+", "),r+=n+":",t<10&&(r+="0"),r+=t},packetsDiff:function(t,e,n){if(0<n)return t=(t-e)/n,i["%s packets/s"].sprintf(r(t,0))},bytesDiff:function(t,e,n){if(0<n)return a(8*((t-e)/n))+"bps"},bytes:function(t){return a(t)+"B"},neighbour:function(t){if(!t)return"";for(var e in c){var n,r,i=c[e].lookup_neigh(t);if(i)return n=document.createElement("span"),r=(n.appendChild(document.createTextNode("via ")),document.createElement("a")),r.href="http://["+i.get_addr()+"]/",r.textContent=i.get_hostname(),n.appendChild(r),n.appendChild(document.createTextNode(" ("+e+")")),n}return"via "+t+" (unknown iface)"}};function s(e,t){return t.split("/").forEach(function(t){e=e&&e[t]}),e}function d(t,e){var n=new EventSource(t),r={};n.onmessage=function(t){t=JSON.parse(t.data);e(t,r),r=t},n.onerror=function(){n.close(),window.setTimeout(function(){d(t,e)},3e3)}}var E,k=document.body.getAttribute("data-node-address");try{E=JSON.parse(document.body.getAttribute("data-node-location"))}catch(t){}function t(t){var e=document.getElementById("mesh-vpn");if(t){e.style.display="";for(var r=document.getElementById("mesh-vpn-peers");r.lastChild;)r.removeChild(r.lastChild);t=function e(n,r){return Object.keys(r.peers||{}).forEach(function(t){n.push([t,r.peers[t]])}),Object.keys(r.groups||{}).forEach(function(t){e(n,r.groups[t])}),n}([],t);t.sort(),t.forEach(function(t){var e=document.createElement("tr"),n=document.createElement("th"),n=(n.textContent=t[0],e.appendChild(n),document.createElement("td"));t[1]?n.textContent=i.connected+" ("+u.time(t[1].established)+")":n.textContent=i["not connected"],e.appendChild(n),r.appendChild(e)})}else e.style.display="none"}var e=document.querySelectorAll("[data-statistics]");d("/cgi-bin/dyn/statistics",function(o,a){var c=o.uptime-a.uptime;e.forEach(function(t){var e=t.getAttribute("data-statistics"),n=t.getAttribute("data-format"),r=s(a,e),e=s(o,e);try{var i=u[n](e,r,c);"object"==typeof i?(t.lastChild&&t.removeChild(t.lastChild),t.appendChild(i)):t.textContent=i}catch(t){console.error(t)}});try{t(o.mesh_vpn)}catch(t){console.error(t)}});var c={};function A(n){var r=document.createElement("canvas"),i=r.getContext("2d"),o=null;return{canvas:r,highlight:!1,resize:function(t,e){var n;try{n=i.getImageData(0,0,t,e)}catch(t){}r.width=t,r.height=e,n&&i.putImageData(n,0,0)},draw:function(t,e){var e=e(o);i.clearRect(t,0,5,r.height),e&&(t=t,e=e,i.beginPath(),i.fillStyle=n,i.arc(t,e,1.2,0,2*Math.PI,!1),i.closePath(),i.fill())},set:function(t){o=t}}}function h(){var o=-100,a=0,c=0,u=[],s=document.createElement("canvas"),l=(s.className="signalgraph",s.height=200,s.getContext("2d"));function d(){s.width=s.clientWidth,u.forEach(function(t){t.resize(s.width,s.height)})}function n(){if(0!==s.clientWidth){s.width!==s.clientWidth&&d(),l.clearRect(0,0,s.width,s.height);var e=!1,t=(u.forEach(function(t){t.highlight&&(e=!0)}),l.save(),u.forEach(function(t){e&&(l.globalAlpha=.2),t.highlight&&(l.globalAlpha=1),t.draw(c,function(t){return e=s.height,(1-(t-o)/(a-o))*e;var e}),l.drawImage(t.canvas,0,0)}),l.restore(),l.save(),l.beginPath(),l.strokeStyle="rgba(255, 180, 0, 0.15)",l.lineWidth=5,l.moveTo(c+2.5,0),l.lineTo(c+2.5,s.height),l.stroke(),Math.floor(s.height/40));l.save(),l.lineWidth=.5,l.strokeStyle="rgba(0, 0, 0, 0.25)",l.fillStyle="rgba(0, 0, 0, 0.5)",l.textAlign="end",l.textBaseline="bottom",l.beginPath();for(var n=0;n<t;n++){var r=s.height-40*n,i=(l.moveTo(0,r-.5),l.lineTo(s.width,r-.5),Math.round((i=s.height,(o*r+a*(i-r))/i))+" dBm");l.save(),l.strokeStyle="rgba(255, 255, 255, 0.9)",l.lineWidth=4,l.miterLimit=2,l.strokeText(i,s.width-5,r-2.5),l.fillText(i,s.width-5,r-2.5),l.restore()}l.stroke(),l.strokeStyle="rgba(0, 0, 0, 0.83)",l.lineWidth=1.5,l.strokeRect(.5,.5,s.width-1,s.height-1),l.restore()}}d(),window.addEventListener("resize",n);var r=0;return window.requestAnimationFrame(function t(e){40<e-r&&(n(),c=(c+1)%s.width,r=e),window.requestAnimationFrame(t)}),{el:s,addSignal:function(t){u.push(t),t.resize(s.width,s.height)},removeSignal:function(t){u.splice(u.indexOf(t),1)}}}function f(t,a,e,n){var r,i=t.tbody.querySelector("tr"),o=t.tbody.insertRow(),c=o.insertCell(),u=(c.setAttribute("data-label",i.children[0].textContent),t.wireless&&((r=document.createElement("span")).textContent="⬤ ",r.style.color=e,c.appendChild(r)),document.createElement("span")),s=(u.textContent=a,c.appendChild(u),{});for(var l,d,h,f,g,p,v,m,b,C=0;C<i.children.length;C++)l=i.children[C],f=h=d=void 0,(f=l.getAttribute("data-key"))&&(d=l.getAttribute("data-suffix")||"",(h=o.insertCell()).textContent="-",h.setAttribute("data-label",l.textContent),s[f]={td:h,suffix:d});function y(){b&&window.clearTimeout(b),b=window.setTimeout(function(){m&&t.signalgraph.removeSignal(m),o.parentNode.removeChild(o),n()},6e4)}function w(t){var e,t=function(t){"::"==(t="::"==t.slice(0,2)?"0"+t:t).slice(-2)&&(t+="0");for(var e=t.split(":"),n=e.length,r=[],i=0;i<e.length;i++){var o=e[i];if(""===o)for(;n++<=8;)r.push(0);else{if(!/^[a-f0-9]{1,4}$/i.test(o))return;r.push(parseInt(o,16))}}return r}(t);if(t)return e="",t.forEach(function(t){e+=("0000000000000000"+t.toString(2)).slice(-16)}),e}function x(t){var r=w(k);if(t&&t[0])return(t=t.map(function(t){var e=w(t);if(!e)return[-1];var n=0;return[n=r?function(t,e){for(var n=0;n<t.length&&n<e.length&&t[n]===e[n];n++);return n}(r,e):n,e,t]})).sort(function(t,e){return t[0]<e[0]?1:t[0]>e[0]||t[1]<e[1]?-1:t[1]>e[1]?1:0}),t=t[0][2],t&&!/^fe80:/i.test(t)?t:void 0}return t.wireless&&((g=o.insertCell()).textContent="-",g.setAttribute("data-label",i.children[Object.keys(s).length+1].textContent),(p=o.insertCell()).textContent="-",p.setAttribute("data-label",i.children[Object.keys(s).length+2].textContent),(v=o.insertCell()).textContent="-",v.setAttribute("data-label",i.children[Object.keys(s).length+3].textContent),m=A(e),t.signalgraph.addSignal(m)),o.onmouseenter=function(){o.classList.add("highlight"),m&&(m.highlight=!0)},o.onmouseleave=function(){o.classList.remove("highlight"),m&&(m.highlight=!1)},y(),{get_hostname:function(){return u.textContent},get_addr:function(){return a},update_nodeinfo:function(t){var e,n,r,i,o;(a=x(t.network.addresses))&&("span"===u.nodeName.toLowerCase()&&(e=u,u=document.createElement("a"),e.parentNode.replaceChild(u,e)),u.href="http://["+a+"]/"),u.textContent=t.hostname,E&&t.location&&(e=E.latitude,n=E.longitude,r=t.location.latitude,t=t.location.longitude,i=Math.PI/180,o=(r*=i)-(e*=i),t=(t*=i)-(n*=i),i=Math.sin(o/2)*Math.sin(o/2)+Math.sin(t/2)*Math.sin(t/2)*Math.cos(e)*Math.cos(r),n=6372.8*(2*Math.asin(Math.sqrt(i))),p.textContent=Math.round(1e3*n)+" m"),y()},update_mesh:function(n){Object.keys(s).forEach(function(t){var e=s[t];e.td.textContent=n[t]+e.suffix}),y()},update_wifi:function(t){g.textContent=t.signal,v.textContent=Math.round(t.inactive/1e3)+" s",o.classList.toggle("inactive",200<t.inactive),m.set(200<t.inactive?null:t.signal),y()}}}function l(t,e,n){var r,o={},i=(n&&(r=h(),t.appendChild(r.el)),{tbody:t.querySelector("tbody"),signalgraph:r,ifname:e,wireless:n}),a=!1,c={},u=[];function s(){var t;a||(a=!0,(t=new EventSource("/cgi-bin/dyn/neighbours-nodeinfo?"+encodeURIComponent(e))).addEventListener("neighbour",function(t){try{var n=JSON.parse(t.data);r=[],i=n.network.mesh,Object.keys(i).forEach(function(t){var e=i[t].interfaces;Object.keys(e).forEach(function(t){e[t].forEach(function(t){r.push(t)})})}),r.forEach(function(t){var e=o[t];if(e){delete c[t];try{e.update_nodeinfo(n)}catch(t){console.error(t)}}})}catch(t){console.error(t)}var r,i},!1),t.onerror=function(){t.close(),a=!1,Object.keys(c).forEach(function(t){0<c[t]&&(c[t]--,s())})})}function l(t){var e=o[t];return e||(c[t]=3,e=o[t]=f(i,t,(u=u[0]?u:["#396AB1","#DA7C30","#3E9651","#CC2529","#535154","#6B4C9A","#922428","#948B3D"]).shift(),function(){delete c[t],delete o[t]}),s()),e}return n&&d("/cgi-bin/dyn/stations?"+encodeURIComponent(e),function(n){Object.keys(n).forEach(function(t){var e=n[t];l(t).update_wifi(e)})}),{get_neigh:l,lookup_neigh:function(t){return o[t]}}}document.querySelectorAll("[data-interface]").forEach(function(t){var e=t.getAttribute("data-interface"),n=(t.getAttribute("data-interface-address"),!!t.getAttribute("data-interface-wireless"));c[e]=l(t,e,n)});var n=document.body.getAttribute("data-mesh-provider");n&&d(n,function(r){Object.keys(r).forEach(function(t){var e=r[t],n=c[e.ifname];n&&n.get_neigh(t).update_mesh(e)})})}();