import { useState, useEffect } from "react";
import classes from "./FiltersDropdown.module.css"

const FiltersDropdown = ({ setData, data }) => {

  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [map,setMap] = useState(new Map());
  const [selectedState,setSelectedState] = useState("");


  
  const fillterStateCity = () => {
    const m = new Map();
    data.map((ele) => {
      if (m.has(ele.state)) {
        const value = m.get(ele.state);
        value.push(ele.city);
        m.set(ele.state, value)
      }
      else{
        m.set(ele.state, [...[ele.city]])
      }
    })
    return m;
  }

  const settingStateCity = () => {
    setMap(fillterStateCity());
  }

  const handleStateFilter = (event) => {
    console.log(event.target.value);
    //city
    const cityArray = [];
    for(const [key,val] of map){
      if(key===event.target.value){
        cityArray.push(val)
      }
    }

    const filterData = data.filter((ele)=>{
      if(ele.state===event.target.value){
        return ele;
      }
    })

    setSelectedState(event.target.value);
    setData(filterData)
    setCity(cityArray);

  }
  const handleCityFilter = (event) => {
    const filterData = data.filter((ele)=>{
      if(ele.state===selectedState && ele.city===event.target.value){
        return ele;
      }
    })

    setData(filterData);
  }


  useEffect(() => {
    settingStateCity();
  }, [])

  useEffect(()=>{
    console.log("state map: ",map);
    
    const stateArray = [];
    const cityArray =[];
    for(const [key, value] of map) {
      stateArray.push(key);
      cityArray.push(value); //value = []
    }

    setState(stateArray);
    setCity(cityArray)
    // setCity(cityArray);
    console.log("State : ",stateArray);
    
  },[map])

  useEffect(()=>{
    console.log(" state of 2nd ",state);
    console.log(" city of 2nd", city );
  },[state,city])

  return (
    <div className={classes.dropdown_container} onClick={()=>{}}>
      <p className={classes.dropdown_heading}>Filters</p>
      <div className={classes.dropdown_options}>
        <select name="State" id="stateID" className={classes.options} onChange={handleStateFilter}>
          <option value="Select State" disabled selected>Select State</option>
          {
            state.map((elem,index)=>{
              console.log("xyz");
              return (<option key={index} value={elem}>{elem}</option>)
            })
          }
        </select>
        <select name="city" id="cityID" className={classes.options} onChange={handleCityFilter}>
          <option value="Select City" disabled selected>Select City</option>
          {
            city.map((elem,index)=>{
              return elem.map((ele)=>{
                return (<option key={index} value={ele}>{ele}</option>)
              })
            })
          }
        </select>
      </div>
    </div>
  )
}

export default FiltersDropdown