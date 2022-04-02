import React, { Fragment, useEffect, useState } from 'react'
import Select from 'react-select'

import { getVehicles } from '../api'
import { DISTANCE, PRICE, sortByOptions } from './consts'
import VehicleDetailsModal from './VehicleDetailsModal'

const Vehicles = () => {
  const [vehicleData, setVehicleData] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedVehicleData, setSelectedVehicleData] = useState({})
  const [loading, setLoading] = useState(false)
  const [selectedSortByOption, setSelectedSortByOption] = useState(null)

  useEffect(()=>{
    handleGetVehicles()
  },[])

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const handleGetVehicles = async () => {
    try {
      setLoading(true)
      const res = await getVehicles()
      if (res.data){
        setVehicleData(res.data)
      }    
    } catch (error) {
      alert(error)      
    } finally{
      setLoading(false)
    }
  }

  const handleVehicleSelect = (vehicleData) => {
    setModalIsOpen(true)
    setSelectedVehicleData(vehicleData)
  }

  const handleOnSelectChange = (selectedOption) => {
    setSelectedSortByOption(selectedOption)
    handleSort(selectedOption)
  }

  const handleSort = (selectedOption)=> {
    const sortByValue = selectedOption.value
    let sortedVehicleData = [...vehicleData]
    if(sortByValue === PRICE){
      sortedVehicleData.sort((a,b)=> parseInt(a[sortByValue]) > parseInt(b[sortByValue]) ? 1 : -1)
    } else {
      sortedVehicleData.sort((a,b)=> parseInt(a[sortByValue][DISTANCE]) > parseInt(b[sortByValue]['distance']) ? 1 : -1)
    }
    setVehicleData(sortedVehicleData)
  }

  return(
    !loading ? 
    (<Fragment>
      <Select options={sortByOptions} value={selectedSortByOption} onChange={handleOnSelectChange} placeholder='Sort By'/>
      <div className='vehicle-container'>
        {vehicleData?.map((vehicle)=>(
          <div key={vehicle.id}>
            <div className='vehicle-photo' onClick={()=>handleVehicleSelect(vehicle)}>
              <img src={vehicle.photo} alt='vehicle_photo'/>
            </div>
            <div className='vehicle-details'>
              <div>Brand: {vehicle.make}</div>
              <div>Model: {vehicle.model}</div>
              <div>Price: {vehicle.price}</div>
            </div>
          </div>
        ))}
      </div>
      {modalIsOpen && <VehicleDetailsModal modalIsOpen={modalIsOpen} closeModal={closeModal} selectedVehicleData={selectedVehicleData}/>}
    </Fragment>):(
      <div>
        Loading...
      </div>
    )
  )
}
export default Vehicles