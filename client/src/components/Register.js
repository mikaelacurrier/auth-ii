import React, { Component } from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const initialUser = {
    username: '',
    password: ''
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: { ...initialUser},
            message: '',
         };
    }


    inputHandler = e => {
        const { name, value } = e.target;
        this.setState({ user: {...this.state.user, [name]: value} })
    }
    submitHandler = e => {
        console.log('anything');
        e.preventDefault();
        axios.post(`http://localhost:9000/api/register`, this.state.user)
            .then(res => {
                if(res.status === 200) {
                    this.setState({
                        message: 'Registration complete',
                        user: {...initialUser}
                    })
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                this.setState({
                    message: 'Registration failed',
                    user: {...initialUser}
                })
            });
    };

    render() { 
        return ( 
            <div>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="username">Username</label>
                    <input type="text"
                    id="username"
                    name="username"
                    value={this.state.username} 
                    onChange={this.inputHandler}
                    placeholder="username"/>
                    <input type="text"
                    id="password"
                    name="password"
                    value={this.state.password} 
                    onChange={this.inputHandler}
                    placeholder="password"/>
                </form>
                <button onSubmit={this.submitHandler}>Submit</button>
                { this.state.message
                ? (<h4>{this.state.message}</h4>)
                : undefined
                }
            </div>
         );
    }
}
 
export default Register;