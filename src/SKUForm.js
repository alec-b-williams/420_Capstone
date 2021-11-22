import React from 'react'
import './styles/SKUForm.css';

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
