export default interface RegisterFormError {
  first_name?: string;
  last_name?: string;
  city?: string;
  postal_code?: string;
  email?: string;
  date_of_birth?: Date | string;
}
