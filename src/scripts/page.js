// porject page
import {project} from './data.js'
const page = document.querySelector("#pages .project");
const names = project.name
for (let i = 0; i < project.count; i++) {
    const readMore = document.createElement('div');
    readMore.classList.add('readmore')
    readMore.textContent = 'read more'
    
	const p = document.createElement("a");
    p.href = `src/scripts/programs/${i+1}/${names[i]}.html`
    p.textContent = names[i]
    p.classList.add('item')
	page.appendChild(p);
    p.append(readMore)
    p.addEventListener('click', e=>{
        console.log('yes');
        e.preventDefault()
        e.stopPropagation()
        window.open(p.href,'_blank','location=no')
    })
}
const nextPage = document.createElement('div')
nextPage.classList.add('next-page')
page.appendChild(nextPage)


// gallery