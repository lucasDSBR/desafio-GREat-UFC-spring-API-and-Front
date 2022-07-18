import React from 'react'

const DataFetch = () => {
    const [data, setData] = React.useState()
    const [error, setError] = React.useState()
    const [loading, setLoading] = React.useState()
    const request = React.useCallback(async (url, options) => {
        let response;
        let json;
        try {
            setError(null);
            setLoading(true);
            response = await fetch(url, options);
            json = await response.json();
            
            if(response.ok === false) throw new Error(json.message);
            
        }catch(e){
            json = null
            setError(e.message);
            if(response.ok === false){
                
            }
        }finally{
            setData(json);
            setLoading(false);
            return {response, json}
        }
    }, [])
    return {
        data,
        loading,
        error,
        request
    }
}

export default DataFetch
