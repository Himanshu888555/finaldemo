import React, { useState, useEffect } from "react";
import Axios from 'axios'

import './App.css';

function App() {

  const [show, setShow]=useState(false);
  const [firstname, setFirstName]=useState("");
  const [lastname, setLastName]=useState("");
  const [email, setEmail]=useState("");
  const [phone, setPhone]=useState("");
  const [images, setImages]=useState("");
  const [url,setUrl]=useState("");
  const [divs,setDivs]=useState(false);


  const postDetails=(e)=>{
    e.preventDefault();

    const data =new FormData() //we are uplaoding a file so we have to use formdata
    data.append("file",images)  //inside the formdata we have to append some info or data 
    data.append("upload_preset","insta-clone") //these are the cloudinary  
    data.append("cloud_name","df7pdatbh")   //this is the unique name of my login in the cloudinary
    
    fetch("https://api.cloudinary.com/v1_1/df7pdatbh/image/upload",{   //netwrok request  //cpoy the url from the coludniary API app url  //append or add   /image/upload    into the string 
          method:"post",    //we will call the method body  from above const[body,setBody]
           body:data   // we will attach the data from   const data = new FormData into the post details. for sending details 
        })
        .then(res=>res.json()) // we will send the respond 
    
        .then(data=>{
            setUrl(data.url);
            setDivs(true);
        })
        .catch(err=>{console.log(err)})   //if some error then we catch it in error
    }
  
  const Uploaddata=(e)=>{

    e.preventDefault();
    // var formData = new FormData();
    // // formData.append("Item",images);
    // formData.append("name",firstname);
    // formData.append("email",email);
    // formData.append("phone",phone);
      var data1=JSON.stringify({
        name:firstname,
        email:email,
        phone:Number(phone),
        pic:url
      })
      
      
    Axios({
      method: "post",
      headers:{
          "Content-Type":"application/json",
          "Access-Control-Allow-Origin": "*"
          },
      url:
          "/gethired",
      data:data1
      
  }) .then(function(res){
      ( res.status===200) &&
      console.log("item added");
      setShow(!show);
   }) 
  }



  return (
    <div className="container">
      {!show?<div className="card">
        <div className="head">Demo Form</div>
        <form onSubmit={Uploaddata}>
          <div className="firstrow">
            <div className="firstname">
              <label>First Name</label>
              <input type="name" pattern="[A-Za-z]{1,32}" required onChange={(e) => setFirstName(e.target.value)}></input>
            </div>
            <div className="lastname">
              <label>Last Name</label>
              <input type="name" pattern="[A-Za-z]{1,32}" required onChange={(e) => setLastName(e.target.value)}></input>
            </div>
          </div>
          <div className="secondrow">
            <div className="email">
              <label>Mail Id</label>
              <input type="email" required onChange={(e) => setEmail(e.target.value)}></input>
            </div>
          </div>
          <div className="thirdrow">
            <div className="phone">
              <label>Contact (for ex: xxxxxxxxxx)</label>
              <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required onChange={(e) => setPhone(e.target.value)}></input>
            </div>
          </div>
          <div className="fourthrow">
            <div className="image">
              <label>Upload Image</label>
              <input type="file" required multiple accept="image/*" onChange={(e) => setImages(e.target.files[0])}></input>            
              <button className="upload-button" onClick={postDetails}>
                <span>Upload</span>
              </button>
              {
                divs&&<div className="done">
                  <img src="https://img.icons8.com/bubbles/50/000000/double-tick.png"/>
                </div>
              }
            </div>
          </div>
          <div className="submit">
            <button>
              <span>Get Hired</span>
            </button>
          </div>
        </form>
      </div>:
      <div className="card">
        <div className="divider">
        <div className="back">
          <span style={{cursor:"pointer"}}onClick={()=>{window.location.reload()}}><img src="https://img.icons8.com/fluent/30/000000/reply-arrow.png"/></span>
        </div>
          <div className="profile">
            <div className="imagecard">
              <img src={url}></img>
            </div>
          </div>
          <div className="info">
            <div className="firstrow1">
              <div className="name1">
                <label>Name</label>
                  <span className="doit">{`${firstname} ${lastname}`}</span>
              </div>
            </div>
            <div className="secondrow1">
              <div className="email1">
                <label>Mail Id</label>
                <span className="doit">{`${email}`}</span>
              </div>
            </div>
            <div className="thirdrow1">
              <div className="phone1">
                <label>Contact</label>
                  <span className="doit">{`${phone}`}</span>
              </div>
            </div>
            <div className="submit1">
                <span>Congrats Hired !!</span>
            </div>
            <div className="submit">
              <span>*We have saved your response with us !!</span>
          </div>
          </div>
        </div>
      
      </div>
      }  
    </div>
  );
}

export default App;
