import './Modal.css';
import React from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ children, handleClose, isSalesModal }) {
  return ReactDOM.createPortal((
    <div className="modal-backdrop">
      <div className="modal" style={{
        border: "4px solid",
        borderColor: isSalesModal ? "#ff4500" : "#555",
        textAlign: "center",
      }}>
        {children}
        <button 
          onClick={handleClose}
          className={isSalesModal ? "sales-btn" : "close-btn"}>close</button>
      </div>
    </div>
  ), document.body);
}

// export default class Modal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       children: props.children,
//       handleClose: props.handleClose
//     }
//   }

//   render() {
//     return ReactDOM.createPortal((
//       <div className="modal-backdrop">
//         <div className="modal">
//           {this.state.children}
//           <button onClick={this.state.handleClose}>close</button>
//         </div>
//       </div>
//     ), document.body);
//   }
// }