"use client";
import {useState} from 'react'
import Style from '../Components/registration.module.css';
import InputBox from './InputBox';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


const UserRegistration=()=>{


  const [User,setUser]=useState({
    first_name:'',
    last_name:'',
    email:'',
    dob:'',
    street1:'',
    street2:'',
    isAddressSame:'',
    p_street1:'',
    p_street2:'',
    file_name:'',
    file_type:'',
    uploaded_file:[]

  });
  const [addFileInputCount, setAddFileInputCount] = useState(0);
  const [isError, setisError] = useState(false);
  

  const onHandleChange = (e) => {
    const { name, value, type, files, checked } = e.target;


    if (type === 'checkbox') {
      // Handle checkbox input
      setUser(prevUser => ({
        ...prevUser,
        [name]: checked
      }));

      setUser(prevUser => ({
        ...prevUser,
        p_street1: prevUser.street1,
        p_street2: prevUser.street2,
      }));
    } else if (type === 'file') {
      // Handle file input
      const fileList = files; // 'files' is a FileList object
      if (fileList.length > 0) {
        const originalFile = fileList[0]; // Get the original file
        const customFileName = User.file_name || originalFile.name; // Use custom name or default to original file's name
  
        // Create a new File object with the custom name
        const renamedFile = new File([originalFile], customFileName, { type: originalFile.type });
  
        // Append the new file object to the array
        setUser(prevUser => ({
          ...prevUser,
          uploaded_file: [...prevUser.uploaded_file, renamedFile],
        }));
      }
    } else {
      // Handle other types of input
      setUser(prevUser => ({
        ...prevUser,
        [name]: value
      }));
    }
  };

 

  const addInputFile = () => {
    setAddFileInputCount(addFileInputCount + 1);
  };


  const submitForm = () => {
    if(User.first_name=='' && User.last_name=='' && User.email=='' && User.dob=='' && User.street1=='' && User.street2=='' && User.file_name=='' && User.file_type=='' && User.uploaded_file.length==0)
      {
         setisError(true);
      } 
      else{
        const formData = new FormData();

        formData.append('first_name', User.first_name);
        formData.append('last_name', User.last_name);
        formData.append('email', User.email);
        formData.append('dob', User.dob);
        formData.append('street1', User.street1);
        formData.append('street2', User.street2);
        formData.append('isAddressSame', User.isAddressSame);
        formData.append('perm_street1', User.p_street1);
        formData.append('perm_street2', User.p_street2);
        // formData.append('files', User.uploaded_file); 
    
        User.uploaded_file.forEach((file, index) => {
          formData.append('files', file);
        });
      
    
        axios.post('http://localhost:3002/User/Register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          console.log(res);
          setUser({});
          setAddFileInputCount(0);
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
        });
    
        console.log(User);
      }
   
  };



    return (
        <div className={Style.maindiv}>
          <div className={Style.fielddiv}>
            <div><div className={Style.labeldiv}><label className={Style.Label}>First name<span className={Style.requiredStar}>*</span></label></div><div><input  onChange={(e)=>onHandleChange(e)} type='text' placeholder='Enter your first name here..' name="first_name" className={Style.inputfield}></input></div></div>
            <div><div className={Style.labeldiv}><label className={Style.Label}>Last name<span className={Style.requiredStar}>*</span></label></div><div><input onChange={(e)=>onHandleChange(e)}  type='text' placeholder='Enter your last name here..' name="last_name" className={Style.inputfield}></input></div></div>
          </div>

          <div className={Style.fielddiv}>
            <div><div className={Style.labeldiv}><label className={Style.Label}>email<span className={Style.requiredStar}>*</span></label></div><div><input onChange={(e)=>onHandleChange(e)}  type='email' placeholder='ex:myname@gmail.com' name="email" className={Style.inputfield}></input></div></div>
            <div><div className={Style.labeldiv}><label className={Style.Label}>Date of Berth<span className={Style.requiredStar}>*</span></label></div><div><input onChange={(e)=>onHandleChange(e)}  type='date' placeholder='Date of Birth' name="dob" className={Style.inputfield}></input></div></div>
          </div>

          <div className={Style.fielddiv2}>Residential Address</div>
          <div className={Style.fielddiv}>
            <div><div className={Style.labeldiv}><label className={Style.Label}>Street 1<span className={Style.requiredStar}>*</span></label></div><div><input type='text' onChange={(e)=>onHandleChange(e)}  name="street1" className={Style.inputfield}></input></div></div>
            <div><div className={Style.labeldiv}><label className={Style.Label}>Street 2<span className={Style.requiredStar}>*</span></label></div><div><input type='text' onChange={(e)=>onHandleChange(e)}  name="street2" className={Style.inputfield}></input></div></div>
          </div>

          <div className={Style.fielddivcheck}><input type="checkbox" name="isAddressSame" onChange={(e)=>onHandleChange(e)} ></input>Same as  Residential address </div>

          <div className={Style.fielddiv2}>Permanent Address</div>
          <div className={Style.fielddiv}>
            <div><div className={Style.labeldiv}><label className={Style.Label}>Street 1</label></div><div><input value={User.p_street1} type='text' onChange={(e)=>onHandleChange(e)}  name="p_street1" className={Style.inputfield}></input></div></div>
            <div><div className={Style.labeldiv}><label className={Style.Label}>Street 2</label></div><div><input value={User.p_street2} type='text' onChange={(e)=>onHandleChange(e)}  name="p_street2" className={Style.inputfield}></input></div></div>
          </div>

          <div className={Style.fielddiv}>
            <div><div className={Style.labeldiv}><label className={Style.Label}>File name<span className={Style.requiredStar}>*</span></label></div><div><input onChange={(e)=>onHandleChange(e)}  type='text' name="file_name" className={Style.inputfile}></input></div></div>
            <div><div className={Style.labeldiv}><label className={Style.Label}>Type of File<span className={Style.requiredStar}>*</span></label></div><div>
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
            <div><div className={Style.labeldiv}><label className={Style.Label}>Upload Document<span className={Style.requiredStar}>*</span></label></div><div>
            <input type="file" id="file_upload1" name="uploaded_file1" className={Style.file_upload_input} onChange={(e)=>onHandleChange(e)} />
              </div></div>
              <div><div className={Style.Addicon} ><button className={Style.btnaddi} onClick={addInputFile}><AddIcon/></button></div></div>
          </div>
          {/* <InputBox/> */}
          {addFileInputCount === 0 ? (
        <></>
      ) : (
        <>
          {[...Array(addFileInputCount)].map((_, index) => (
                <div key={index} className={Style.fielddiv}>
                <div><div className={Style.labeldiv}><label className={Style.Label}>File name<span className={Style.requiredStar}>*</span></label></div><div><input  onChange={(e)=>onHandleChange(e)} type='text' name="file_name" className={Style.inputfile}></input></div></div>
                <div><div className={Style.labeldiv}><label className={Style.Label}>Type of File<span className={Style.requiredStar}>*</span></label></div><div>
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
                    <div><div className={Style.labeldiv}><label className={Style.Label}>Upload Document<span className={Style.requiredStar}>*</span></label></div><div>
                        <input type="file"  id="file_upload2"  name="uploaded_file2" onChange={(e)=>onHandleChange(e)}  className={Style.file_upload_input}/>
                          </div></div>
                <div><div className={Style.Addicon}><button className={Style.btnaddi} onClick={addInputFile}><DeleteIcon/></button></div></div>
              </div>
          ))}
        </>
      )}
        
        {
  isError?<><span className={Style.errorcode}>Please fill required filled</span></>:<></>
}
          <div className={Style.fielddiv}><div className={Style.btnSubmit}><button onClick={submitForm} className={Style.btnSub}>Submit</button></div></div>

         
          
        </div>
    )
}

export default UserRegistration
