function load(){
  dynamicTable();
  createAuthorsList()
}

document.addEventListener("DOMContentLoaded",load());


let form = document.getElementById("gallery-form");
  form.addEventListener("submit", function(e) {
    e.preventDefault();
   let image=document.getElementById("image").value;
   let author=document.getElementById("author").value;
   let alt=document.getElementById("alt").value;
   let tags=document.getElementById("tags").value;
   let description=document.getElementById("description").value;
   let data= {
      image: image,
        author: author,
        alt: alt,
        tags: tags,
        description: description
   };
   let options = {
    method: 'POST',
    body:JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  };
   fetch("https://wt.ops.labs.vu.nl/api23/9ebcac1b",options)
   .then(response => {
       if(response.ok) {
           return response.json()
       }
       throw new Error("Failed form submit")
   })
  .then(data=>{ console.log(data);
  let formImage=image;
  let formAuthor=author;
  let formAlt=alt;
  let formTags=tags;
  let formDescription=description;
  let gallery = document.getElementById("gallery-table");
  let formRow= gallery.insertRow();
  let imgCell= formRow.insertCell();
  let authorCell= formRow.insertCell();
  let altCell= formRow.insertCell();
  let tagsCell= formRow.insertCell();
  let descCell= formRow.insertCell();
  let newImg = document.createElement("img");
  newImg.src = formImage;
  imgCell.appendChild(newImg);
  authorCell.innerHTML=formAuthor;
  altCell.innerHTML=formAlt;
  tagsCell.innerHTML=formTags;
  descCell.innerHTML=formDescription;
  })
  .catch(error => {
    console.log(error);
  });
});

let updateBtn=document.getElementById("update-table");
updateBtn.addEventListener('submit', async function(e){
  e.preventDefault();
  let imageId=document.getElementById("idUp").value;
  let image=document.getElementById("imageUp").value;
   let author=document.getElementById("authorUp").value;
   let alt=document.getElementById("altUp").value;
   let tags=document.getElementById("tagsUp").value;
   let description=document.getElementById("descriptionUp").value;
   let data= {
        image: image,
        author: author,
        alt: alt,
        tags: tags,
        description: description
   };
   let options={
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(data)
   };
await fetch('https://wt.ops.labs.vu.nl/api23/9ebcac1b/item/'+imageId, options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
});

const resetBtn = document.getElementById("reset-table");
resetBtn.addEventListener("click", function(event) {
  event.preventDefault();
  form.reset();
  gallery = document.getElementById("gallery-table");
    while(gallery.rows.length>14){
    gallery.deleteRow(gallery.rows.length-1);
    }
  let api="https://wt.ops.labs.vu.nl/api23/9ebcac1b/reset";
  fetch(api, { method: 'GET' })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.error(error));
});

let entireTable="";
function createTable(picture,k){
    let html="";
    html+='<div id="'+k+'">';
    html+='<tr>';
    html+='<td data-label="image"><img src="'+ picture.image+ '"></img></td>';
    html+='<td data-label="author" class="authors">'+picture.author+"</td>";
    html+='<td data-label="alt">'+picture.alt+"</td>";
    html+='<td data-label="tags">'+picture.tags+"</td>";
    html+='<td data-label="description">'+picture.description+"</td>";
    html+='</tr>';
    html+='</div>';
    return html;
}


function dynamicList(authors){
    html="";
    for(let i=0;i<authors.length;i++){
      html+='<li><button id="'+i+'">'+authors[i].author+'</button></li>';
    }
    return html;
}

async function createAuthorsList(){
  let res= await fetch("https://wt.ops.labs.vu.nl/api23/9ebcac1b");
  if(res.ok){
    let authors= await res.json();
    for(let i=0;i<authors.length;i++){
      let picture=authors[i];
        for(let j=authors.indexOf(picture)+1;j<authors.length;j++){
              if(authors[j].author===picture.author){
                  authors.splice(i,1);
                  i--;
              }
        }
      }
      entireTable="";
      entireTable+=dynamicList(authors);
      document.getElementById("authors-list").innerHTML=entireTable;
 }
}

async function dynamicTable() {
  let res= await fetch("https://wt.ops.labs.vu.nl/api23/9ebcac1b");
  if(res.ok){
    let authors= await res.json();
    let k=10;
      for(let picture of authors){
      entireTable+=createTable(picture,k);
      k++;
      document.getElementById("t-body").innerHTML=entireTable;
      }
    }
  }

var modal=document.getElementById("modal-use");
var modalBtn=document.getElementById("modal-button");
var span=document.getElementsByClassName("hide")[0];

modalBtn.addEventListener("click", async function(){
  modal.style.display="block";
});
span.addEventListener("click", async function(){
  modal.style.display="none";
});

document.getElementById("0").addEventListener("click", async function(){
  let elements=document.getElementsByClassName("authors");
        for(let i=0;i<elements.length;i++)
            if(elements[i].value!=document.getElementById("0").value){
              var checkedItem= document.getElementById("19");
              checkedItem.style.display="none";
            }               
});

/*For the 6th part of the assignment we tried to add a click event to every author in the dynamic list catogorised by its ID.
The function in the event gets the authors that are in the dynamically created table by their class name *author* and compares each one with the author in the list in order to find out the ones that 
are not the same so we could hide them, but this didn't work properly.*/