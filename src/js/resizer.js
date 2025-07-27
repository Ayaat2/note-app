import { notesLists, resizer } from "./elements";

// resizer
export function resizerBtn(){
    let isResizer=false;
resizer.addEventListener('mousedown',()=>{
    isResizer=true;
})
document.addEventListener('mousemove',(e)=>{
    if(!isResizer) return;
    
    const newWidth=e.clientX;
    notesLists.style.width=`${newWidth}px`
})
document.addEventListener('mouseup',()=>{
    isResizer=false;
})
// Enable resize with keyboard arrows (accessibility)
resizer.addEventListener('keydown', (e) => {
    const sidebar = document.querySelector('.notes-lists');
    let currentWidth = sidebar.offsetWidth;

    if (e.key === 'ArrowRight') {
        sidebar.style.width = (currentWidth + 10) + 'px';
    } else if (e.key === 'ArrowLeft') {
        sidebar.style.width = (currentWidth - 10) + 'px';
    }
});
}