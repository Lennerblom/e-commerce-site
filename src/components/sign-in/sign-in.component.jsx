import React, { Component } from 'react';

import './sign-in.styles.scss';
import FormInput from '../../components/form-input.component/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Firebase, { signInWithgoogle } from '../../firebase/firebase.utils';

export default class SignIn extends Component {
  constructor(props){
      super(props);
      this.state = {
          email: '',
          password: ''
      }
  }
  handleSubmit = (e) => {
      e.preventDefault();

      this.setState({email: '', password: ''})
  }

  handleChange = (e) => {
      const { value, name } = e.target;

      this.setState({ [name]: value})
  }


    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                  
                  <FormInput 
                    name='email' 
                    type='email' 
                    value={this.state.email} 
                    handleChange={this.handleChange}
                    label='email'
                    required 
                    />

                  <FormInput 
                    name='password' 
                    type='password' 
                    value={this.state.password}
                    handleChange={this.handleChange} 
                    label='password'
                    required 
                    />

                <div className='buttons'>
                  <CustomButton type='submit' value='Submit Form'>Sign In</CustomButton>
                  <CustomButton onClick={signInWithgoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                </div>
                </form>
            </div>
        );
    }
}
