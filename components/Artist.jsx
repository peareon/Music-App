import Image from 'next/image'
export default function Artist(props){
    return(
        <>
            <div className="">
                <h1>{props.name.slice(0,25)}</h1>
                <h2>{props.artist_name}</h2>
                <div className="relative mb-[250px]">
                    {props.preview_url ? <video className="max-w-[200px] mt-[-45px]" controls>
                        <source src={props.preview_url} type="video/mp4"/>
                    </video>: <div className="min-h-[15px] min-w-[200px]"></div>}
                    <Image className="max-w-[200px] absolute" src={props.imagen} alt="" />
                </div>
            </div>
        </>
    )
}