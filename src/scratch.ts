// @ts-nocheck

import { di } from '../index';

type Logger = {
  log: (message: string) => void;
};

type HTTPClient = {
  request<T>(data: T, ms: number): Promise<T>;
};

type User = {
  name: string;
};

type UserAPI = {
  getCurrentUser: () => Promise<User>;
};

type UserService = {
  startSession: () => Promise<User>;
};

{
  const logger = di.combine(
    (): Logger => ({
      log: (message: string) => console.log(message),
    }),
  );

  const httpClient = di.combine(
    di.key<string>()('apiURL'),
    logger,
    (apiURL, logger): HTTPClient => ({
      request: <T>(data: T, ms: number) => {
        logger.log(`making request to ${apiURL}`);
        return new Promise((resolve) => setTimeout(() => resolve(data), ms));
      },
    }),
  );

  const userApi = di.combine(
    httpClient,
    logger,
    (httpClient, logger): UserAPI => ({
      getCurrentUser: () => {
        logger.log('requesting user');
        return httpClient.request({ name: 'John' }, 10);
      },
    }),
  );

  const userService = di.combine(
    userApi,
    logger,
    (userApi, logger): UserService => ({
      startSession: async () => {
        logger.log('recreating session');
        return await userApi.getCurrentUser();
      },
    }),
  );

  const userServiceResolved = userService({ apiURL: 'localhost' });
}

{
  const createLogger = di.combine(
    (): Logger => ({
      log: (message: string) => console.log(message),
    }),
  );

  const createHttpClient = di.combine(
    di.key<string>()('apiURL'),
    di.key<Logger>()('logger'),
    (apiURL, logger): HTTPClient => ({
      request: <T>(data: T, ms: number) => {
        logger.log(`making request to ${apiURL}`);
        return new Promise((resolve) => setTimeout(() => resolve(data), ms));
      },
    }),
  );

  const createUserApi = di.combine(
    di.key<HTTPClient>()('httpClient'),
    di.key<Logger>()('logger'),
    (httpClient, logger): UserAPI => ({
      getCurrentUser: () => {
        logger.log('requesting user');
        return httpClient.request({ name: 'John' }, 10);
      },
    }),
  );

  const createUserService = di.combine(
    di.key<UserAPI>()('userApi'),
    di.key<Logger>()('logger'),
    (userApi, logger): UserService => ({
      startSession: async () => {
        logger.log('recreating session');
        return await userApi.getCurrentUser();
      },
    }),
  );

  const logger = createLogger();
  const httpClient = createHttpClient({ apiURL: 'localhost', logger });
  const userApi = createUserApi({ httpClient, logger });
  const userService = createUserService({ userApi, logger });
}

{
  const logger = di
    .combine(
      (): Logger => ({
        log: (message: string) => console.log(message),
      }),
    )
    .shift('logger');

  const httpClient = di
    .combine(
      di.key<string>()('apiURL'),
      logger,
      (apiURL, logger): HTTPClient => ({
        request: <T>(data: T, ms: number) => {
          logger.log(`making request to ${apiURL}`);
          return new Promise((resolve) => setTimeout(() => resolve(data), ms));
        },
      }),
    )
    .shift('httpClient');

  const userApi = di
    .combine(
      httpClient,
      logger,
      (httpClient, logger): UserAPI => ({
        getCurrentUser: () => {
          logger.log('requesting user');
          httpClient.request({ name: 'John' }, 10);
        },
      }),
    )
    .shift('userApi');

  const userService = di
    .combine(
      userApi,
      logger,
      (userApi, logger): UserService => ({
        startSession: async () => {
          logger.log('recreating session');
          return await userApi.getCurrentUser();
        },
      }),
    )
    .shift('userService');

  const fakeLogger: Logger = {
    log: (message: string) => console.error(message),
  };

  const userServiceResolved = userService({ apiURL: 'localhost', logger: fakeLogger });
}
