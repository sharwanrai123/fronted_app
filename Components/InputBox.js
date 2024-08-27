import React, { useState } from 'react'
import Style from './registration.module.css';
import DeleteIcon from '@mui/icons-material/Delete';

const InputBox=()=> {
    const [user,setUser]=useState({});
    const onHandleChange=(e)=>{
console.log(e.target.value)
    }
    const addInputFile=()=>{
        console.log("first")
    }
  return (
    <div className={Style.fielddiv}>
    <div><div className={Style.labeldiv}><label className={Style.Label}>File name</label></div><div><input onChange={(e)=>onHandleChange(e)} type='text' name="file_name" className={Style.inputfile}></input></div></div>
    <div><div className={Style.labeldiv}><label className={Style.Label}>Type of File</label></div><div>
    <select
        id="file_type"
        name="file_type"
        className={Style.inputfile}
        onChange={(e)=>onHandleChange(e)}
      >
        <option value="">--Select File Type--</option>
        <option value="pdf">PDF</option>
        <option value="jpg">JPG</option>
      </select>
        </div></div>
        <div><div className={Style.labeldiv}><label className={Style.Label}>Upload Document</label></div><div>
            <input type="file" id="file-upload" onChange={(e)=>onHandleChange(e)} className={Style.file_upload_input}/>
              </div></div>
    <div><div className={Style.Addicon}><button className={Style.btnaddi} onClick={addInputFile}><DeleteIcon/></button></div></div>
  </div>
  )
}

export default InputBox