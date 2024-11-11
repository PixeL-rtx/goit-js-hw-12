import{a as f,i as u,S as b}from"./assets/vendor-D73Uttp0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const L="46775903-5820c4e6d789cb0cb95772c39",w="https://pixabay.com/api/?";async function m(r,t=1){const s=new URLSearchParams({key:L,image_type:"photo",orientation:"horizontal",safesearch:"true",pare_page:15,page:t,q:r}),i=await f(`${w}${s}`);try{return i.data}catch{iziToast.error({title:"Error",message:"Ups.. Something wrong",position:"topRight"})}}function y(r){return r.map(({webformatURL:t,largeImageURL:s,tags:i,likes:e,views:o,comments:l,downloads:p})=>`<li class="gallery-item">
          <a class="gallery-link" href="${s}">
            <img
              class="gallery-image"
              src="${t}"
              alt="${i}"
              width="360"
            />
          </a>
          <ul class="gallery-item-info">
                <li class="info-block">
                  <h5>Likes</h5>
                  <p>${e}</p>
                </li>
                <li class="info-block">
                  <h5>Views</h5>
                  <p>${o}</p>
                </li>
                <li class="info-block">
                  <h5>Comments</h5>
                  <p>${l}</p>
                </li>
                <li class="info-block">
                  <h5>Downloads</h5>
                  <p>${p}</p>
                </li>
              </ul>
            </li>`).join("")}const S=document.querySelector(".form"),n=document.querySelector(".gallery"),a=document.querySelector(".loader"),h=document.querySelector(".load_Btn");let d="",c=1;a.style.display="none";S.addEventListener("submit",M);async function M(r){if(r.preventDefault(),a.style.display="block",n.innerHTML="",c=1,d=r.target.elements.input.value.trim(),h.classList.add("is-hidden"),d.length===0)return a.style.display="none",u.error({title:"Error",backgroundColor:"tomato",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",messageSize:"20",position:"bottomRight",close:!0,displayMode:2});const t=await m(d,c);try{if(t.hits.length===0)return n.innerHTML="",u.error({title:"Error",backgroundColor:"tomato",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",messageSize:"20",position:"bottomRight",close:!0,displayMode:2});n.insertAdjacentHTML("beforeend",y(t.hits)),g.refresh(),t.totalHits>15&&h.classList.remove("is-hidden")}catch(s){console.log(s)}finally{a.style.display="none"}}h.addEventListener("click",P);async function P(){a.style.display="block",c+=1;const r=await m(d,c);try{Math.ceil(r.totalHits/15)===c&&(h.classList.add("is-hidden"),u.info({title:"Error",backgroundColor:"tomato",message:"We're sorry, but you've reached the end of search results.",messageColor:"white",messageSize:"20",position:"bottomRight",close:!0,displayMode:2})),n.insertAdjacentHTML("beforeend",y(r.hits));const s=n.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"}),g.refresh()}catch(t){console.log(t)}finally{a.style.display="none"}}const g=new b(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
