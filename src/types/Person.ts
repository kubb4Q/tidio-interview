export type PersonDto = {
  id: string;
  firstNameLastName: string;
  jobTitle: string;
  emailAddress: string;
};

export type Person = PersonDto & {
  initials: string;
};

export const toPerson = ({ emailAddress, firstNameLastName, id, jobTitle }: PersonDto): Person => ({
  id,
  initials: firstNameLastName
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join(''),
  firstNameLastName,
  jobTitle: jobTitle.toUpperCase(),
  emailAddress
});
