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
          <form className="contactForm" onSubmit={this.handleSubmit}>
            <p>
              <label>
                  Email
                <input
                    name="contactEmail"
                  autoComplete="email"
                  type="text"
                  value={this.state.contactEmail}
                  onChange={this.handleChange}
                />
              </label>
            </p>
            <p>
                <label>
                    Votre Demande:
                    <textarea name="demande" value={this.state.demande} onChange={this.handleChange} />        
                </label>
            </p>

            <p>
              <button class="disabled" disabled type="submit">Envoyer votre demande</button>
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