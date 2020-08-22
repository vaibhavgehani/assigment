import React from 'react'

export default function SearchView(props) {
    const {groupedData,handleCheck,changeText} = props;
    return (<div>
            <input onChange={changeText}/>
            <br/>
            <input type="checkbox" onChange={handleCheck}/> Show only stocked Data
            {groupedData.map((item,i) =>( 
                    <div style={{marginTop:20}} key={i}>
                        <div>{item.category}</div>
                        {item.groupItem.map((item1,i1)=>(
                            <div style={{display:"flex",flexDirection:'row'}} key={i1}>
                                <div style={{marginRight:10,color:item1.stocked? 'black':'red'}}>{item1.name}</div>
                                <div>{item1.price}</div>
                            </div>
                        ))}
                    </div>
            ))}
        </div>)
}
