import { Button } from "antd"


import { SaveOutlined} from "@ant-design/icons";


export default function Buttons({...props}) {
 
const {size,text ,icon ,handlesave} = {...props}





    return (


      <Button size={size} style={{width:"100%"}} icon={icon} onClick={handlesave}>
        {text}
      </Button>
    )
}