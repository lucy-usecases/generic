
import React, { useState } from 'react'
import { registerWidget, IContextProvider } from '../uxp';  
import { DataList, WidgetWrapper } from "uxp/components";

import './weather.scss'; 
import {VideoBg,Source} from '../components/VideoBg/VideoBg';

 
interface IWeatherWidgetProps{
    uxpContext?: IContextProvider;
    isActive: string;
    model: string;
    action: string;
    location: string;
} 
type WeatherStatus = 'sun' | 'drizzle' | 'cloudy' | 'lightning' | 'snow' | 'rain' | 'thunder';
interface IForecast {
  temperature: number;
  status: WeatherStatus;
}
const Days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var dataset = [ 
             {
              "id": "Monday",
               "label": "Mon",
               "value": 10,  
               "status":"sun"
             },
             {
              "id": "Tuesday",
               "label": "Tue",
               "value": 18,  
               "status":"thunder"
             },
             {
              "id": "Wednesday",
               "label": "Wed",
               "value": 23,  
               "status":"cloudy"
             },
             {
              "id": "Thursday",
               "label": "Thur",
               "value": -13,  
               "status":"snow"
             },
             {
              "id": "Friday",
               "label": "Fri",
               "value": 17,  
               "status":"rain"
             },
             {
               "id": "Saturday",
               "label": "Sat",
               "value": 23,  
               "status":"drizzle"
             } 
 ] 
 
 const POLL_FREQUENCY = 1000*60*60*5;

export const WeatherWidget:React.FunctionComponent<IWeatherWidgetProps> = (props) =>  {    
  let [forecast,setForecast] = React.useState<IForecast[]>([]);
  let timer:any = null;
  let updateForecast =  () => {
    if (!props.model || !props.action) {
      scheduleUpdate();
      return;
    }

    props.uxpContext.executeAction(props.model,props.action,{location:props.location},{json:true}).then((data)=>{
      setForecast(data);
      scheduleUpdate();
    }).catch(e => {
      scheduleUpdate();
    });
  };

  let scheduleUpdate = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(()=>updateForecast(),POLL_FREQUENCY);
  }

  React.useEffect(()=>{
    updateForecast();
  },[]);

// let [data,setData] = React.useState([])

// function getData () { 
//     props.uxpContext.executeAction("Example1","weather",{},{json:true}).then(res=>{
//         setData(res);
//     }).catch(e=>{
//         // reload();
//     }); 
// }
// React.useEffect(() =>{
//     getData();
// }, [])
 
let currentDay = new Date().getDay();
const DayWeatherlist = () => (
 
    <ul className="daylist">
      {forecast.slice(1).map((item,k) => (
        <li key={k}> 
          <div className={`${item.status} status`}></div> 
          <div className="label">{Days[(k+currentDay+1)%Days.length]}</div>
          <div className="value">{item.temperature.toFixed(0)}</div>
        </li>
      ))}
    </ul>  
 ); 

  
 let currentItem = forecast[0] || {temperature:25,status:''};
 let videoSource = "https://s3.amazonaws.com/ecyber.public/widgets/weather/video/" + currentItem.status + ".mp4";
    return  <>

    <WidgetWrapper>   
      <div className={`weather_widget ${currentItem.status}`}>   

          <div className="weather-video">  
              <VideoBg source={videoSource} loop={true} autoPlay muted>  
                <Source src={videoSource} type="video/mp4"/>  
              </VideoBg>; 
          </div>  

          <div className="weather_widget-top">
            <div className="perc-value"> 
                 <p>{currentItem.temperature.toFixed(0)}%</p>
            </div>  
          </div>  
 
          <div className={`weather_icon ${currentItem.status}`}>    
          </div>  

           <div className="weather-content"> 
                <h4>{currentItem.temperature.toFixed(0)}<sup>o</sup><span>C</span></h4>
                <p>{currentItem.status} Today</p>
            </div>

            <DayWeatherlist />  

        </div> 


{/* ))} */}

    </WidgetWrapper>

    </>

    } 

