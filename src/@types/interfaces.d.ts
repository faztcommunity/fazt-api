// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

interface IPayload {
  user: {
    id: string;
  };
}

/*************************************** MODELS *****************************************/

interface ISetting extends TMongoDocument {
  name: string;
  value: string;
}

interface IModeration extends TMongoDocument {
  user_id: string;
  type: string;
  reason: string;
  moderator_id: string;
  creation_date: Date;
  expiration_date: Date;
  revoked: boolean;
}

interface IJob extends TMongoDocument {
  title: string;
  description: string;
  date: Date;
  employer: string;
  employerEmail: string;
  proposals: TMongoId[];
}

interface IProject extends TMongoDocument {
  name: string;
  description: string;
  status: TStatus;
  tags: string[];
}

interface IUser extends TMongoDocument {
  nickname: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  createdAt: Date;

  setPassword(password: string): Promise<void>;
  comparePassword(password: string): Promise<boolean>;
}

interface IWorkshop extends TMongoDocument {
  title: string;
  description: string;
  date: Date;
}
