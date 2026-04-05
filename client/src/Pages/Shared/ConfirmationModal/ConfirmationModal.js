import React from 'react';

const ConfirmationModal = ({ title, message, modalAction, actionName, modalData, closeModal }) => {
    return (
        <div>
            <input type="checkbox" id="Confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label
                            onClick={() => modalAction(modalData)}
                            htmlFor="Confirmation-modal"
                            className="btn btn-error">
                            {actionName}
                        </label>
                        <button onClick={closeModal} className='btn btn-outline'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;