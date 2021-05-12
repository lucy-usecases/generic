import * as React from "react";
import { registerWidget, registerLink, registerUI, IContextProvider, } from './uxp';
import { TitleBar, FilterPanel, WidgetWrapper, RadialGauge } from "uxp/components";
interface IGaugeWidgetProps {
    uxpContext?: IContextProvider;
    title: string;
    model: string;
    action: string;
    refreshInterval: string;
    label: string;
    min:string;
    max:string;
    colors:string;
}

export const GaugeWidget: React.FunctionComponent<IGaugeWidgetProps> = (props) => {
    let max = Number(props.max);
    let min = Number(props.min);
    if (max - min == 0) {
        max = 100;
        min = 0;
    }
    let [value,setValue] = React.useState(0);
    let [counter,setCounter] = React.useState(0);
    let label = props.label || 'Value';
    let colors = props.colors.split(',');
    let interval = Number(props.refreshInterval) || 2000;
    function reload() {
        setTimeout(()=>setCounter((old)=>old+1),interval);
    }
    function loadValue() {
        props.uxpContext.executeAction(props.model,props.action,{},{json:true}).then(data=>{
            if (data.value) {
                setValue(data.value);
            }
            reload();
        }).catch(e=>{
            reload();
        });
    }
    React.useEffect(()=>{
        loadValue();
    },[counter]);
    return (
        <WidgetWrapper>
            <TitleBar title={props.title || 'Gauge'}>
               
            </TitleBar>
            <div style={{'flex':1}}>
                <RadialGauge max={max} min={min} value={value} label={()=> <div>
                    <div style={{fontSize:'2em'}}>{value}</div>
                    <div style={{textTransform:'uppercase',marginTop:'10px'}}>{label}</div>
                    </div>} 
                tickColor={'#424242'}
                
                colors={colors.map((c,i)=>({color:c,stopAt:(i+1)*(max-min)/colors.length}))} />
            </div>
        </WidgetWrapper>
    )
};