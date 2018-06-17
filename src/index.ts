const MATCHER: jasmine.CustomMatcher = {
  compare(...args: any[]) {
    const actual = args.shift() as () => void;
    const klass = args.shift() as { new (...args: any[]): Error } | undefined;
    const callback = args.shift() as (error: Error) => void;
    try {
      actual();
      return {
        message: `Expected ${actual} to throw ${Error}.`,
        pass: false
      };
    } catch (err) {
      if (klass !== undefined && !(err instanceof klass)) {
        return {
          message: `Expected ${actual} to throw ${klass}.`,
          pass: false
        };
      }
      callback(err as Error);
      return {
        pass: true
      };
    }
  }
};

function toThrowDetailedError(util: jasmine.MatchersUtil, customEqualityTesters: jasmine.CustomEqualityTester[]) {
  return MATCHER;
}

export const detailedErrorMatcherFactories = {
  toThrowDetailedError
};
