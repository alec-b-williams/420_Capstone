import React from 'react'
import './SKUForm.css';

function SKUForm(props) {
    return (props.trigger) ? (
        <div className="pop-up">
            <div className="popup-inner">
                <form id="sku selection"> </form>
                <button className="close-btn">x</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default SKUForm
