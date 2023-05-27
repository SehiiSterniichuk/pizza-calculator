import React from 'react';
import notFound from "../../img/not-found.webp";
import ItemCounter from "./ItemCounter";
import {ToppingInfo} from "../../data/ToppingInfo";
import {OrderItemCallback} from "./OrderItemCallback";

interface Props {
    allTab: string,
    tabs: string[]
    tabToItsToppingsMap: Map<string, ToppingInfo[]>
    selectedTab: string;

    addTopping(name: ToppingInfo): void

    deleteTopping(name: ToppingInfo): void

    map: Map<string, OrderItemCallback>
}

function ToppingsSelector({allTab, tabs, tabToItsToppingsMap, selectedTab, addTopping, deleteTopping, map}: Props) {
    function containsNumber(str: string): boolean {
        const regex = /\d/;
        return regex.test(str);
    }

    const show = "topping-category-wrapper";
    const hide = "displayNone";
    const categories = tabs.filter(t => t !== allTab).map(tab => {
        return (<div className={selectedTab === tab || selectedTab === allTab ? show : hide}>
            <div className="topping-items">
                {(tabToItsToppingsMap.get(tab) || []).map(x => {
                    const name = x.name;
                    const lowerTab = tab.toLowerCase();
                    let photo: JSX.Element;
                    if (containsNumber(name)) {
                        photo = <img className="topping-select-item-img" src={notFound} alt="not found"/>;
                    } else {
                        const imagePath = `http://localhost:8080/api/v1/topping/download/${lowerTab}/${name}`;
                        photo = <img className="topping-select-item-img" src={imagePath} alt={lowerTab + " " + name}/>
                    }
                    return <div key={name} className="topping-select-item">
                        {photo}
                        <div className="topping-select-title">{name}</div>
                        <ItemCounter addTopping={() => addTopping(x)}
                                     map={map} topping={name}
                                     deleteTopping={() => deleteTopping(x)}/>
                    </div>
                })}
            </div>
            <h4 className="category-title">{tab}</h4>
        </div>);
    })
    return (
        <div className="select-toppings-section">
            {categories}
        </div>
    );
}

export default ToppingsSelector;