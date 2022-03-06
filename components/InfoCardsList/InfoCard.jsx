import classes from './InfoCards.module.css'

function InfoCard({obj,user}) {


  return (
    <div id={classes.infocard}>
      <div className={classes.infocard_container}>
        <div className={classes.user_info}>
          <img src={obj.map_url} alt={obj.map_url} className={classes.map_img} />
          <div className={classes.infocard_details}>
            <p>Ride Id : {obj.id}</p>
            <p>Origin Station : {obj.origin_station_code}</p>
            <p>station_path : {JSON.stringify(obj.station_path)}</p>
            <p>Date: {obj.date.toLocaleString()}</p>
            <p>Distance: {obj.distance}</p>
          </div>
        </div>
        <div className={classes.state_city}>
          <p className={classes.state}>{obj.state}</p>
          <p className={classes.city}>{obj.city}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoCard