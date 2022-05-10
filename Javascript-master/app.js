// retrieve dino objects from json
const dinosData = [
	{
                "species": "Triceratops",
                "weight": 13000,
                "height": 114,
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "First discovered in 1889 by Othniel Charles Marsh"
            },
            {
                "species": "Tyrannosaurus Rex",
                "weight": 11905,
                "height": 144,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "The largest known skull measures in at 5 feet long."
            },
            {
                "species": "Anklyosaurus",
                "weight": 10500,
                "height": 55,
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Anklyosaurus survived for approximately 135 million years."
            },
            {
                "species": "Brachiosaurus",
                "weight": 70000,
                "height": 372,
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Jurasic",
                "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
            },
            {
                "species": "Stegosaurus",
                "weight": 11600,
                "height": 79,
                "diet": "herbavor",
                "where": "North America, Europe, Asia",
                "when": "Late Jurasic to Early Cretaceous",
                "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
            },
            {
                "species": "Elasmosaurus",
                "weight": 16000,
                "height": 59,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
            },
            {
                "species": "Pteranodon",
                "weight": 44,
                "height": 20,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
            },
            {
                "species": "Pigeon",
                "weight": 0.5,
                "height": 9,
                "diet": "herbavor",
                "where": "World Wide",
                "when": "Holocene",
                "fact": "All birds are living dinosaurs."
            }
	];
    // Create Dino Constructor
     function Dinosaur(species,weight,height,diet,where,when,fact){
            this.species = species;
            this.weight = weight;
            this.height = height;
            this.diet = diet;
            this.where = where;
            this.when =when;
            this.fact = fact;
            const name=species.toLowerCase();
            this.image= `images/${name}.png`
            }

    // Create Dino Objects
    const dinosObjects=dinosData.map(
      data =>
        new Dinosaur(data.species,
                    data.weight,
                    data.height,
                    data.diet,
                    data.where,
                    data.when,
                    data.fact
                    )
    );


    // Create Human Object
     const Human={};
        // Use IIFE to get human data from form
          const human=()=>{
                (function(){
                    Human.Name=document.getElementById('name').value;
                    Human.feet= document.getElementById('feet').value;
                    Human.inches= document.getElementById('inches').value;
                    Human.height = Number(feet)*12+Number(inches);
                    Human.weight= document.getElementById('weight').value;
                    Human.diet= document.getElementById('diet').value;
                }())

    // Use IIFE to get human data from form
    // if any data mis or Not filed then alert
    /* in this function check the data all data filled or not if any data empty then alert and show massage */
                if(Human.Name.length===0 || Human.weight.length===0 || Human.feet.length===0){
                    alert('Required field');
                }
                else
                {
                    displayHuman(Human);
                    removeForm(Human);
                }
            }

            // display object human
                function displayHuman(list){
                        const humanObj=new Dinosaur('human', list.weight, list.height, list.diet, list.where, list.when, list.fact);
                        dinosObjects.splice(4,0,humanObj);
                    }

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.
        const compareHeight = (dino, data) => {
            if(data.height>dino.height)
            {
                return `It is larger than you and having  height ${data.height}`;
            }
            else if(data.height===dino.height)
            {
                return `It is having same height as yours`;
            }
            else
            {
                return `It is smaller than you`;
            }
        };


    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    const compareDiet = (data) => {
            if(data.diet==='Carnivor')
            {
                return `It is ${data.diet}. Maybe you would be dinner for him, be afraid!`;
            }
            else if(data.diet==='Omnivor'){
                return "You would be dinner for him"
            }
            else if(data.diet==="Harbivor"){
                return "Don't afraid!";
            }
            else{
                return 'Anything will happen to you'
            }
        };

    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    const compareWeight = (dino, data) => {
            if(data.weight===dino.weight)
            {
                return 'Dino having same weight as you have!';
            }
            else if(data.weight>dino.weight){
                return 'This  weight is greater than yours';
            }
            else{
                return 'This weight is lesser than yours ';
            }
        };


    // Generate Tiles for each Dino in Array
     function add(dino){
            const grid=document.getElementById('grid');
            dinosObjects.forEach( (data) => {
                const div=document.createElement('div');
                const image=document.createElement('img');
                const img=data.image;
                image.src=img;
                const h3=document.createElement('h3');
                const p=document.createElement('p');
                //Add tiles to DOM
                grid.appendChild(div);
                div.classList.add('grid-item');
                div.appendChild(h3);
                div.appendChild(image);
                div.appendChild(p);
                if(data.species==='human'){
                    h3.textContent=dino.Name;
                }
                else if(data.species === 'Pigeon')
                {
                    h3.textContent=data.species;
                    p.textContent= 'All birds are Dinosaurs.';
                }
                else{
                        h3.textContent=data.species;
                        const x=Math.floor((Math.random() *7) + 1);
                        p.textContent = switchFact(x,dino,data);
                }

            });
        }
        // for changing facts on each picture
            function switchFact(x,dino,data){
                let obj;
                switch(x){
                    case 1:
                            obj=compareHeight(dino,data);
                         return obj;
                    case 2:
                            obj=compareDiet(data);
                        return obj;
                    case 3:
                        obj=compareWeight(dino,data);
                        return obj;
                    case 4:
                         return "The" +data.species+ " is" +data.diet+" discovered at "+ data.where+"in "+data.when;
                    case 5:
                         return "The "+ data.species+ "is  discovered at "+data.where+ "in" +data.when;
                    case 6:
                        return "The " +data.species+ "is discovered at "+data.where+" ,and fact about is "+data.fact;
                    default:
                         return "Fact about" +data.species+ " is " +data.fact;
                }
            }

        // Add tiles to DOM
    // Remove form from screen
    function removeForm(dino){
               document.getElementById('dino-compare').remove();
               // for Adding tiles in Dom
               add(dino);
            }

// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click',human);
