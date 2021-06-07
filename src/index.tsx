import { registerWidget, registerLink, registerUI, IContextProvider, } from './uxp';
import './styles.scss';
import {GaugeWidget} from './gauge';
import { RequestWidget } from './request';
import {WeatherWidget} from './WeatherWidget/WeatherWidget';

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
    id: "WeatherWidget",
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
              
            },
            {
                name:"title",
                "label":"Widget Title",
                "type":"String",
                
            },
          
        ]
    }
});