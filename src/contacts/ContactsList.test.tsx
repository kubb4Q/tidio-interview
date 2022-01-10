import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { ContactsList } from './ContactsList';
import * as api from 'infrastructure/persistence/api';

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
    const apiDataMock = jest.spyOn(api, 'apiData').mockResolvedValue([
      {
        id: '1',
        jobTitle: 'Fabricator',
        emailAddress: 'Ron_Giles3711@dionrab.com',
        firstNameLastName: 'Ron Giles'
      },
      {
        id: '2',
        jobTitle: 'IT Support Staff',
        emailAddress: 'Melinda_Mcgregor7556@mafthy.com',
        firstNameLastName: 'Melinda Mcgregor'
      }
    ]);

    render(<ContactsList />);

    await waitFor(() => {
      expect(screen.getAllByTestId('person-info').length).toBe(2);
    });
  });
});
