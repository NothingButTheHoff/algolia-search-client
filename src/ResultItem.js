import React from "react";

function ResultItem(props) {

    const { item } = props;

    return (
        <div className="result-item" key={item.objectID}>
            <div>
                <div className="name">{item.name}</div>
                <span className="description">{item.aroma}</span>
                <div className="price">{item.price},-</div>
                <div>{item.country}</div>
            </div>
            <div>
                <img src={item.images[1].url} alt=""/>
            </div>
        </div>
    )
}

export default ResultItem;