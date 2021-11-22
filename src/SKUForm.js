import React from 'react';
import './SKUForm.css';


// <button className="close-btn" onClick={() => SKUForm.setTrigger(false)}>x</button>
function SKUForm(props) {
    return (props.trigger) ? (
        <section>
        <div className="pop-up">
            <div className="popup-inner">
                <form id="sku-selection">
                    <h1> SKU Form </h1>
                     </form>
                {props.children}
            </div>
        </div>
        </section>
    ) : "";
}

export default SKUForm;
