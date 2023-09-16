export async function APICall(artist: String, minValue: Number, maxValue: Number) {

    const token = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    });
    const {access_token} = await token.json();
    console.log(access_token)
    const artistResponse = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`,{
    headers: {
        "Authorization": `Bearer ${access_token}`
    }
    });
    console.log(artistResponse)
    const {artists: {items}} = await artistResponse.json();
    const {id} = items[0];
    if (id == ""){
    return(["1"]);
    }
    else{
        const limit = Math.floor(Math.random() * 26) + 10;
        const tracksResponse = await fetch(`https://api.spotify.com/v1/recommendations?limit=${limit}&seed_artists=${id}&min_popularity=${minValue}&max_popularity=${maxValue}`,{
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        const {tracks} = await tracksResponse.json();
        const no_of_tracks = tracks.length;
        console.log(no_of_tracks)
        let tracksList = [];
        let rnd_list:any = [];
        if(no_of_tracks > 6){
            for(let i = 0; i < 6; i++){
                let random_take = Math.floor(Math.random() * no_of_tracks);
                while(rnd_list.includes(random_take)){
                    random_take = Math.floor(Math.random() * no_of_tracks);
                }
                rnd_list.push(random_take);
                tracksList.push(tracks[random_take]);
            }
            return(JSON.stringify(tracksList));    
        }
        else{
            for(let i = 0; i < no_of_tracks; i++){
                tracksList.push(tracks[i]);
            }
            return(JSON.stringify(tracksList));  
        }
         
    }
}