let page=1;

let input=document.getElementById("input")

let isSearching=false


const url = `https://anime-db.p.rapidapi.com/anime?page=${page}&size=15&search=&sortBy=ranking&sortOrder=asc`;
//           https://anime-db.p.rapidapi.com/anime?page=1&size=1&search=&sortBy=ranking&sortOrder=asc
const options = {
	headers: {
		'x-rapidapi-key': 'a563bb61aamshf7fee80e8f9e69dp18af77jsnb715649fab82',
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
	}
};
//b4c5ce4ecamsh0b4dd0040507085p1f035ajsn73ced791976d
//39dab459famshca5ada9491e6e66p1161a5jsn227ee706593c
//a3e0f8e0e4mshb5929ea62ab9a26p1672f6jsn6386ea2f0dcc
//e9c6ffff0dmshcaf6f0457e07e2cp1e1a01jsn8cdac13bc5c4
//a563bb61aamshf7fee80e8f9e69dp18af77jsnb715649fab82

function mainFunction (fetch){
    fetch
    .then(response=>response.json())
    .then(data=>{
     //   console.log(data)

        data.data.forEach(element => {
       //     console.log(data)
            

           let button =document.createElement("button")
           button.classList.add("MoreInfo") 

           let div=document.createElement("div")
           div.classList.add("image")

           let animeposter=document.createElement("img")
           animeposter.src=element.image
           animeposter.alt=element.title
           animeposter.classList.add("animePoster")
           
           let title=document.createElement("p")
           title.textContent=element.title
           div.appendChild(animeposter)
           div.appendChild(title)
           button.appendChild(div)
           document.getElementById("trending").appendChild(button)

           displayMoreInfo(button,element)

        });
        
    })
    
}

function fetchTrending(){
    mainFunction(fetch(`https://anime-db.p.rapidapi.com/anime?page=${page}&size=15&search=&sortBy=ranking&sortOrder=asc`,options))
}


function searchAnime(){
    mainFunction( fetch(`https://anime-db.p.rapidapi.com/anime?page=${page}&size=15&search=${input.value}&sortBy=ranking&sortOrder=asc`,options))
}
function titleToKeyword(title){
   let keyword=title.toLowerCase()
   let formatedKeyword=""
   for(let i=0;i<keyword.length;i++){
        if(keyword[i]==" "){
            formatedKeyword=keyword.replace(" ","+")
            keyword=formatedKeyword
        }
   }
   return formatedKeyword
}

function displayMoreInfo(button,element){
    
    button.addEventListener("click",()=>{
        document.querySelector(".content").style.display="none"
        document.querySelector(".backNext").style.display="none"
           
           document.getElementById("displayBackgroundImagePhoto").src=element.image
           document.querySelector(".bcImage").style.display="block"
           document.getElementById("displayMoreInfoPoster").src=element.image
           document.getElementById("titleDMI").textContent=element.title
           document.getElementById("synopsesDMI").textContent=element.synopsis
           document.getElementById("altTitleDMI").textContent=element.alternativeTitles[0]
           element.genres.forEach(genre =>{
               let genreButton=document.createElement("button")
               genreButton.textContent=genre
               genreButton.classList.add("buttonGenres")
               document.getElementById("genres").appendChild(genreButton)
           })
           document.getElementById("rankingsDMI").textContent=element.ranking
           document.getElementById("typeDMI").textContent=element.type

           document.getElementById("rederectLink").addEventListener("click",()=>{
            document.getElementById("rederectLink").href=`https://aniwatchtv.to/search?keyword=${titleToKeyword(element.title)}`
           })
        })
}



function whatToFetch(){
    if(isSearching){
        searchAnime()
    }
    else{
        fetchTrending()
        
    }
}



document.getElementById("BackButtonbcImage").addEventListener("click",()=>{
    document.querySelector(".content").style.display="block"
    document.querySelector(".backNext").style.display="flex"
    document.querySelector(".bcImage").style.display="none"
  
  })

let searchFunction=()=>{
    document.getElementById("type").textContent="Your search result: "
    document.getElementById("trending").textContent=" "
    searchAnime()
    isSearching=true
}

document.getElementById("search").addEventListener("click",()=>{
    searchFunction()
    
})

document.getElementById("input").addEventListener("keypress",(event)=>{
    if (event.key === "Enter") {
        searchFunction()
    }
    
})

        document.getElementById("next").addEventListener("click",()=>{
            page+=1;
           
            if(page>=2){
                document.getElementById("previos").style.visibility="visible"
            }
            document.getElementById("trending").textContent=" "
            whatToFetch()
        })



        document.getElementById("previos").addEventListener("click",()=>{
            if(page==2){
        
                page-=1;
                document.getElementById("previos").style.visibility="hidden" 
                document.getElementById("trending").textContent=" "
        
                whatToFetch()
        
            }
            else if(page>1){
                page-=1;
        
                document.getElementById("trending").textContent=" "
                whatToFetch()
        
            }
            
        })
    document.getElementById("openMenu").addEventListener("click",()=>{
        document.getElementById("sideMenu").style.visibility="visible"
    })

    document.getElementById("closeMenu").addEventListener("click",()=>{
        document.getElementById("sideMenu").style.visibility="hidden"
    })

    document.getElementById("backHome").addEventListener("click",()=>{
        document.getElementById("trending").textContent=""
        input.value=""
        isSearching=false
        fetchTrending()
    })
    
fetchTrending()
