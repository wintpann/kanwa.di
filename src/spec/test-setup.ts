export type FirstService = {
  first: () => number;
};

export type SecondService = {
  second: () => number;
};

export type ThirdService = {
  third: () => number;
};

export type ServiceRef = {
  firstService: FirstService[];
  secondService: SecondService[];
  thirdService: ThirdService[];
  altered: {
    firstService: FirstService[];
    secondService: SecondService[];
    thirdService: ThirdService[];
  }
};

export const emptyServiceRef = (): ServiceRef => ({
  firstService: [],
  secondService: [],
  thirdService: [],
  altered: {
    firstService: [],
    secondService: [],
    thirdService: [],
  }
});

export const expectInstancesShallowMatch = <T>(instances: T[]) => {
  const size = new Set(instances).size;
  expect(size).toEqual(1);
};
