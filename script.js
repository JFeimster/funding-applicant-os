const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("in-view")})},{threshold:.14});
document.querySelectorAll(".reveal").forEach(item=>revealObserver.observe(item));

const statusRows=[...document.querySelectorAll("[data-status-row]")];
if(statusRows.length){let current=0;const cycle=()=>{statusRows.forEach((row,i)=>row.classList.toggle("is-active",i===current));current=(current+1)%statusRows.length};cycle();setInterval(cycle,1500)}

const pipelineStages=[...document.querySelectorAll(".pipeline-stage")];
const rail=document.querySelector(".pipeline-rail");
if(pipelineStages.length&&rail){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;pipelineStages.forEach((stage,i)=>{setTimeout(()=>{stage.animate([{transform:"translateY(0)"},{transform:"translateY(-8px)"},{transform:"translateY(0)"}],{duration:420,easing:"ease-out"})},i*90)});observer.disconnect()})},{threshold:.25});observer.observe(rail)}
