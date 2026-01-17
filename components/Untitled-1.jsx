import { useEffect, useState } from 'react';

export default function Domains(){
    [dataList, setdataList] = useState('');

    useEffect(async () =>{
        domainsResponse = await fetch(`https://api.sitehost.nz/1.0/srs/list_domains.json?apikey=${process.env.API_KEY}&client_id=293785`);

        const { return: {data} } = await domainsResponse.json();
        setdataList(data)
    }, [])
    return(
        <>
            <div className="">
                {dataList.map(domain =>(
                        <div key={domain.domain} className="">{domain.domain}</div>
                ))}
            </div>
        </>
    )
}