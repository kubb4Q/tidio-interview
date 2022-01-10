import React from 'react';
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import { ContactsList } from './ContactsList';
import * as api from 'infrastructure/persistence/api';
import { Person } from 'types/Person';

const mockedPerson: Person = {
  id: '1',
  jobTitle: 'Fabricator',
  emailAddress: 'Ron_Giles3711@dionrab.com',
  firstNameLastName: 'Ron Giles'
};

afterEach(cleanup);

beforeEach(() => {
  jest.restoreAllMocks();
  localStorage.clear();
});

describe('ApodViewer', () => {
  test('should call fetch data from api on load', async () => {
    const apiDataMock = jest.spyOn(api, 'apiData');

    render(<ContactsList />);

    await waitFor(() => {
      expect(apiDataMock).toBeCalled();
    });
  });

  test('should return 2 personInfo objects when no error', async () => {
    const apiDataMock = jest
      .spyOn(api, 'apiData')
      .mockResolvedValue([mockedPerson, { ...mockedPerson, id: '2' }]);

    render(<ContactsList />);

    await waitFor(() => {
      expect(screen.getAllByTestId('person-info').length).toBe(2);
    });
  });

  test('when click load more button should call apiData 2 times', async () => {
    const apiDataMock = jest.spyOn(api, 'apiData');

    const { getByRole } = render(<ContactsList />);

    await waitFor(() => {
      getByRole('button');
    });

    const button = getByRole('button');
    fireEvent.click(button);

    expect(apiDataMock).toBeCalledTimes(2);
  });

  test('when click load more button new data should be added to list', async () => {
    const firstData = [mockedPerson];
    const secondData = [
      {
        ...mockedPerson,
        id: '2'
      }
    ];

    const apiDataMock = jest
      .spyOn(api, 'apiData')
      .mockResolvedValueOnce(firstData)
      .mockResolvedValueOnce(secondData);

    const { getByRole } = render(<ContactsList />);

    await waitFor(() => {
      getByRole('button');
    });

    const button = getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByTestId('person-info').length).toBe(
        firstData.length + secondData.length
      );
    });
  });
});
