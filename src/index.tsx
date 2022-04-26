import React, { useState } from 'react'
import { registerWidget, IContextProvider } from './uxp';  
import { DataList, WidgetWrapper } from "uxp/components";


import './styles.scss';
import {GaugeWidget} from './gauge';
import { RequestWidget } from './request';
import {WeatherWidget} from './WeatherWidget/WeatherWidget';

interface IWidgetProps {

}
const ComingSoonWidget:React.FunctionComponent<IWidgetProps> = (props) =>  {    
    return <WidgetWrapper className='coming-soon'>
        <div className='t'>Coming Soon</div>
    </WidgetWrapper>
}

interface INoticeWidgetProps {
    message: string;
}
const NoticeWidget:React.FunctionComponent<INoticeWidgetProps> = (props) =>  {    
    return <div className='generic-notice-widget'>
        <div className='t'>{props.message}</div>
    </div>
}

registerWidget({
    id:'coming-soon',
    name:'Coming Soon',
    widget:ComingSoonWidget,
    configs:{
        layout:{}
    }
})

registerWidget({
    id:'notice',
    name:'Notice Widget',
    widget:NoticeWidget,
    configs:{
        layout:{},
        props:[
            {
                name:"message",
                "label":"Message to display",
                "type":"String"
            }
        ]
    }
})
registerWidget({
    id: "gauge-widget",
    name: "Gauge",
    widget: GaugeWidget,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        },
        props:[
            {
                name:"model",
                "label":"Lucy Model to call",
                "type":"String"
            },
            {
                name:"action",
                "label":"Name of the action to call",
                "type":"String"
            },
            {
                name:"title",
                "label":"Widget Title",
                "type":"String"
            },
            {
                name:"label",
                "label":"Gauge Label",
                "type":"String"
            },
            {
                name:"refreshInterval",
                "label":"Refresh Interval(ms)",
                "type":"String"
            },
            {
                name:"min",
                "label":"Minimum Value",
                "type":"String"
            },
            {
                name:"max",
                "label":"Maximum Value",
                "type":"String"
            },
           
            {
                name:"colors",
                "label":"Comma separated list of colors for the gauge",
                "type":"String"
            },
        ]
    }
});


registerWidget({
    id: "request-widget",
    name: "User Request",
    widget: RequestWidget,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        },
        props:[
            {
                name:"model",
                "label":"Lucy Model to call",
                "type":"String"
            },
            {
                name:"action",
                "label":"Name of the action to call",
                "type":"String"
            },
            {
                name:"title",
                "label":"Widget Title",
                "type":"String"
            },
          
        ]
    }
});

/**
 * Register as a Widget
 */
 registerWidget({
    id: "weather-widget",
    name: "Weather Widget",
    widget: WeatherWidget,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        },
        props:[
            {
                name:"model",
                "label":"Lucy Model to call",
                "type":"String",
                
            },
            {
                name:"action",
                "label":"Name of the action to call",
                "type":"String",
              
            },
            {
                name:"location",
                "label":"The location to get weather for (lat,lng)",
                "type":"String",
              
            }
          
        ]
    }
});
