import {useState, useCallback,useRef, useEffect} from 'react'
export  const useHttpClient = () =>{
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState();

    /*useRef persist values between renders*/ 
    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback( async (url, method = 'GET', body = null, headers = {}) =>{
        setisLoading(true)
        const httpAbortCtrl = new AbortController();
        /*for each rerender abort controller will be stored in activeHttpRequest*/
        activeHttpRequests.current.push(httpAbortCtrl);

      try{
        const response  = await fetch(url,{
            method,
            body,
            headers,
            signal: httpAbortCtrl.signal 
        });
        /*converting response json to js object*/
        const responseData = await response.json();
        /*clearing the abort controllers that belong to the request which just completed*/ 
        activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !==httpAbortCtrl);

        if(!response.ok){
            throw new Error(responseData.message);
        }
        setisLoading(false)
        return responseData
      }catch(err){
          setError(err.message || 'Something went wrong, try again')
        setisLoading(false)
        throw err
      }

    } , []);
    const clearError = () =>{
        setError(null);
    } 

    useEffect(()=>{
        return () =>{
            /*if we change components immediately after initiating fetch request than abort all the request*/ 
            /*if yet some abort controller is remaining than abort it*/ 
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    },[])

    return {isLoading, error, sendRequest, clearError}
}
