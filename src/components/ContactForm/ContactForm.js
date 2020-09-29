import React, { Component } from 'react'
import { Field, Control, Label, Input, Textarea } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import './ContactForm.css'

class ContactForm extends Component {

    state = {
        email: '',
        message:''
    }

    onChange = (evt) => {
      const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
      this.setState({
        [evt.target.name]: value,
      });
    }

    render() {
        const {email, message} = this.state
          
        return (
          
          <form className="contact" action="/thank-you" netlify>
              <Field>
                <Label>Email</Label>
                  <Control>
                    <Input name="email" type="email" placeholder="your-email@domain.ext" value={email} onChange={this.onChange} />
                  </Control>
              </Field>

              <Field>
                <Label>Message</Label>
                <Control>
                  <Textarea name="message" value={message} onChange={this.onChange} placeholder="Votre message..." />
                </Control>
              </Field>

              <Field kind="group">
                <Control>
                  <Button type="primary">Envoyer</Button>
                </Control>
                <Control>
                  <Button color="link">Annuler</Button>
                </Control>
              </Field>
          </form>
        )
    }
}
        
export default ContactForm