import React, { useState, useContext } from "react";
import { ContextGlobal } from './utils/global.context';
import './Form.css';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const { theme } = useContext(ContextGlobal);

  const validate = () => {
    const newErrors = {};

    if (name.trim().length < 5) {
      newErrors.name = "El nombre debe tener al menos 5 caracteres";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Por favor ingrese un correo electrónico válido";
    }

    if (message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert(`Gracias ${name}, te contactaremos.`);
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <h2>¿Quieres saber más?</h2>
        <p>Envíanos tus consultas y nos pondremos en contacto contigo</p>
        <h2 style={{ color: theme === 'dark' ? 'white' : 'black' }}>
          Contáctanos
        </h2>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name && e.target.value.trim().length >= 5) {
              const { name, ...rest } = errors;
              setErrors(rest);
            }
          }}
          role="name"
          data-testid="name-input"
        />
        {errors.name && (
          <p data-testid="name-error" style={{ color: 'red', fontSize: '0.8rem' }}>
            {errors.name}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (errors.email && emailRegex.test(e.target.value)) {
              const { email, ...rest } = errors;
              setErrors(rest);
            }
          }}
          role="email"
          data-testid="email-input"
        />
        {errors.email && (
          <p data-testid="email-error" style={{ color: 'red', fontSize: '0.8rem' }}>
            {errors.email}
          </p>
        )}

        <textarea
          placeholder="Su Mensaje"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message && e.target.value.trim().length >= 10) {
              const { message, ...rest } = errors;
              setErrors(rest);
            }
          }}
          role="message"
          data-testid="message-input"
        />
        {errors.message && (
          <p data-testid="message-error" style={{ color: 'red', fontSize: '0.8rem' }}>
            {errors.message}
          </p>
        )}

        <button type="submit" role="button" data-testid="submit-button">Enviar</button>
      </form>
    </div>
  );
};

export default Form;
