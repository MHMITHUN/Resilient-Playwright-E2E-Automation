import { faker } from '@faker-js/faker';

export interface UserRegistrationData {
  title: 'Mr' | 'Mrs';
  name: string;
  email: string;
  password: string;
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export interface PaymentData {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export const generateUserData = (overrides?: Partial<UserRegistrationData>): UserRegistrationData => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const timestamp = Date.now();

  return {
    title: faker.helpers.arrayElement(['Mr', 'Mrs']),
    name: `${firstName} ${lastName}`,
    email: `test_${timestamp}_${faker.internet.email().toLowerCase()}`,
    password: 'Password123!',
    day: String(faker.number.int({ min: 1, max: 28 })),
    month: String(faker.number.int({ min: 1, max: 12 })),
    year: String(faker.number.int({ min: 1980, max: 2000 })),
    firstName,
    lastName,
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'United States',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode('#####'),
    mobileNumber: faker.phone.number({ style: 'national' }).replace(/\D/g, '').slice(0, 10).padEnd(10, '0'),
    ...overrides,
  };
};

export const generatePaymentData = (name?: string): PaymentData => {
  return {
    nameOnCard: name || faker.person.fullName(),
    cardNumber: '4111111111111111',
    cvc: '321',
    expiryMonth: '11',
    expiryYear: '2029',
  };
};

export const sampleContactData = {
  name: 'Alex Johnson',
  email: 'alex.automation@example.com',
  subject: 'Automated Inquiry regarding products',
  message: 'This is an automated test message sent via Playwright SDET Framework.',
};
