/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
 //Defining Global variable
const sections = document.getElementsByTagName('section');
const navList = document.querySelector('#navbar__list');
/**
  * End Global Variables
  * Start Helper Functions
  *
  */

 /**
  *
  * @param {node} listElem => element to which anchor should be added
  * @param {num} i => position of section_items
  * @returns
  */
//set attributes to ul
for(section of sections){
    const menu ="menu";
    const list = document.createElement('li');
    const listTag=document.createElement('a');
    listTag.textContent=section.id;
    listTag.textContent=section.dataset.nav;
    list.setAttribute("class",menu);
    list.setAttribute("data", section.id);
    listTag.setAttribute("href","#"+section.id);
    listTag.setAttribute("class", section.id);
    list.appendChild(listTag);
    navList.appendChild(list);
}

//active class
activeState=()=>{
for (const section of sections) {
    const box = section.getBoundingClientRect();
    if (box.top <= 150 && box.bottom >= 150) {
      //adding Your-active-class
      section.classList.add("your-active-class");
    } else {
      //removing Your-active-class
      section.classList.remove("your-active-class");
    }
  }
}
document.addEventListener('scroll',activeState);
/**
  * End Helper Functions
  * Begin Main Functions  set_active(event,anch_temp)
  *
  */

 /**
  * this function will add li items to unordered list
  */


//Selects element in the tag and smooth to click
 document.querySelectorAll("a").forEach(a=>{
    a.addEventListener("click",(event)=>{
    event.preventDefault();
    let id=a.getAttribute("class");
    const element=document.getElementById(id);
    element.scrollIntoView({behavior:"smooth"});
   });
 });
 
