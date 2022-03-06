import React ,{useState,useEffect} from 'react'
import Navbar from './Navbar/Navbar';
import InfoCardsList from './InfoCardsList/InfoCardsList';

function Index() {

    const [user,setUser] = useState({})
    const [isGetUser,setIsGetUser] = useState(false)
    
    async function fetchUser(){
        const userRes = await fetch("https://assessment.api.vweb.app/user");
        const user = await userRes.json();
        console.log(user);
        setUser(user);
        setIsGetUser(true);
    }

    const LoadingState = () => {
        return (
            <>
                <h1 style={{color:"white"}}>Loading</h1>
                <p style={{color:"white"}}>If taking too long Refresh it!</p>
            </>
        );
    } 
    
    useEffect(()=>{
        fetchUser();
    },[])

    return (
        <>
            <Navbar user={user} />
            <main className="container">
                {isGetUser ? <InfoCardsList userdata={user}/>:<LoadingState/>}
            </main>
        </>
    )
}

export default Index