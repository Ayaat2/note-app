import { addNoteButton, addNoteFloatingBtn, addNoteSection, addPinnedButton, closeBtn, menuBtn, noteContentWrapper, NOTES, notesLists, searchBar, searchBtn, searchInput, searchInputMobile, showAddNoteBtn, sidebar } from "./js/elements";
import { addNoteBtn, filterNotes, handleAddNote, showNotes, updateFloatingBtnVisibility } from "./js/notes";
import { resizerBtn } from "./js/resizer";
import { loadNotesFromLocal } from "./js/storage";

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show"); // Open and close when every click
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show"); //It closes when the closing button is compressed 
});


showAddNoteBtn.addEventListener('click',addNoteBtn)
addNoteFloatingBtn.addEventListener('click',()=> {
    addNoteSection.classList.remove('hidden');
    noteContentWrapper.classList.add('hidden');
    notesLists.classList.add('hidden');
    updateFloatingBtnVisibility();
});

NOTES.addEventListener('click',showNotes)

window.addEventListener('DOMContentLoaded',loadNotesFromLocal)
// delete button
document.addEventListener('click',function(event){
    if(event.target.classList.contains('note-delete')){
        const noteId=event.target.getAttribute('data-id');
        const noteToDelete=document.querySelector(`.note-card[data-id='${noteId}']`);
        if(noteToDelete){
            const isPinned=noteToDelete.classList.contains('pinned')
            const key=isPinned? 'pinnedNotes' :'regularNotes';
            let notes = JSON.parse(localStorage.getItem(key)) || [];
            notes = notes.filter(note => note.id != noteId);
            localStorage.setItem(key, JSON.stringify(notes));
            noteToDelete.remove();
        }
    }
})
addNoteButton.addEventListener('click',(event)=>{
    event.preventDefault();
    handleAddNote(false);
});
addPinnedButton.addEventListener('click',(event)=>{
    event.preventDefault();
    handleAddNote(true);
})


searchInput.addEventListener('input',(event)=>{
    filterNotes(event.target.value)
})
searchInputMobile.addEventListener('input',(event)=>{
    filterNotes(event.target.value);
})
searchBtn.addEventListener('click',()=>{
    searchBar.classList.toggle('hidden');
    const isVisible=!searchBar.classList.contains('hidden')
    searchBtn.setAttribute('aria-expaned',isVisible);
    if(isVisible) searchInputMobile.focus();
})

resizerBtn()


