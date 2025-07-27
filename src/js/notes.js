import { addNoteFloatingBtn, addNoteSection, authorInput, noteBody, noteContentWrapper, notesContainer, notesLists, pinnedContainer, titleInput, yourNoteInput } from "./elements";
import { saveNoteToLocal } from './storage';

// button plus
export const updateFloatingBtnVisibility =()=>{
    const isAddNoteSection=!addNoteSection.classList.contains('hidden');
    addNoteFloatingBtn.style.display=isAddNoteSection? 'none' : 'block';
}
// button add note
export const addNoteBtn=(event)=>{
    event.preventDefault();

    notesLists.classList.add('hidden');
    notesLists.classList.add('hide-on-mobile');
    noteBody.classList.add('hidden');
    noteBody.classList.remove('show-on-mobile');

    addNoteSection.classList.remove('hidden');
    updateFloatingBtnVisibility();
}
export const showNotes=(event)=>{
    event.preventDefault();
    
    const isNoteListsVisible=!notesLists.classList.contains('hidden')

    addNoteSection.classList.add('hidden');
    noteBody.classList.add('hidden');
    noteBody.classList.remove('show-on-mobile');
    addNoteSection.classList.remove('hide-on-mobile')

    if(isNoteListsVisible){
        notesLists.classList.add('hidden');
        notesLists.classList.add('hide-on-mobile')
    }
    else{
        notesLists.classList.remove('hidden');
        notesLists.classList.remove('hide-on-mobile');
        noteContentWrapper.classList.remove('hidden');
    }

    updateFloatingBtnVisibility()
}
export const getFormattedDate=()=>{
    const date=new Date();
    const options={
        month:'short',
        day:'numeric',
        year:'numeric'}
    return date.toLocaleDateString('en-US',options);
}
export const createNoteCard = (title, content, author, isPinned = false, id, date) => {
  const noteCard = document.createElement('div');
  noteCard.classList.add('note-card');
  noteCard.setAttribute('tabindex', '0'); // Make it focusable with keyboard
  noteCard.setAttribute('role', 'button'); // For screen readers
  noteCard.setAttribute('aria-label', `View note titled ${title}`); // Describe it for screen reader

  if (isPinned) noteCard.classList.add('pinned');
  noteCard.dataset.id = id;
  const snippet = content.length > 100 ? content.substring(0, 100) + "..." : content;

  noteCard.innerHTML = `
    <h3 class="note-title">${title}</h3>
    <p class="note-snippet">${snippet}</p>
    <div class="note-footer">
        <span class="note-date">${date}</span>
        <button class="note-delete" data-id="${id}"> Delete</button>
    </div>
  `;

  // Handle clicking on the card (mouse or simulated by keyboard)
  const openNote = (event) => {
    if (event.target.classList.contains('note-delete')) return;

    noteBody.innerHTML = generateNoteBody(title, content, author, date);
    noteBody?.classList.remove('hidden');

    if (window.innerWidth <= 768) {
      notesLists?.classList.add('hide-on-mobile');
      addNoteSection?.classList.add('hide-on-mobile');
      noteBody?.classList.add('show-on-mobile');
    } else {
      noteBody?.classList.remove('show-on-mobile');
      notesLists?.classList.remove('hide-on-mobile');
      addNoteSection?.classList.remove('hide-on-mobile');
    }
  };

  noteCard.addEventListener('click', openNote);

  // 🔥 Add this outside click handler
  noteCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openNote(e);
    }
  });

  return noteCard;
};

export function generateNoteBody(title,content,author,date){
    const words=content.trim().split(" ")
    if(words.length < 2){
        return content;
    } 
    const lastTwo=words.splice(-2).join(" ")
    const rest=words.join(" ");
    const noteBodyHTML=`
        <h2 class="note-title">${title}</h2>
        <div class="note-header">
            <span class="date-write">${date} /</span>
            <span class="name-write">${author}</span>
        </div>
        <div class="content">
            <p class="note-text margin-bottom">
            ${rest}
            <span>${lastTwo}</span>
        </p>
        </div>
    `
    return noteBodyHTML;
    
}

export const handleAddNote=(isPinned=false)=>{
    const title=titleInput.value.trim();
    const author=authorInput.value.trim();
    const content=yourNoteInput.value.trim();

    if(!title || !author || !content){
        alert('Please fill in all the fields!');
        return;
    }
    const note={
        id:Date.now(),
        title,
        author,
        content,
        isPinned,
        date:getFormattedDate(),
    };
    saveNoteToLocal(note);
    displayNote(note);
    resetForm();

     // Hide add section, show notes again
    addNoteSection.classList.add('hidden');
    noteContentWrapper.classList.remove('hidden');
    updateFloatingBtnVisibility();
}
export function resetForm(){
    titleInput.value='';
    authorInput.value='';
    yourNoteInput.value='';
}

export function displayNote(note){
    const noteDate=note.date || getFormattedDate()
    const card=createNoteCard(note.title, note.content,note.author, note.isPinned,note.id,noteDate);
    if(note.isPinned){
        pinnedContainer.appendChild(card);
    }
    else{
        notesContainer.appendChild(card);
    }
}

// text search 
export function filterNotes(searchText){
    const text=searchText.toLowerCase();
    const allNotes=document.querySelectorAll('.note-card');

    allNotes.forEach(note =>{
        const title=note.querySelector('.note-title')?.textContent.toLowerCase() || '';
        const snippet=note.querySelector('.note-snippet')?.textContent.toLowerCase() || '';
        if(title.includes(text) || snippet.includes(text)){
            note.style.display='';
        }
        else{
            note.style.display='none'
        }
    })
}