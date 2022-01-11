import React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import { PersonInfo, PersonInfoProps } from './PersonInfo';

describe('PersonInfo', () => {
  const props: PersonInfoProps = {
    data: {
      id: '1',
      initials: 'RG',
      jobTitle: 'Fabricator',
      emailAddress: 'Ron_Giles3711@dionrab.com',
      firstNameLastName: 'Ron Giles'
    }
  };

  test('display correct jobTitle', async () => {
    const { getByTestId } = render(<PersonInfo {...props} />);

    expect(within(getByTestId('person-info')).getByText(props.data.jobTitle)).toBeInTheDocument();
  });

  test('display correct emailAddress', async () => {
    const { getByTestId } = render(<PersonInfo {...props} />);

    expect(
      within(getByTestId('person-info')).getByText(props.data.emailAddress)
    ).toBeInTheDocument();
  });

  test('display correct firstNameLastName', async () => {
    const { getByTestId } = render(<PersonInfo {...props} />);

    expect(
      within(getByTestId('person-info')).getByText(props.data.firstNameLastName)
    ).toBeInTheDocument();
  });

  test('should call onClick method when click on PersonInfo', async () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(<PersonInfo {...props} onClick={mockFn} />);

    fireEvent.click(getByTestId('person-info'));

    expect(mockFn).toHaveBeenCalled();
  });
});
