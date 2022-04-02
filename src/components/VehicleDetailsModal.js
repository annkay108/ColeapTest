import React from 'react'
import Modal from 'react-modal'

import { customStyles } from './consts'

const VehicleDetailsModal = ({modalIsOpen, closeModal, selectedVehicleData}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel='Details'
      style={customStyles}
    >
      <h2>
        Car Details
      </h2>
      <div>
        <div>Brand: {selectedVehicleData.make}</div>
        <div>Model: {selectedVehicleData.model}</div>
        <div>Price: {selectedVehicleData.price}</div>
        <div>
          Available Colors: 
          {selectedVehicleData?.colors.map((color, index)=>(<span key={`${index}-color`}>{` ${color} `}</span>))}
        </div>
        <div>
          Range: {`${selectedVehicleData?.range?.distance} ${selectedVehicleData?.range?.unit}`}
        </div>
      </div>
      <button className='btn mt-3' onClick={closeModal}>Close</button>
    </Modal>
  )
}

export default VehicleDetailsModal