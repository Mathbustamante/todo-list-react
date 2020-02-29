import React, { Component } from 'react'

class AddTodo extends Component {
    state = {
        text: ""
    }
    handleChange = (e) => {
        this.setState({
            completed: false,
            text: e.target.value,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("STATE HERE: " + this.state);
        this.props.addTodo(this.state)
        this.setState({
            text: ''
        })
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input className="inputVisibility" type="text" onChange={this.handleChange} placeholder="Add New Task" value={this.state.text}/>
                </form>
            </div>
        )
    }
}

export default AddTodo