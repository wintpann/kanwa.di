import { di } from '../index';













//
// type Logger = {
//   log: (message: string) => void;
// };
//
// type HTTPClient = {
//   request<T>(data: T, ms: number): Promise<T>;
// };
//
// type User = {
//   name: string;
// };
//
// type UserAPI = {
//   getCurrentUser: () => Promise<User>;
// };
//
// type UserService = {
//   startSession: () => Promise<User>;
// };
//
// {
//   const logger = di.record(
//     (): Logger => ({
//       log: (message: string) => console.log(message),
//     }),
//   );
//
//   const httpClient = di.record(
//     di.key<string>()('apiURL'),
//     logger,
//     (apiURL, logger): HTTPClient => ({
//       request: <T>(data: T, ms: number) => {
//         logger.log(`making request to ${apiURL}`);
//         return new Promise((resolve) => setTimeout(() => resolve(data as any), ms));
//       },
//     }),
//   );
//
//   const userApi = di.record(
//     httpClient,
//     logger,
//     (httpClient, logger): UserAPI => ({
//       getCurrentUser: () => {
//         logger.log('requesting user');
//         return httpClient.request({ name: 'John' }, 10);
//       },
//     }),
//   );
//
//   const userService = di.record(
//     userApi,
//     logger,
//     (userApi, logger): UserService => ({
//       startSession: async () => {
//         logger.log('recreating session');
//         return await userApi.getCurrentUser();
//       },
//     }),
//   );
//
//   const userServiceResolved = userService({ apiURL: 'localhost' });
// }
//
// {
//   const createLogger = di.record(
//     (): Logger => ({
//       log: (message: string) => console.log(message),
//     }),
//   );
//
//   const createHttpClient = di.record(
//     di.key<string>()('apiURL'),
//     di.key<Logger>()('logger'),
//     (apiURL, logger): HTTPClient => ({
//       request: <T>(data: T, ms: number) => {
//         logger.log(`making request to ${apiURL}`);
//         return new Promise((resolve) => setTimeout(() => resolve(data as any), ms));
//       },
//     }),
//   );
//
//   const createUserApi = di.record(
//     di.key<HTTPClient>()('httpClient'),
//     di.key<Logger>()('logger'),
//     (httpClient, logger): UserAPI => ({
//       getCurrentUser: () => {
//         logger.log('requesting user');
//         return httpClient.request({ name: 'John' }, 10);
//       },
//     }),
//   );
//
//   const createUserService = di.record(
//     di.key<UserAPI>()('userApi'),
//     di.key<Logger>()('logger'),
//     (userApi, logger): UserService => ({
//       startSession: async () => {
//         logger.log('recreating session');
//         return await userApi.getCurrentUser();
//       },
//     }),
//   );
//
//   const logger = createLogger();
//   const httpClient = createHttpClient({ apiURL: 'localhost', logger });
//   const userApi = createUserApi({ httpClient, logger });
//   const userService = createUserService({ userApi, logger });
// }
//
// {
//   const logger = di
//     .record(
//       (): Logger => ({
//         log: (message: string) => console.log(message),
//       }),
//     )
//     .alterBy('logger');
//
//   const httpClient = di
//     .record(
//       di.key<string>()('apiURL'),
//       logger,
//       (apiURL, logger): HTTPClient => ({
//         request: <T>(data: T, ms: number) => {
//           logger.log(`making request to ${apiURL}`);
//           return new Promise((resolve) => setTimeout(() => resolve(data as any), ms));
//         },
//       }),
//     )
//     .alterBy('httpClient');
//
//   const userApi = di
//     .record(
//       httpClient,
//       logger,
//       (httpClient, logger): UserAPI => ({
//         getCurrentUser: () => {
//           logger.log('requesting user');
//           return httpClient.request({ name: 'John' }, 10);
//         },
//       }),
//     )
//     .alterBy('userApi');
//
//   const userService = di
//     .record(
//       userApi,
//       logger,
//       (userApi, logger): UserService => ({
//         startSession: async () => {
//           logger.log('recreating session');
//           return await userApi.getCurrentUser();
//         },
//       }),
//     )
//     .alterBy('userService');
//
//   const fakeLogger: Logger = {
//     log: (message: string) => console.error(message),
//   };
//
//   const userServiceResolved = userService({ apiURL: 'localhost', logger: fakeLogger });
// }
