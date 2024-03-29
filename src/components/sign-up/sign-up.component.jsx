import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';


import './sign-up.styles.scss';


class SignUp extends React.Component {
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async e => {
      e.preventDefault();
      const { signUpStart} = this.props;
      const { displayName, email, password, confirmPassword } = this.state;

      if(password !== confirmPassword){
          alert('passowrds don\'t match');
          return;
      }
      signUpStart({ displayName, email, password })
    };

    handleChange = e => {
        const {name, value } = e.target;

        this.setState({[name]: value})
    }

    render(){
        const { displayName, email, password, confirmPassword } = this.state;


        return(
            <div className='sign-up'>
              <h2 className='title'>I do not have an account</h2>
              <span>Sign up with your email and password</span>
              <form className='sign-up-form' onSubmit={this.handleSubmit}>
                <FormInput
                  type='text'
                  name='displayName'
                  value={displayName}
                  onChange={this.handleChange}
                  label='Display Name'
                  required
                  >
                  </FormInput>
                  <FormInput
                  type='email'
                  name='email'
                  value={email}
                  onChange={this.handleChange}
                  label='Email'
                  required
                  >
                  </FormInput>
                  <FormInput
                  type='password'
                  name='password'
                  value={password}
                  onChange={this.handleChange}
                  label='Password'
                  required
                  >
                  </FormInput>
                  <FormInput
                  type='password'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={this.handleChange}
                  label='Confirm Password'
                  required
                  >
                  </FormInput>
                  <CustomButton 
                    type="submit">SIGN UP
                  </CustomButton>
                  
              </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);