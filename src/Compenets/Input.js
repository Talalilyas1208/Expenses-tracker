
import { Input } from "antd";


export default function InputField(props) {
 

   const {type,placeholder} = props ;
return(

   <Input
            type=
            {type}
            placeholder={placeholder}
     
          />

)


}