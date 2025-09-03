import { Input, Row, Col, Typography, Spin, Button } from "antd";
import { useState } from "react";
import InputField from "./Compenets/Input";
import Selected from "./Compenets/Select";
import useFetch from "./Hooks/hookfetchdata";

const { Text } = Typography;

export default function Expense() {
  const [selectedCat, setSelectedCat] = useState(null);
  const { data, loading } = useFetch("http://localhost:8080/catg");
const handleselect  = () => {
    if (!selectedCat){

        setSelectedCat("please select the catg")
    }
}
  
  const categoryOptions =
    data?.map((cat) => ({
      value: cat.catg,
 
    })) || [];

  return (
    <>
      <h3>Expense Form</h3>

      <Row gutter={16}>
        <Col lg={12} xs={24}>
          <Text strong>Amount</Text>
          <InputField type="number" placeholder="0.00 USD" />
        </Col>
        <Col lg={12} xs={24}>
          <Text strong>Description</Text>
          <InputField placeholder="Bought a new iPhone" />
        </Col>
      </Row>
 <Text strong>Category</Text>
      <Row style={{ marginTop: "10px" }}>
        <Col lg={24} xs={24}>
          
          {loading ? (
            <Spin />
          ) : (
            <Selected
              options={categoryOptions}
              value={selectedCat}
              
              onChange={(val) => setSelectedCat(val)}
              placeholder="Select category"
            />
          )}
        </Col>
        
      </Row>
    </>
  );
}
