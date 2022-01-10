import { PersonDto, toPerson } from './Person';

describe('Person', () => {
  const personDto: PersonDto = {
    id: '1',
    jobTitle: 'Fabricator',
    emailAddress: 'Ron_Giles3711@dionrab.com',
    firstNameLastName: 'Ron Giles Robilas Grit'
  };

  test('return Person with correct initials', () => {
    const result = toPerson(personDto);

    expect(result.initials).toEqual('RG');
  });

  test('return Person with uppercase jobtitle', () => {
    const result = toPerson(personDto);

    expect(result.jobTitle).toEqual(personDto.jobTitle.toUpperCase());
  });
});
