import { useState, useEffect, useRef } from 'react';
import classes from './InfoCards.module.css'
import InfoCard from './InfoCard'
import FiltersDropdown from '../DropDownList/FiltersDropdown';
import { format, compareAsc, setDate } from 'date-fns'

//Function to find Shortest Path
const findShortestPath = (arr, userdata) => {
    let closestStation
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= userdata) {
            closestStation = arr[i];
            const shortestPath = closestStation - userdata;
            return Math.abs(shortestPath);
        }
    }
}

function InfoCardsList({ userdata }) {

    const [isFilterOpen, setFilterOpen] = useState(false)
    const [rawData,setRawData] = useState([]);
    const [data, setData] = useState([]);
    const [activeTab,setActiveTab] = useState({isNearest:true,isPast:false,isUpcoming:false})


    //Fetching Rides from API
    async function fetchRides() {
        const data = await fetch("https://assessment.api.vweb.app/rides").catch((err)=>{
            console.log(err);
        });
        const response = await data.json();
        
        await response.forEach((element) => {
            element.date = new Date(element.date);
            element.distance = findShortestPath(element.station_path, userdata.station_code);
        });

        const res = await response.sort(
            (a, b) => {
                return a.distance - b.distance;
            }
        )
        console.log("responseinside:" ,res);
        setRawData(res);
        setData(res)
    }

    //Nearest Ride Code
    const nearestRide = () => {
        setActiveTab({isNearest:true,isPast:false,isUpcoming:false})
        setData(rawData);
    }
    
    //Past Ride code
    const pastRides = () => {
        let newData = [];
        let currDate = new Date();
        for(let i=0;i<rawData.length;i++){
            if(rawData[i].date<currDate){
                newData.push(rawData[i]);
            }
        }
        console.log("newdata : ",newData);
        setActiveTab({isNearest:false,isPast:true,isUpcoming:false});
        setData(newData);
    }

    //Upcoming Rides Code
    const upcomingRides = () => {
        let newData = [];
        let currDate = new Date();
        for(let i=0;i<rawData.length;i++){
            if(rawData[i].date>=currDate){
                newData.push(rawData[i]);
            }
        }
        console.log("newdata : ",newData);
        setActiveTab({isNearest:false,isPast:false,isUpcoming:true});
        setData(newData);
    }

    useEffect(() => {
        fetchRides();
    }, [])

    return (
        <div>
            <div className={classes.filters}>
                <div className={classes.filters_sort} onClick={() => { setFilterOpen(false) }}>
                    <p onClick={()=>{nearestRide()}}className={classes.ride_types}>Nearest Rides {activeTab.isNearest && `(${data.length})`}</p>
                    <p onClick={()=>{upcomingRides()}} className={classes.ride_types}>Upcoming Rides {activeTab.isUpcoming && `(${data.length})`}</p>
                    <p onClick={()=>{pastRides()}} className={classes.ride_types}>Past Rides {activeTab.isPast && `(${data.length})`}</p>
                </div>
                <div className={classes.filtersDropdown_container}>
                    <div className={classes.filter_drowpdown}>
                        {!isFilterOpen && <button className={classes.filter_btn} onClick={() => { setFilterOpen(!isFilterOpen) }}> <img src="/vector.svg" alt="" /> Filters</button>}
                        {isFilterOpen && <FiltersDropdown setFilterOpen={setFilterOpen} data={rawData} setData={setData} />}
                    </div>
                </div>
            </div>
            <div onClick={() => { setFilterOpen(false) }}>
                {
                    data.map((obj, index) => {
                        return <InfoCard user={userdata} obj={obj} key={index} />
                    })
                }
            </div>
        </div>
    )
}

export default InfoCardsList