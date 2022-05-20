import React, { useEffect, useState } from 'react'
import { registerWidget, IContextProvider } from './uxp';  
import { DataList, PortalContainer, useEffectWithPolling, useEventSubscriber, WidgetWrapper } from "uxp/components";


import './styles.scss';
import {GaugeWidget} from './gauge';
import { RequestWidget } from './request';
import {WeatherWidget} from './WeatherWidget/WeatherWidget';
import { DiagnosticCategory } from 'typescript';

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

interface IAlertTickerProps {
    uxpContext?: IContextProvider;
    instanceId?: string;
    model: string;
    action: string;
    category: string;
    locationFilterCategory: string;


}
interface IAlertMessage {
    message: string;
    timestamp: string;
    category: string;
}
const AlertTicker:React.FunctionComponent<IAlertTickerProps> = (props) => {
    let [messages,setMessages] = React.useState<string[]>([]);
    let [location,setLocation] = React.useState('');
    let [animated,setAnimated] = React.useState(false);
    const p = React.useRef<HTMLDivElement>(null) ;
    const c = React.useRef<HTMLDivElement>(null) ;
    useEventSubscriber(props.instanceId, 'globalFilterLocationChanged', (data) => {
        console.log('globalFilterLocationChanged', data);
        let { location } = data || [];
        let locationItem = (location[location.length - 1] || {});
        let id = locationItem[props.locationFilterCategory] || locationItem.name;
        if (id) {
            setLocation(id);
        }

    });
    useEffectWithPolling(props.uxpContext,'alert-ticker/' +DiagnosticCategory,30000,async ()=>{
        if (!props.model) return;
        if (!props.action) return;
        let data = await props.uxpContext.executeAction(props.model,props.action,{category:props.category,location:''},{json:true}) as IAlertMessage[];
        setMessages(data.map(x=>x.message));
    },[location,props.model,props.action,props.category]);
  
    useEffect(()=>{
        if (p?.current && c?.current) {
            if (p?.current?.clientWidth < p?.current?.scrollWidth) {
               setAnimated(true);
               return;
            }
        }
        setAnimated(false);
    },[messages]);
   
    if (!messages?.length) {
        return <div />
    }
    return <PortalContainer disableScroll={false}>
<div className='generic-alert-ticker' ref={p}>
        <div className={'generic-ticker-tape ' + (animated?'animated':'')} ref={c} >{messages.join(' • ')}</div>
    </div>
    </PortalContainer>;

}
registerWidget({
    id:'coming-soon',
    widget:ComingSoonWidget,
    configs:{
        layout:{}
    }
})
registerWidget({
    id:'alert',
    widget:AlertTicker,
    configs:{
        layout:{},
        props:[
            {
                name:"model",
                "label":"Lucy Model",
                "type":"string"
            },
            {
                name:"action",
                "label":"Lucy Action",
                "type":"string"
            },
            {
                name:"category",
                "label":"Alert Category",
                "type":"string"
            },
            {
                name:"locationFilterCategory",
                "label":"Which location filter attribute should this widget react to",
                "type":"string"
            },
        ]
    }
})
registerWidget({
    id:'notice',
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
