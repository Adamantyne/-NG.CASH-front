export default function persistUser(token,contextData, setContext){
      setContext({
        ...contextData, config: {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      });   
}