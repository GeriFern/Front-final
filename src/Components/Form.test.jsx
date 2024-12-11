import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextProvider } from './utils/global.context';
import Form from './Form';

// Mock global alert
global.alert = vi.fn();

const TestWrapper = () => (
  <ContextProvider>
    <Form />
  </ContextProvider>
);

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("<Form />", () => {
  test("Debe renderizar el formulario correctamente", () => {
    render(<TestWrapper />);
    expect(screen.getByTestId("name-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  test("Debe mostrar errores con inputs inválidos", async () => {
    render(<TestWrapper />);
    const user = userEvent.setup();

    const inputName = screen.getByTestId("name-input");
    const inputEmail = screen.getByTestId("email-input");
    const inputMessage = screen.getByTestId("message-input");
    const buttonSubmit = screen.getByTestId("submit-button");

    await act(async () => {
      await user.type(inputName, "Jon");
      await user.type(inputEmail, "correo-invalido");
      await user.type(inputMessage, "Corto");
      await user.click(buttonSubmit);
    });

    await waitFor(() => {
      expect(screen.queryByTestId("name-error")).toBeInTheDocument();
      expect(screen.queryByTestId("email-error")).toBeInTheDocument();
      expect(screen.queryByTestId("message-error")).toBeInTheDocument();
    });
  });

  test("Debe limpiar errores al corregir los inputs", async () => {
    render(<TestWrapper />);
    const user = userEvent.setup();

    const inputName = screen.getByTestId("name-input");
    const inputEmail = screen.getByTestId("email-input");
    const inputMessage = screen.getByTestId("message-input");
    const buttonSubmit = screen.getByTestId("submit-button");

    await act(async () => {
      await user.type(inputName, "Jon");
      await user.type(inputEmail, "correo-invalido");
      await user.type(inputMessage, "Corto");
      await user.click(buttonSubmit);
    });

    await waitFor(() => {
      expect(screen.queryByTestId("name-error")).toBeInTheDocument();
      expect(screen.queryByTestId("email-error")).toBeInTheDocument();
      expect(screen.queryByTestId("message-error")).toBeInTheDocument();
    });

    await act(async () => {
      await user.clear(inputName);
      await user.type(inputName, "Jonathan");
      await user.clear(inputEmail);
      await user.type(inputEmail, "correo@valido.com");
      await user.clear(inputMessage);
      await user.type(inputMessage, "Mensaje largo y válido");
    });

    await waitFor(() => {
      expect(screen.queryByTestId("name-error")).not.toBeInTheDocument();
      expect(screen.queryByTestId("email-error")).not.toBeInTheDocument();
      expect(screen.queryByTestId("message-error")).not.toBeInTheDocument();
    });
  });
});
