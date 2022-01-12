     // for binding the elements
     let name = document.getElementById("name");
     let tform = document.querySelector(".header");
     let add = document.querySelector(".add");
     let txt = document.getElementById("theText");
     let fromItems = document.getElementById("NoteUL");
     // for validation 

     var items = [];



     // to push item in the items array

     add.addEventListener("click", function(ev) {
         addItem(txt.value);
     });
     // add function 
     function addItem(itm) {
         // if item is not empty 
         if (itm !== '') {
             // a itm obj 
             let item = {
                 id: Date.now(),
                 date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
                 name: itm,
                 completed: false
             };
             // add item in array 
             items.push(item);
             addInStorage(items);
             // storage it in local storage
             // to return the input text empty
             txt.value = '';
         } else alert("Type something here ↓");
     }

     // function to rendering the items
     function renderItems(items) {
         // to clear andything inside the ul Tag 
         fromItems.innerHTML = '';
         // for each items inside the items obj 
         items.forEach(function(todo) {
             // checked if the item is completed
             let checke = todo.completed ? 'checked' : null;

             // for make li and fill it 
             let li = document.createElement('li');
             // to give li id 
             li.dataset.key = todo.id;
             //if item checked add class checked
             if (todo.completed === true) {
                 li.classList.add('checked');
             }

             // var span = document.createElement("SPAN");
             //var tx = document.createTextNode("\u00D7");
             //span.className = "close";
             li.title = todo.date;
             li.innerHTML = `
   <input type="checkbox" class="checkbox" ${checke}>
   ${todo.name}
   <span class="close">&#215;</span>
 `;
             // finally add the <li> to the <ul>
             fromItems.appendChild(li);

         });
     }
     // function to add items in localStorage 
     function addInStorage(items) {
         localStorage.setItem('items', JSON.stringify(items));
         // render them to screen
         renderItems(items);
     }
     // function to get item from localStorage 
     function getlocal() {
         let refs = localStorage.getItem('items');
         // if refs exists 
         if (refs) {
             //to converts it and store it 
             items = JSON.parse(refs);
             renderItems(items);
         }
     }
     // make toggle function to toggle id completed or not 
     function toggle(id) {
         items.forEach(function(item) {
             if (item.id == id) {
                 //toggle the value 
                 item.completed = !item.completed;
             }
         });
         addInStorage(items);
     }

     // deletes a item form items array and local
     function deleteItem(id) {
         // make filter to out items have  a id
         items = items.filter(function(item) {
             return item.id != id;
         });
         // refresh the localStorage
         addInStorage(items);
     }
     // get item from localStorage
     getlocal();

     // to checked the list item
     fromItems.addEventListener("click", function(ev) {
         if (ev.target.tagName === 'LI') {
             toggle(ev.target.dataset.key);
         } else if (ev.target.type == 'checkbox') {
             toggle(ev.target.parentNode.dataset.key);
         }
         // check if that is close button 
         if (ev.target.classList.contains("close")) {
             deleteItem(ev.target.parentNode.dataset.key);

         }

     });
     txt.addEventListener("keydown", function(event) {

         let key = event.key;
         if (key == "Enter") {
             addItem(txt.value);
             event.preventDefault();
         };
     });
     // var list = document.querySelector('ul');
     // list.addEventListener('click', function(ev) {
     //    if (ev.target.tagName === 'LI') {
     //        ev.target.classList.toggle('checked');
     //    }
     //   }, true);