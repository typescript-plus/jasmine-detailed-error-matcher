// tslint:disable-next-line:no-implicit-dependencies
import { BuiltinClass } from '@typescript-plus/builtin-class-decorator';
import { detailedErrorMatcherFactories } from '../src';

// tslint:disable-next-line:no-unbound-method
const compare = detailedErrorMatcherFactories.toThrowDetailedError(jasmine.matchersUtil, []).compare;

@BuiltinClass()
class TestError extends Error {}

describe(__filename, () => {
  it('succeeds with a type.', () => {
    const result = compare(
      () => {
        throw new TestError();
      },
      TestError,
      () => {
        //
      }
    );
    expect(result.message).toBeUndefined();
    expect(result.pass).toBe(true);
  });

  it('succeeds without a type.', () => {
    const result = compare(
      () => {
        throw new TestError();
      },
      undefined,
      () => {
        //
      }
    );
    expect(result.message).toBeUndefined();
    expect(result.pass).toBe(true);
  });

  it('fails with a type.', () => {
    const actual = () => {
      throw new Error();
    };
    const result = compare(actual, TestError, () => {
      //
    });
    expect(result.message).toEqual(`Expected ${actual} to throw ${TestError}.`);
    expect(result.pass).toBe(false);
  });

  it('fails without a type.', () => {
    const actual = () => {
      //
    };
    const result = compare(actual, undefined, () => {
      //
    });
    expect(result.message).toEqual(`Expected ${actual} to throw ${Error}.`);
    expect(result.pass).toBe(false);
  });

  it('calls a callback.', () => {
    const error = new TestError();
    let arg: any;
    compare(
      () => {
        throw error;
      },
      undefined,
      (arg0: any) => {
        arg = arg0;
      }
    );
    expect(arg).toBe(error);
  });
});
