import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../../components/forms/RegisterForm";
beforeEach(() => {
  localStorage.clear();
});

describe("RegisterForm component", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-01"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should have empty fields and the submit button should be disabled initially", async () => {
    render(<RegisterForm />);
    const submitButton = await screen.findByTestId("submit-button");
    expect(submitButton).toBeDisabled();
  });

  it("should set isFormReady to true when all fields are filled", () => {
    render(<RegisterForm />);

    const emailInput = screen.getByTestId("email-input");
    const firstNameInput = screen.getByTestId("first-name-input");
    const lastNameInput = screen.getByTestId("last-name-input");
    const cityInput = screen.getByTestId("city-input");
    const postalCodeInput = screen.getByTestId("postal-code-input");
    const birthDateInput = screen.getByTestId("birth-date-input");

    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(cityInput, { target: { value: "City" } });
    fireEvent.change(postalCodeInput, { target: { value: "12345" } });
    fireEvent.change(birthDateInput, { target: { value: "2000-01-01" } });

    expect(screen.getByTestId("submit-button")).not.toBeDisabled();
  });

  it("should set isFormReady to false if any field is empty", () => {
    render(<RegisterForm />);

    const emailInput = screen.getByTestId("email-input");
    const firstNameInput = screen.getByTestId("first-name-input");
    const lastNameInput = screen.getByTestId("last-name-input");
    const cityInput = screen.getByTestId("city-input");
    const postalCodeInput = screen.getByTestId("postal-code-input");

    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(cityInput, { target: { value: "" } }); // Empty city
    fireEvent.change(postalCodeInput, { target: { value: "12345" } });

    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  it("should display validation errors for invalid inputs", async () => {
    render(<RegisterForm />);

    const emailInput = screen.getByTestId("email-input");
    const firstNameInput = screen.getByTestId("first-name-input");
    const lastNameInput = screen.getByTestId("last-name-input");
    const cityInput = screen.getByTestId("city-input");
    const postalCodeInput = screen.getByTestId("postal-code-input");
    const birthDateInput = screen.getByTestId("birth-date-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(emailInput, { target: { value: "john.doe@testcom" } });
    fireEvent.change(firstNameInput, { target: { value: "John123" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe@" } });
    fireEvent.change(cityInput, { target: { value: "City!" } });
    fireEvent.change(postalCodeInput, { target: { value: "123" } });
    fireEvent.change(birthDateInput, { target: { value: "2005-01-01" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("email-error")).toHaveTextContent(
        "Email is not valid."
      );
    });
    await waitFor(() => {
      expect(screen.getByTestId("first-name-error")).toHaveTextContent(
        "First name must not contain special characters or numbers."
      );
    });
    await waitFor(() => {
      expect(screen.getByTestId("last-name-error")).toHaveTextContent(
        "Last name must not contain special characters or numbers."
      );
    });
    await waitFor(() => {
      expect(screen.getByTestId("city-error")).toHaveTextContent(
        "City name must not contain special characters or numbers."
      );
    });
    await waitFor(() => {
      expect(screen.getByTestId("postal-code-error")).toHaveTextContent(
        "Postal code must be exactly 5 digits."
      );
    });
  });

  it("should enable the submit button when all fields are valid", async () => {
    render(<RegisterForm />);

    const emailInput = screen.getByTestId("email-input");
    const firstNameInput = screen.getByTestId("first-name-input");
    const lastNameInput = screen.getByTestId("last-name-input");
    const cityInput = screen.getByTestId("city-input");
    const postalCodeInput = screen.getByTestId("postal-code-input");
    const birthDateInput = screen.getByTestId("birth-date-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(cityInput, { target: { value: "City" } });
    fireEvent.change(postalCodeInput, { target: { value: "12345" } });
    fireEvent.change(birthDateInput, { target: { value: "2000-01-01" } });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("should submit the form and display success message", async () => {
    render(<RegisterForm />);

    const emailInput = screen.getByTestId("email-input");
    const firstNameInput = screen.getByTestId("first-name-input");
    const lastNameInput = screen.getByTestId("last-name-input");
    const cityInput = screen.getByTestId("city-input");
    const postalCodeInput = screen.getByTestId("postal-code-input");
    const birthDateInput = screen.getByTestId("birth-date-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(cityInput, { target: { value: "City" } });
    fireEvent.change(postalCodeInput, { target: { value: "12345" } });
    fireEvent.change(birthDateInput, { target: { value: "2000-01-01" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Form submitted successfully!")
      ).toBeInTheDocument();
    });
  });

  it("should save the data to localStorage on successful form submission", async () => {
    render(<RegisterForm />);

    const emailInput = screen.getByTestId("email-input");
    const firstNameInput = screen.getByTestId("first-name-input");
    const lastNameInput = screen.getByTestId("last-name-input");
    const cityInput = screen.getByTestId("city-input");
    const postalCodeInput = screen.getByTestId("postal-code-input");
    const birthDateInput = screen.getByTestId("birth-date-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(cityInput, { target: { value: "Paris" } });
    fireEvent.change(postalCodeInput, { target: { value: "75001" } });
    fireEvent.change(birthDateInput, { target: { value: "2000-01-01" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const savedData = JSON.parse(localStorage.getItem("registeredUsers") || "[]");P
      expect(savedData).toHaveLength(1);
      expect(savedData[0].email).toBe("john.doe@example.com");
    });
  });
});
