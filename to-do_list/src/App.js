import React, { Component } from 'react'
import Plan from './Plan'
import axios from 'axios'

const ai = axios.create({
  baseURL: 'https://reactdjangotodo36.herokuapp.com/api'
})

export default class App extends Component {
  state = {
    items: [],
    text: ""
  }



  showPlan = () => {
    ai.get("/list/").then((res) => {
      // console.log(res.data)
      this.setState({ items: res.data })
    })

  }
  addPlan = (d) => {
    if (this.state.text !== "") {
      ai.post("/create/", d).then((res) => {
        this.setState({ text: '' })
        this.showPlan()
      })
    }
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value })
  }
  handleAdd = (e) => {
    // if (this.state.text !== "") {
    //   const items = [...this.state.items, this.state.text]
    //   this.setState({ items: items, text: "" })
    // }
    let dt = { item: this.state.text }
    this.addPlan(dt)
  }

  handleDelete = (id) => {
    ai.delete(`/delete/${id}`).then((res) => {
      this.showPlan()
    })



  }
  componentDidMount() {
    this.showPlan();
  }




  render() {
    return (

      <div className="container my-4 ">

        <div className="row">
          <div className="col-sm-6 mx-auto shadow-lg">
            <h1 className="text-center" >Todos List</h1>

            <div className="container">
              <div className="input-group mb-3 my-4">
                <input type="text" value={this.state.text} onChange={this.handleChange} className="form-control" placeholder="Enter list" />
                <button onClick={this.handleAdd} className="btn btn-warning mx-2 px-4" type="button" >Add</button>
              </div>
              <div className="container">

                <ul className="list-unstyled">

                  {
                    this.state.items.map((value, i) => {

                      return <Plan key={i} id={value.id} value={value.item} deletdata={this.handleDelete} />
                    })
                  }
                </ul>

              </div>
            </div>
          </div>
        </div>
      </div>









    )
  }
}
