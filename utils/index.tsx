import axios from 'axios';

export async function APICall(artist: String, minValue: Number, maxValue: Number) {
    const URI = 'https://accounts.spotify.com/api/token';
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', process.env.REACT_APP_CLIENT_ID);
    params.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);
    let access_token = '';
    let artistResponse = '';
    let toptracksResponse = '';
    try{
        const token = await axios.post(URI, params,
        {headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }});
        access_token = token.data.access_token;
    }
    catch(error){
        console.log(error);
    }
    
    try{
        artistResponse = await axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`,{
        headers: {
        "Authorization": `Bearer ${access_token}`
        }
        });
    }catch(error){
        console.log(error);
    }

    const items = artistResponse.data.artists.items;
    const id = items[0].id;
    if (id == ""){
    return(["No artist or genres found"]);
    }
    else{
        const limit = Math.floor(Math.random() * 26) + 10;
        
        try{
            toptracksResponse = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })
        }
        catch(error){
            console.log(error);
        }

        const topTracks = toptracksResponse.data.tracks;
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