import React, { Component } from 'react'


import './ContactForm.css'

class ContactForm extends Component {

    state = {
        contactEmail: '',
        demande:''
    }

    handleChange = event => { 
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
          [name]: value    
        })
    }

    handleSubmit = event => {
        console.log(`new request from [${this.state.contactEmail}] about [${this.state.demande} !]`);
        event.preventDefault()
    }

    render() {
        return (
          <form className="contact" netlify>
            <p>
              <label>Email
                <input
                    name="contactEmail"
                    autoComplete="email"
                    type="text"
                />
              </label>
            </p>
            <p>
                <label>
                    Votre Demande:
                    <textarea name="demande" />        
                </label>
            </p>

            <p>
              <button type="submit">Envoyer votre demande</button>
            </p>
          </form>
        )
    }
}
    
/*ContactForm.propTypes = {
      guesses: PropTypes.number.isRequired,
      onStored: PropTypes.func.isRequired,
    }
*/
    
export default ContactForm