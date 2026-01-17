export async function APICall(artist: String, minValue: Number, maxValue: Number) {

    const token = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    });
    const {access_token} = await token.json();
    const artistResponse = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`,{
    headers: {
        "Authorization": `Bearer ${access_token}`
    }
    });
    const {artists: {items}} = await artistResponse.json();
    const {id} = items[0];
    if (id == ""){
    return(["No artist or genres found"]);
    }
    else{
        const limit = Math.floor(Math.random() * 26) + 10;
        
        const getSeeds = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })

        const toptracksResponse = await getSeeds.json();
        const topTracks = toptracksResponse.tracks;
        console.log(topTracks)
        if(topTracks.length > 5){
            let songsArray: string[] = [];
            let numberArray: string[] = [];
            for(let i = 0; i < 6; i++){
                let random_take = Math.floor(Math.random() * topTracks.length).toString();
                console.log(random_take)
                while(numberArray.includes(random_take)){
                    random_take = Math.floor(Math.random() * topTracks.length).toString();
                }
                numberArray.push(random_take);
                songsArray.push(topTracks[random_take]);
            }
            console.log(songsArray)
            return(JSON.stringify(songsArray));    
        }
        else if(topTracks.length > 0 && topTracks.length <= 5){
            let songsArray: string[] = [];
            for(let song in topTracks){
                songsArray.push(song);
            }
            console.log(songsArray)
            return(JSON.stringify(songsArray));  
            
        }
        else{
            return(["No tracks found"]);
        }
         
    }
}