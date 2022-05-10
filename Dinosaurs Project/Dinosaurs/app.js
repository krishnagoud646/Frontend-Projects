// dino data from json
const dinosData = [
	{
		species: "Triceratops",
		weight: 13000,
		height: 114,
		diet: "herbavor",
		where: "North America",
		when: "Late Cretaceous",
		fact: "First discovered in 1889 by Othniel Charles Marsh",
	},
	{
		species: "Tyrannosaurus Rex",
		weight: 11905,
		height: 144,
		diet: "carnivor",
		where: "North America",
		when: "Late Cretaceous",
		fact: "The largest known skull measures in at 5 feet long.",
	},
	{
		species: "Anklyosaurus",
		weight: 10500,
		height: 55,
		diet: "herbavor",
		where: "North America",
		when: "Late Cretaceous",
		fact: "Anklyosaurus survived for approximately 135 million years.",
	},
	{
		species: "Brachiosaurus",
		weight: 70000,
		height: "372",
		diet: "herbavor",
		where: "North America",
		when: "Late Jurasic",
		fact: "An asteroid was named 9954 Brachiosaurus in 1991.",
	},
	{
		species: "Stegosaurus",
		weight: 11600,
		height: 79,
		diet: "herbavor",
		where: "North America, Europe, Asia",
		when: "Late Jurasic to Early Cretaceous",
		fact:
			"The Stegosaurus had between 17 and 22 seperate places and flat spines.",
	},
	{
		species: "Elasmosaurus",
		weight: 16000,
		height: 59,
		diet: "carnivor",
		where: "North America",
		when: "Late Cretaceous",
		fact: "Elasmosaurus was a marine reptile first discovered in Kansas.",
	},
	{
		species: "Pteranodon",
		weight: 44,
		height: 20,
		diet: "carnivor",
		where: "North America",
		when: "Late Cretaceous",
		fact: "Actually a flying reptile, the Pteranodon is not a dinosaur.",
	},
	{
		species: "Pigeon",
		weight: 0.5,
		height: 9,
		diet: "herbavor",
		where: "World Wide",
		when: "Holocene",
		fact: "All birds are living dinosaurs.",
	},
];
   
   // Create Dino Constructor
   // function for creating new objects as required
    function Dinosaur(species,weight,height,diet,where,when,fact){
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when =when;
        this.fact = fact;
        const imageName=species.toLowerCase();
        this.image= `images/${imageName}.png`
        }
    
    

    // Create Dino Objects
    // Nine objects inside dinosObjects
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
        )
        

    // Create Human Object
      const Human={};
    // Use IIFE to get human data from form
      const compareMe=()=>{
            (function(){
                //Name
                const Name=document.getElementById('name').value;
                Human.Name=Name;
                //console.log(Human.Name);
                //feet
                const feet= document.getElementById('feet').value;
                Human.feet=feet;
                //inches
                const inches = document.getElementById('inches').value;
                Human.inches=inches;
                // Height
                const height = Number(feet)*12+Number(inches);
                Human.height=height;
                //weight
                const weight= document.getElementById('weight').value;
                Human.weight=weight;
                //diet
                const diet= document.getElementById('diet').value;
                Human.diet=diet;
            }())
            
            //check_for_validattion;
            if(Human.Name.length===0 || Human.weight.length===0 || Human.feet.length===0){
                alert('All fields are mandatory, Please fill it');
                return;
            }
            else
            {   
                display(Human);
                removeForm(Human);
            }
        }

        // disply object human
            function display(obj){
                    const humanObj=new Dinosaur('human',
                                                obj.weight,
                                                obj.height,
                                                obj.diet,
                                                '',
                                                '',
                                                '');
                    dinosObjects.splice(4,0,humanObj);                    
                 // console.log(obj);
                 // console.log(dinosObjects);
                }
                
    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    const compareHeight = (obj, data) => {
        if(data.height>obj.height)
        {
            
            return `It is larger than you and having  height ${data.height}`;
        }
        else if(data.height===obj.height)
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
        if(data.diet==='Carnivor' || data.diet==='Omnivor')
        {
            return `It is ${data.diet}. Maybe you would be dinner for him, be afraid!`;
        }
        else if(data.diet==="Harbivor"){
            return `It is ${data.diet}. Don't afraid!`;
        }
        else{
            return `Anything will happen to you`
        }
    
    };
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    const compareWeight = (obj, data) => {
        if(data.weight===obj.weight)
        {
            return `He is having same weight as you have!`;
        }
        else if(data.weight>obj.weight){
            return `It's  weight is greater than yours ${data.weight} llb`;
        }
        else{
            return `It's weight is lesser than yours ${data.weight} llb`;
        }
    };

    // Generate Tiles for each Dino in Array
    function addGrid(obj){
        const grid=document.getElementById('grid');
        dinosObjects.forEach( (data) => {
            //div
            const div=document.createElement('div');
            // image 
            const image=document.createElement('img');
            const imag=data.image;
            image.src=imag;
            
            //h3
            const h3=document.createElement('h3');
            //p
            const p=document.createElement('p');
            
            if(data.species==='human'){
                h3.textContent=obj.Name;
            }
            else if(data.species==='Pigeon')
            {
                h3.textContent=data.species;
                p.textContent= 'All birds are Dinosaurs.';
            }
            else{            
                    h3.textContent=data.species;
                    const x=Math.floor((Math.random() *7) + 1);
                    p.textContent = switchFact(x,obj,data);
            }
            
            //Add tiles to DOM
            grid.appendChild(div);
            div.classList.add('grid-item');
            div.appendChild(h3);
            div.appendChild(image);
            div.appendChild(p);
        });
    }
        
        // for changing facts on each picture
            function switchFact(x,obj,data){
                let ans;
                switch(x){
                    case 1:
                        // for comparing height
                            ans=compareHeight(obj,data);
                         return ans;
                    case 2:
                        // for comparing diet 
                            ans=compareDiet(data);
                        return ans;
                    case 3:
                        //comparing weight 
                        ans=compareWeight(obj,data);
                        return ans;
                    case 4:
                        // return fact
                         return `The ${data.species} is ${data.diet} discovered at ${data.where} in ${data.when}`;
                    case 5:
                        //return fact
                         return `The ${data.species} is  discovered at ${data.where} in ${data.when}`;
                    case 6:
                        //return fact
                        return `The ${data.species} is discovered at ${data.where},and fact about is ${data.fact}`;
                    default:
                         return `Fact about ${data.species} is ${data.fact}`;
                }
            }
    // Remove form from screen
        function removeForm(obj){
           document.getElementById('dino-compare').remove();
            addGrid(obj);
        }

// On button click, prepare and display infographic   
document.getElementById('btn').addEventListener('click',compareMe);



