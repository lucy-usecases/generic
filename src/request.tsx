import * as React from "react";
import { registerWidget, registerLink, registerUI, IContextProvider, } from './uxp';
import { TitleBar, FilterPanel, WidgetWrapper, RadialGauge, Modal, Input, AsyncButton, useToast } from "uxp/components";
interface IRequestWidgetProps {
    uxpContext?: IContextProvider;
    title: string;
    model: string;
    action: string;
}

export const RequestWidget: React.FunctionComponent<IRequestWidgetProps> = (props) => {
    let [showingModal,setShowingModeal] = React.useState(false);
    let [description,setDescription] = React.useState('');
    let toast = useToast();
    async function submit() {
        try {
            let r = await props.uxpContext.executeAction(props.model,props.action,{description},{json:true});
            setShowingModeal(false);
            toast.success('Submitted');
        } catch(e) {
            toast.error(e);
        }
    }
    function renderModal() {
        return <Modal
        title={props.title}
        show={showingModal}
        onClose={()=>setShowingModeal(false)}

        >
            <div style={{flex:1,flexDirection:'column',justifyContent:'flex-start',padding:'20px',alignItems:'space-between',display:'flex'}}>
                <div style={{padding:'20px'}}>

                <Input   value={description} onChange={(txt)=>setDescription(txt)} placeholder={'Describe your request'} />
                </div>
                <AsyncButton  title={'Submit'} onClick={async () => await submit()}  />
            </div>
        </Modal>
    }
    return (
        <WidgetWrapper>
            
            <div style={{'flex':1,display:'flex',justifyContent:'center',alignItems:'center'}} onClick={()=>setShowingModeal(true)}>
                {props.title}
            </div>
            {
                showingModal && renderModal()
            }
        </WidgetWrapper>
    )
};