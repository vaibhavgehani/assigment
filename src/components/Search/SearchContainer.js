import React, { Component } from 'react'
import SearchView from './SearchView'
import axios from 'axios'
export class SearchContainer extends Component {
    data = [];
    constructor(props) {
        super(props)
        this.state = {
            groupedData:[],
            original: [],
            search: []
        }
    }
    componentDidMount() {
        this.getData();
    }
    async getData() {
        const res = await axios.get('http://my-json-server.typicode.com/habilelabs/fake-products/products')
        this.state.original = res.data;
        this.data = res.data
        const groupedData = this.data.reduce((r, { category }) => {
            if (!r.some(o => o.category === category)) {
              r.push({ category, groupItem: this.data.filter(v => v.category === category) });
            }
            return r;
          }, [])
        this.setState({groupedData})
    }
    async handleCheck(e) {
        if(e.target.checked) {
            let data = this.state.groupedData;
            this.state.original.forEach((item,i)=>{
                if(!item.stocked) {
                    this.state.original.splice(i,1)
                }
            })
            data.forEach((item) => {
                item.groupItem.forEach((item1,i) => {
                    if(!item1.stocked) {
                        item.groupItem.splice(i,1)
                    }
                });
            });
            this.setState({groupedData: data})
        } else {
            this.getData();
        }
    }
    changeText(e) {
        this.state.search = [];
        this.state.original.forEach((val) => {
            let name = val.name.toLowerCase()
            if(name.startsWith(e.target.value.toLowerCase())){
                this.state.search.push(val)
            }
        })
        const groupedData = this.state.search.reduce((r, { category }) => {
            if (!r.some(o => o.category === category)) {
              r.push({ category, groupItem: this.state.search.filter(v => v.category === category) });
            }
            return r;
          }, [])
        this.setState({groupedData})
    }
    render() {
        return (
            <SearchView
                groupedData={this.state.groupedData}
                handleCheck={(e)=>{this.handleCheck(e)}}
                changeText={(e)=>{this.changeText(e)}}
            />
        )
    }
}

export default SearchContainer
