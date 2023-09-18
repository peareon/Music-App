import { useContext, useState } from "react"
import { ApiContext } from "@/app/page";
import { APICall } from "@/utils";

export default function Form(){
    const [artist, setArtist] = useState('')
    const {setApiResponse, setQuery, minValue, maxValue} = useContext(ApiContext);

    async function getArtist(ev){
        ev.preventDefault();
        const response = await APICall(artist, minValue, maxValue);
        setQuery(true);
        try{
            setApiResponse(JSON.parse(response));
        }
        catch{
            setApiResponse(response);
        }
    }
    return(
        <main className="flex min-h-[140px] flex-col items-center justify-between mt-[70px]">
            <form className="flex gap-5" onSubmit={getArtist}> 
                <input className="p-1 max-h-7 mt-3 outline-none focus:border-stone-400 border-2 border-solid" type="text"  placeholder="Artist"
                value={artist} onChange={ev => setArtist(ev.target.value)}/>
                <button className="bg-lime-600 p-2 rounded-lg hover:bg-lime-700 text-white active:shadow-[7px_7px_10px_-5px_rgba(0,0,0,0.5)]" style={{marginTop:'5px'}}>Give me some music!</button>
            </form>
        </main>
    )
}