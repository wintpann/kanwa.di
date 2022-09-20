import { di as diJS } from '../lib/index';
import { DI } from '../../index';
import {
  FirstService,
  ThirdService,
  SecondService,
  emptyServiceRef,
  expectInstancesShallowMatch,
} from './test-setup';

const di = diJS as unknown as DI;

describe('di', () => {
  test('should resolve correct without dependencies', () => {
    const createFirstService = di.record(
      (): FirstService => ({
        first: () => 1,
      }),
    );

    const firstService = createFirstService();
    expect(firstService.first()).toEqual(1);
  });

  test('should resolve correct dependencies provided with key', () => {
    const createFirstService = di.record(
      (): FirstService => ({
        first: () => 1,
      }),
    );

    const createSecondService = di.record(
      di.key<FirstService>()('firstService'),
      (first): SecondService => ({
        second: () => first.first() + 1,
      }),
    );

    const createThirdService = di.record(
      di.key<SecondService>()('secondService'),
      di.key<FirstService>()('firstService'),
      (second, first): ThirdService => ({
        third: () => second.second() + first.first(),
      }),
    );

    const firstService = createFirstService();
    const secondService = createSecondService({ firstService });
    const thirdService = createThirdService({ firstService, secondService });

    expect(firstService.first()).toEqual(1);
    expect(secondService.second()).toEqual(2);
    expect(thirdService.third()).toEqual(3);
  });

  test('should resolve correct dependencies provided with default record & share created instances', () => {
    const serviceRef = emptyServiceRef();

    const firstService = di.record(di.key<number>()('unusedConstant'), (): FirstService => {
      const service = { first: () => 1 };
      serviceRef.firstService.push(service);
      return service;
    });

    const secondService = di.record(firstService, (first): SecondService => {
      const service = { second: () => first.first() + 1 };
      serviceRef.firstService.push(first);
      serviceRef.secondService.push(service);
      return service;
    });

    const thirdService = di.record(secondService, firstService, (second, first): ThirdService => {
      const service = { third: () => second.second() + first.first() };
      serviceRef.firstService.push(first);
      serviceRef.secondService.push(second);
      serviceRef.thirdService.push(service);
      return service;
    });

    expect(firstService({ unusedConstant: 1 }).first()).toEqual(1);
    expect(secondService({ unusedConstant: 1 }).second()).toEqual(2);
    expect(thirdService({ unusedConstant: 1 }).third()).toEqual(3);

    expectInstancesShallowMatch(serviceRef.firstService);
    expectInstancesShallowMatch(serviceRef.secondService);
    expectInstancesShallowMatch(serviceRef.thirdService);
  });

  test('should resolve correct dependencies provided with default record and keys & share created instances', () => {
    const serviceRef = emptyServiceRef();

    const firstService = di.record(di.key<number>()('unusedConstant'), (): FirstService => {
      const service = { first: () => 1 };
      serviceRef.firstService.push(service);
      return service;
    });

    const secondService = di.record(
      di.key<FirstService>()('firstService'),
      (first): SecondService => {
        const service = { second: () => first.first() + 1 };
        serviceRef.firstService.push(first);
        serviceRef.secondService.push(service);
        return service;
      },
    );

    const thirdService = di.record(secondService, firstService, (second, first): ThirdService => {
      const service = { third: () => second.second() + first.first() };
      serviceRef.firstService.push(first);
      serviceRef.secondService.push(second);
      serviceRef.thirdService.push(service);
      return service;
    });

    expect(firstService({ unusedConstant: 1 }).first()).toEqual(1);
    expect(
      secondService({
        firstService: firstService({ unusedConstant: 1 }),
      }).second(),
    ).toEqual(2);
    expect(
      thirdService({
        unusedConstant: 1,
        firstService: firstService({ unusedConstant: 1 }),
      }).third(),
    ).toEqual(3);

    expectInstancesShallowMatch(serviceRef.firstService);
    expectInstancesShallowMatch(serviceRef.secondService);
    expectInstancesShallowMatch(serviceRef.thirdService);
  });

  test('should resolve correct dependencies provided with altered record & share created instances', () => {
    const serviceRef = emptyServiceRef();

    const firstService = di
      .record(di.key<number>()('unusedConstant'), (): FirstService => {
        const service = { first: () => 1 };
        serviceRef.firstService.push(service);
        return service;
      })
      .alterBy('firstService');

    const secondService = di
      .record(firstService, (first): SecondService => {
        const service = { second: () => first.first() + 1 };
        serviceRef.firstService.push(first);
        serviceRef.secondService.push(service);
        return service;
      })
      .alterBy('secondService');

    const thirdService = di
      .record(secondService, firstService, (second, first): ThirdService => {
        const service = { third: () => second.second() + first.first() };
        serviceRef.firstService.push(first);
        serviceRef.secondService.push(second);
        serviceRef.thirdService.push(service);
        return service;
      })
      .alterBy('thirdService');

    expect(firstService({ unusedConstant: 1 }).first()).toEqual(1);
    expect(
      secondService({
        unusedConstant: 1,
        firstService: firstService({ unusedConstant: 1 }),
      }).second(),
    ).toEqual(2);
    expect(
      thirdService({
        unusedConstant: 1,
        firstService: firstService({ unusedConstant: 1 }),
        secondService: secondService({
          unusedConstant: 1,
          firstService: firstService({ unusedConstant: 1 }),
        }),
      }).third(),
    ).toEqual(3);

    expectInstancesShallowMatch(serviceRef.firstService);
    expectInstancesShallowMatch(serviceRef.secondService);
    expectInstancesShallowMatch(serviceRef.thirdService);
  });

  test('should actually alter record & share created instances', () => {
    const serviceRef = emptyServiceRef();

    const firstService = di
      .record(di.key<number>()('unusedConstant'), (): FirstService => {
        const service = { first: () => 1 };
        serviceRef.firstService.push(service);
        return service;
      })
      .alterBy('firstService');

    const firstServiceAltered = di.record((): FirstService => {
      const service = { first: () => 11 };
      serviceRef.altered.firstService.push(service);
      return service;
    });

    const secondService = di.record(firstService, (first): SecondService => {
      const service = { second: () => first.first() + 1 };
      serviceRef.altered.firstService.push(first);
      serviceRef.secondService.push(service);
      return service;
    });

    const thirdService = di
      .record(secondService, firstService, (second, first): ThirdService => {
        const service = { third: () => second.second() + first.first() };
        serviceRef.altered.firstService.push(first);
        serviceRef.secondService.push(second);
        serviceRef.thirdService.push(service);
        return service;
      })
      .alterBy('thirdService');

    thirdService({ unusedConstant: 1, firstService: firstServiceAltered() });

    expect(serviceRef.firstService.length).toEqual(0);
    expectInstancesShallowMatch(serviceRef.altered.firstService);
    expectInstancesShallowMatch(serviceRef.secondService);
    expectInstancesShallowMatch(serviceRef.thirdService);
    expect(firstServiceAltered.instance !== firstService.instance).toEqual(true);
  });
});
