import React, { Component } from "react";
import {
  Field,
  Control,
  Label,
  Input,
  Textarea,
} from "react-bulma-components/lib/components/form";
import Button from "react-bulma-components/lib/components/button";
import Hero from "react-bulma-components/lib/components/hero";
import Heading from "react-bulma-components/lib/components/heading";
import Container from "react-bulma-components/lib/components/container";
import "./form.css";

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class ContactForm extends Component {
  state = {
    email: "",
    message: "",
    sent: false,
  };

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  // handle submission of netlify form
  handleSubmit = (e) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state }),
    })
      .then(() => {
        this.setState({
          sent: true,
        });
      })
      .catch((error) => alert(error));

    e.preventDefault();
  };

  render() {
    if (this.state.sent) {
      return this.renderThankYou();
    } else {
      return this.renderForm();
    }
  }

  renderThankYou() {
    return (
      <Hero color="primary" gradient>
        <Hero.Body>
          <Container>
            <Heading>
              <span role="img" aria-label="book">
                📖
              </span>{" "}
              Merci pour votre message
            </Heading>
            <Heading subtitle size={5}>
              Nous vous recontacterons dès que possible.
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
    );
  }

  renderForm() {
    const { email, message } = this.state;

    return (
      <form className="contact" onSubmit={this.handleSubmit}>
        <Field>
          <Label>Email</Label>
          <Control>
            <Input
              name="email"
              type="email"
              placeholder="your-email@domain.ext"
              value={email}
              onChange={this.onChange}
            />
          </Control>
        </Field>

        <Field>
          <Label>Message</Label>
          <Control>
            <Textarea
              name="message"
              value={message}
              onChange={this.onChange}
              placeholder="Votre message..."
            />
          </Control>
        </Field>

        <Field kind="group">
          <Control>
            <Button type="primary">Envoyer</Button>
          </Control>
        </Field>
      </form>
    );
  }
}

export default ContactForm;
