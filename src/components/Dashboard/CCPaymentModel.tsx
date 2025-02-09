import { useState } from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    onSubmit({ address, amount });
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyles}>
      <div style={modalStyles}>
        <h2>Enter Address and Amount</h2>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            style={inputStyles}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            style={inputStyles}
          />
        </div>
        <button onClick={handleSubmit} style={buttonStyles}>Submit</button>
        <button onClick={onClose} style={buttonStyles}>Close</button>
      </div>
    </div>
  );
};

const modalOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  width: '300px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const inputStyles = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const buttonStyles = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px', // space between buttons
};

export default Modal;
