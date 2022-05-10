let store = {
    user: { name: "Krishna Goud" },
    apod: 'curiosity',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    images :[]
}

// add our markup to the page
const root = document.getElementById('root');
let btns = document.querySelectorAll('button');

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, store) => {
    root.innerHTML = App(store)
}

// create content
const App = (store) => {
    return `<div>
                ${aboutApp(store)}
                ${RoverChoosen(store)}
                ${RoverImage(store)}
            </div>
                          
`
}
const curiosity_rover = ()=>{
    return `<div class ='cur'>
        <h2>About curiosity Rover</h2>
        <p>Did Mars ever have the right environmental conditions to support small life forms called microbes? Early in its mission, Curiosity's scientific tools found chemical and mineral evidence of past habitable environments on Mars. It continues to explore the rock record from a time when Mars could have been home to microbial life.</p>
        <h2>Launch Date</h2>
        <p>26 November 2011, 8:32 pm IST</p>
        <h2>Launch Vehicle</h2>
        <p>Atlas V-451 Landing: 10:32 p.m. PDT, Aug. 5, 2012 (1:32 a.m. EDT, Aug. 6, 2012)</p>
        <h2>Landing Date</h2>
        <p>August 6, 2012, 05:17:57 UTC</p>
        <h2>Landing site</h2>
        <p>Gale Crater</p>
        <h2>Status</h2>
        <p>The rover is still operational, and as of February 26, 2022, Curiosity has been active on Mars for 3398 sols (3491 total days; 9 years, 204 days) since its landing (see current status).</p>
        <h2>Max Speed</h2>
        <p>0.14 km/h</p>
        <h2>Cost</h2>
        <p>250 crores USD (2012)</p>
    </div>`
}
const opportunity_rover = ()=>{
    return `<div class ='cur'>
        <h2>About Opportunity Rover</h2>
        <p>Opportunity, also known as MER-B or MER-1, and nicknamed 'Oppy',
         is a robotic rover that was active on Mars from 2004 until the middle of 2018.Opportunity was operational on Mars for 5110 sols (5250 days, or 14 years, 136 days).</p>
        <h2>Launch Date</h2>
        <p>8 July 2003, 8:48 am IST</p>
        <h2>Landing Date</h2>
        <p>January 25, 2004, 05:05 UTC SCET; MSD 46236 14:35 AMT</p>
        <h2>Status</h2>
        <p>No response has been received from Opportunity since Sol 5111 (June 10, 2018), amid a planet-encircling dust storm on Mars. With the last uplink transmission on Sol 5352 (Feb. 12, 2019), the rover recovery efforts are concluded. The Opportunity mission is complete.</p>
        <h2>Max Speed</h2>
        <p>0.18 km/h</p>
        <h2>Last contact</h2>
        <p>June 10, 2018</p>
        <h2>Cost</h2>
        <p>40 crores USD</p>
    </div>`
}
const spirit_rover = ()=>{
    return `<div class ='cur'>
        <h2>About Spirit Rover</h2>
        <p>One of two rovers launched in 2003 to explore Mars and search for signs of past life, Spirit far outlasted her planned 90-day mission, lasting over six years. Among her myriad discoveries, Spirit found evidence that Mars was once much wetter than it is today and helped scientists better understand the Martian wind.</p>
        <h2>Launch Date</h2>
        <p>10 June 2003, 11:28 pm IST</p>
        <h2>Landing Date</h2>
        <p>January 4, 2004, 04:35 UTC SCET; MSD 46216 03:35 AMT</p>
        <h2>Status</h2>
        <p>More than 1,300 commands were radiated to Spirit as part of the recovery effort in an attempt to elicit a response from the rover. No communication has been received from Spirit since Sol 2210 (March 22, 2010). The project concluded the Spirit recovery efforts on May 25, 2011. The remaining, pre-sequenced ultra-high frequency (UHF) relay passes scheduled for Spirit on board the Odyssey orbiter will complete on June 8, 2011.</p>
        <h2>Max Speed</h2>
        <p>0.18 km/h</p>
        <h2>Cost</h2>
        <p>40 crores USD (2012)</p>
    </div>`
}

const RoverChoosen = (store)=>{
    const {apod} = store;
    if(apod==='curiosity'){
        return curiosity_rover();
    }
    else if(apod==='opportunity'){
        return opportunity_rover();
    }
    else if(apod==='spirit') {
        return spirit_rover();
    }
}
const RoverImage = (store)=>{
    let a = '';
    const {images} = store;
    images.slice(0,20).map( im => {
       a+= `<figure class='figure'>
                <img src='${im.img_src}' alt='rover Image'/>
                <figCaption>
                    <div><strong>Earth date:</strong> ${im.earth_date}</div>
                    <div><strong>Day on mars(sol):</strong> ${im.sol}</div>
                </figCaption>
       </figure>
       `
    })
    return a;

}
//Info about Website
const aboutApp = (state) => {
    let { rovers, apod } = state
    return `
        ${Greeting(state.user.name)}
        <section>
            <h2>About an App!</h2>
            <p>
                One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                but generally help with discoverability of relevant imagery.
            </p>
        </section>
`
}

const APIData = async (curId) => {
    await getDataOfRover(curId);
    await getImageOfTheDay(curId);
}

const toAddClass = (btns) => {
        btns.forEach((btn)=>{
            btn.addEventListener('click',(event) =>{
                const curId = event.target.id;
                updateStore(store,{apod:curId});
                APIData(curId);
            })
        })
}


// listening for load event because page should load before any JS is called
window.addEventListener('load', async () => {
    toAddClass(btns);
    await APIData('curiosity');
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome , ${name}!</h1>
        `
    }
    return `
        <h1>Hello!</h1>
    `
}
const getDataOfRover = (data)=>{
    fetch('http://localhost:3000/data',{
        method:'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({data})
    })
    .then(res => res.json())
    .then(apod=>{ 
        updateStore(store,{data:apod})}
    ).catch(error => console.log("error:",error));
}
const getImageOfTheDay = (data) => {

    fetch('http://localhost:3000/images',{
        method : 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({data})
    })
        .then(res => res.json())
        .then(apod => {
            updateStore(store, {images:apod})
        }).catch(error => console.log("error:",error))

}