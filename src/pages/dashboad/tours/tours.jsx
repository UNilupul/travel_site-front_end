import React, { useEffect, useState } from 'react';
import './tours.css';
import axios from 'axios';
import Delete from '../../../assets/icons/delete.png'
import TourEdite from '../edite tour/tourEdite';

export default function Tours()  {
  //head data
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const[distance, setDistance] =useState('');



  
const [dayData, setDayData] =useState([
  {day:1 ,
    startdescription:'',
    luxury:'',
    semiluxury:'',
   places:[]
  }
])


const[dayDataIndex, setDayDataIndex] = useState(0)
const[searchData, setSearchData] = useState([])

//add day
const AddDay =()=>{

  const newData = [...dayData]
  newData.push({day:newData.length+1,startdescription:'',luxury:'',semiluxury:'',places:[]})
  setDayData(newData)

}


//set data index
const setDayDataIndexFunc =(index)=>()=>{
  // console.log(index);
  setDayDataIndex(index)
}

//search bar
const SearchHandler =async(e)=>{
  console.log(e.target.value);
  if(e.target.value!==""){
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/placesearch/${e.target.value}`)
    // console.log(res.data.data);
    setSearchData(res.data.data)
  }else{
    setSearchData([])
  }
}


//add places to a day
const SelectPlace =(place_name,placeId)=>()=>{
  // console.log(place_name, placeId);
  const newDayData = [...dayData]
  newDayData[dayDataIndex].places.push({placeName:place_name,placeId:placeId,description_place:''})
  setDayData(newDayData)
  // console.log(newDayData[dayDataIndex].places)
  setSearchData([])

}


const DayStartDescription =(e)=>{
  
  const newDayData = [...dayData]
  newDayData[dayDataIndex].startdescription= e.target.value
  setDayData(newDayData)
}
//delete place  
const DeletePlace =(index)=>()=>{
  const newDayData = [...dayData]
  newDayData[dayDataIndex].places.splice(index,1)
  setDayData(newDayData)
  
  
}

const Submit =async()=>{
 
  const formData = new FormData();
  formData.append('packageName', name);
  formData.append('description', description);
  formData.append('file', image);
  formData.append('price', price);
  formData.append('distance', distance);
  formData.append('dayData', JSON.stringify(dayData));
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tour/addTourCategory`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${token}`,
      },
    });
    if (res.status === 200) {
      window.alert("added successfully");
      window.location.reload()
      
    }
  } catch (error) {
    if(error.response.status === 401){
      sessionStorage.clear();
      window.alert("You are not authorized to perform this action");
    }else if(error.response.status === 400){
      window.alert("All fields are required");
    }else if(error.response.status === 500){
      window.alert("Internal server error");
    }else{
      window.alert("Error adding place");
    }
  }

  
}



//get hotels
const[luxaryHotels,setLuxuryHotels] = useState([])
const GetLuxuryHotels = async()=>{
  const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/luxury`)
  // console.log(res.data)
  setLuxuryHotels(res.data)

}
const[semiluxuryHotels,setSemiluxuryHotels]  =useState([])
const GetSemiluxuryHotels = async() =>{
  const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/semi`)
  // console.log(res.data)
  setSemiluxuryHotels(res.data)
}
useEffect(()=>{
  GetLuxuryHotels()
  GetSemiluxuryHotels()
},[])

//set hotels
const LuxuryHandler =(e) =>{
  // console.log(e.target.value);
  const newdata = [...dayData]
  newdata[dayDataIndex].luxury = e.target.value
  setDayData(newdata)
}

const SemiluxuryHandler = (e) =>{
  // console.log(e);
  const newdata = [...dayData]
  newdata[dayDataIndex].semiluxury = e.target.value
  setDayData(newdata)

}


const PlaceDescription =(e,index)=>{
  const newDayData = [...dayData]
  newDayData[dayDataIndex].places[index].description_place = e.target.value
  setDayData(newDayData)
  // console.log(newDayData)
}



return (
  <>
  
  <div className='dashboard-tour'>
    <h1>TOUR</h1>
    <div className='dashboard-tour-underline'></div>
      <div className='dashboard-tour-sub'>
    <div className='tour-package-main-1'>
      <div className='dashboard-tour-form'>
        <label>tour name:</label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className='dashboard-tour-form'>
        <label>description:</label>
        <textarea type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/> 
      </div>
      <div className='dashboard-tour-form'>
        <label>image:</label>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
      </div>
      
      {/* <div className='dashboard-tour-form'>
        <label>price without hire and hotel:</label>
        <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} />
      </div> */}
      <div className='dashboard-tour-form'>
        <label>distance:</label>
        <input type="number" value={distance} onChange={(e)=>setDistance(e.target.value)} />
      </div>
    </div>

    <div className='tour-package-main-2'>
      <div className='tour-package-days-div'>
        {dayData.map((item,index)=>{
          return(
            <a key={index} className={index===dayDataIndex ? 'day-active':'day'} onClick={setDayDataIndexFunc(index) }>day {index+1}</a>
          )
        })}
        
        <a className='day' onClick={AddDay} >
          add +
        </a>
      </div>
      <div className='tour-package-place-div'>
        


        <h2 className='tour-places-hotel-title'>add day {dayDataIndex+1} hotels</h2>
        <div className='tour-places-hotel-div'>
          <div>
            <label>5 star hotel :</label>
            <select onChange={(e)=>LuxuryHandler(e)} className='tour-places-hotel-select'>
            <option>select hotel</option>
              {luxaryHotels.map((hotel,index)=>{
                return(
                  
                  <option key={index} value={hotel.hotel_id}>{hotel.hotel_name}</option>
                )
              
              })}

            </select>

          </div>
          <div>
            <label>3star/4star hotel :</label>
            <select onChange={(e)=>SemiluxuryHandler(e)} className='tour-places-hotel-select'>
            <option>select hotel</option>
              {semiluxuryHotels.map((hotel,index)=>{
                return(
                  
                  <option key={index} value={hotel.hotel_id}>{hotel.hotel_name}</option>
                )
              
              })}

            </select>
          </div>
        </div>




        <h2 className='tour-places-header2'>add day {dayDataIndex+1} places</h2>
        <div className='tour-package-search-div'>

        <div className='tour-package-place-search-div'>
          <div>
          <label>search place : </label>
          <input type="text" onChange={(e)=>SearchHandler(e)}/>

          </div>
          
          <div className='tour-package-place-results'>
          {searchData.map((place,index)=>{
          return(
              <a className='tour-package-place-result' key={index} onClick={SelectPlace(place.place_name,place.place_id)}>{place.place_name}</a>
          )
          })}
          </div>
        </div>

        

        </div>
        
        

        <h2  className='tour-places-header2'>selected places</h2>
        
        <div className='tour-places-day-description-div'>
          <label>day {dayDataIndex+1} start description : </label>
          <textarea className='tour-places-day-description-input' type="text" onChange={(e)=>DayStartDescription(e)} value={dayData[dayDataIndex].startdescription}/>

        
        </div>
        {dayData[dayDataIndex].places.map((item,index)=>{
          return(
            <div className='day-tour-place-div' key={index}>
              <div className='day-tour-place-div-sub1'>
                <p  className='day-tour-place-div-p'>{item.placeName}</p><img src={Delete} className='place-delete-img' onClick={DeletePlace(index)}/>
              </div>
              
              <textarea className='day-tour-place-div-input'  onChange={(e)=>PlaceDescription(e,index)} value={dayData[dayDataIndex].places[index].description_place} placeholder='description'/>
            </div>
        )}
        )}
        
      </div>
    </div>
    <a className='tour-btn' onClick={Submit}>Add Tour</a>
  </div>

  </div>
  <TourEdite/>
  </>

);
}
