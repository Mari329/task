import React, { useEffect, useState } from "react";
import "./task.css";
import "antd/dist/antd.css";
import { Row, Col, Input, DatePicker, Button, Select } from "antd";
import {
  FormOutlined,
  PlusOutlined,
  FieldTimeOutlined
} from "@ant-design/icons";
import axios from "axios";
import { connect } from "react-redux";
import { storeLoginDetails } from '../redux/action'

const { Option } = Select;

function Task(props) {
  const [showDetTask, setShowDetTask] = useState(true);
  const [taskDetails, setTaskDetails] = useState({
    taskDes: "",
    date: "",
    time: "",
    assignUser: ""
  });
  const [timeArr, setTimeArr] = useState([
    "10:00am",
    "10:30am",
    "11:00am",
    "11:30am",
    "12:00pm",
    "12:30pm",
    "01:00pm",
    "01:30pm",
    "02:00pm",
    "02:30pm",
    "03:00pm",
    "03:30pm",
    "04:00pm"
  ]);
  const [assigne, setAssigne] = useState(["jack", "joe", "barry"]);

 
  function plusIconClicked() {
    setShowDetTask(!showDetTask);
  }

  function saveButtonClicked() {
   
   
     

   
  }
  useEffect(()=>{
    getAccessToken();
  },[])

  function getAccessToken() {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',   
    };
    const body ={
      'email' : 'smithcheryl@yahoo.com',
      'password' : '12345678'
    }
    axios.post('https://stage.api.sloovi.com/login',body, { headers })
      .then(response => {
        if (response.data.code === 200){
          console.log(response)
          console.log(response.data)
          getUserID(response.data.results.token)
        
        } else {
          alert(response.data.message)
        }
      }
        
        );
     
  }

  function getUserID(token) {
  console.log('token :', token);
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json',
      'Content-Type': 'application/json', 
    };
    const body ={    }

    axios.get('https://stage.api.sloovi.com/user', { headers })
      .then(response => {
        if (response.data.code === 200){
          console.log(response)
          console.log(response.data)
          props.storeLoginDetails({
            access_token: token,
            user_id: response.data.results.user_id
           })
        } else {
          alert(response.data.message)
        }
      }
        
        );
  }

  function userDropDownDisplay () {
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json',
      'Content-Type': 'application/json', 
    };
    axios.get('https://stage.api.sloovi.com/team', { headers })
      .then(response => {
        if (response.data.code === 200){
          console.log(response)
          console.log(response.data)
        } else {
          alert(response.data.message)
        }
      }
        
        );
  }

  function cancelButtonClicked() {}
  return (
    <div className="task-container">
      <Row>
        <Col span={20} className="t-8">
          Task
        </Col>
        <Col span={4} className="t-4">
          <PlusOutlined onClick={plusIconClicked} />
        </Col>
      </Row>

      {showDetTask ? (
        <Col className="task-details-row">
          <div className="mar-btm-16">
            <p style={{ textAlign: "initial", margin: "0" }}>
              Task description
            </p>
            <Input addonAfter={<FormOutlined />} defaultValue="mysite" />
          </div>
          <Row className="mar-btm-16">
            <Col span={12}>
              <p style={{ textAlign: "initial", margin: "0" }}>Date</p>
              <DatePicker style={{ width: "100%" }} />
            </Col>
            <Col span={12} className="time-col">
              <p style={{ textAlign: "initial", margin: "0" }}>Time</p>
             
              <Select defaultValue={"select one"} style={{ width: '100%' }}>
                {timeArr.map((time) => (
                  <Option value={time}>{time}</Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Col>
            <div className="mar-btm-16">
              <p style={{ textAlign: "initial", margin: "0" }}>
                Task description
              </p>
              {/* <Input defaultValue="mysite" /> */}
              <Select defaultValue={"select one"} style={{ width: "100%" }}>
                {assigne.map((user) => (
                  <Option value={user}>{user}</Option>
                ))}
              </Select>
            </div>
          </Col>
          <Col className="button-row">
            <Button type="text" onClick={cancelButtonClicked}>
              cancel
            </Button>
            <Button type="primary" onClick={saveButtonClicked}>
              save
            </Button>
          </Col>
        </Col>
      ) : null}
    </div>
  );
}

const mapStateToProps =({loginDetails})=> {
console.log('loginDetails :', loginDetails);
console.log('loginDetails :', loginDetails.access_details);
  return {
    user_id : loginDetails.access_details.user_id,
    token : loginDetails.access_details.access_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeLoginDetails: (s) => { dispatch(storeLoginDetails(s)) },
  };
};

export default connect( mapStateToProps, mapDispatchToProps) (Task);
