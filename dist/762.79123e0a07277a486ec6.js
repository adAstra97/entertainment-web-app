"use strict";(self.webpackChunkmy_webpack=self.webpackChunkmy_webpack||[]).push([[762],{762:function(e,n,t){t.r(n),n.default=function(){document.querySelector(".main").insertAdjacentHTML("afterbegin","\n      <div class=\"page-404-wrapper\">\n         <canvas id='canv'></canvas>\n      </div>\n   "),function(){var e=document.getElementById("canv"),n=e.getContext("2d");e.width=600,e.height=400;var t=!1,a=0,r=0,c=new Image;c.src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/131045/404.png",c.onload=function(){return a=c.width,r=c.height,n.translate(50,50),i=0,o=a+50,u=r+50,(e=function(){var d,s,v;for(n.clearRect(-30,-30,o,u),d=!0===t?.5:.18,v=0;v<=r;s=0<=r?++v:--v)i=~~(d*(Math.random()-.5)*30),n.drawImage(c,0,s,a,1,i,s,a,1);window.requestAnimationFrame(e)})();var e,u,o,i},e.addEventListener("mouseover",(function(){return t=!0}),!1),e.addEventListener("touchmove",(function(e){return e.preventDefault(),t=!0}),!1),e.addEventListener("mouseout",(function(){return t=!1}),!1),e.addEventListener("touchend",(function(){return t=!1}),!1)}()}}}]);