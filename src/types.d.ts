declare namespace jasmine {
  interface Matchers<T> {
    toThrowDetailedError<I extends Error, C extends new (...args: any[]) => I>(
      expected: C | undefined,
      callback: (error: I) => void
    ): void;
  }
}
