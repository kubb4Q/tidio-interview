import React from 'react';
import { render, screen, waitFor, cleanup, fireEvent, within } from '@testing-library/react';
import { ContactsList } from './ContactsList';
import * as api from 'infrastructure/persistence/api';
import { PersonDto } from 'types/Person';
import { toast } from 'react-toastify';

const mockedPersonDto: PersonDto = {
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

describe('ContactList', () => {
  test('should call fetch data from api on mount', async () => {
    const apiDataMock = jest.spyOn(api, 'apiData');

    render(<ContactsList />);

    await waitFor(() => {
      expect(apiDataMock).toBeCalled();
    });
  });

  test('should return 2 personInfo objects when no error', async () => {
    jest
      .spyOn(api, 'apiData')
      .mockResolvedValue([mockedPersonDto, { ...mockedPersonDto, id: '2' }]);

    render(<ContactsList />);

    await waitFor(() => {
      expect(screen.getAllByTestId('person-info').length).toBe(2);
    });
  });

  test('should call apiData 2 times when click load more button', async () => {
    const apiDataMock = jest.spyOn(api, 'apiData');

    const { getByRole } = render(<ContactsList />);

    await waitFor(() => {
      getByRole('button');
    });

    const button = getByRole('button');
    fireEvent.click(button);

    expect(apiDataMock).toBeCalledTimes(2);
  });

  test('should be added to list when click load more button new data', async () => {
    const firstData = [mockedPersonDto];
    const secondData = [
      {
        ...mockedPersonDto,
        id: '2'
      }
    ];
    jest.spyOn(api, 'apiData').mockResolvedValueOnce(firstData).mockResolvedValueOnce(secondData);

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

  test('should call toast.error when call fetch data throws error', async () => {
    jest.spyOn(api, 'apiData').mockRejectedValue({});
    const toastSpy = jest.spyOn(toast, 'error');

    render(<ContactsList />);

    await waitFor(() => {
      expect(toastSpy).toBeCalled();
    });
  });

  test('should call toast.error when call fetch data throws error', async () => {
    jest.spyOn(api, 'apiData').mockRejectedValue({});
    const toastSpy = jest.spyOn(toast, 'error');

    render(<ContactsList />);

    await waitFor(() => {
      expect(toastSpy).toBeCalled();
    });
  });

  test('should selected personInfo be placed on top of list when personInfo selected', async () => {
    const jobTitleValue = 'testingJobTitle'.toUpperCase();
    const mockedPeopleDtos: PersonDto[] = [
      mockedPersonDto,
      { ...mockedPersonDto, id: '2' },
      { ...mockedPersonDto, id: '3', jobTitle: jobTitleValue }
    ];
    jest.spyOn(api, 'apiData').mockResolvedValueOnce(mockedPeopleDtos);

    const { getAllByTestId } = render(<ContactsList />);

    const personInfos = await screen.findAllByTestId('person-info');
    fireEvent.click(personInfos[2]);

    await waitFor(() => {
      expect(within(getAllByTestId('person-info')[0]).getByText(jobTitleValue)).toBeInTheDocument();
    });
  });
});
