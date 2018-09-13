export class RouteParameters {
  readonly id: string;
  readonly detailId: string;
}

export class QueryParameters {
  readonly id: string;
  readonly statuses: string[];
}

export class UserDto {
  readonly name: string;
  readonly contact: Contact;
}

export class Contact {
  readonly emails: string[];
  readonly phoneNumber: string;
}
