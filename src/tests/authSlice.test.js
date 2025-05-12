import authReducer, { setToken, clearToken } from '../features/auth/authSlice';

describe('authSlice', () => {
  const initialState = {
    token: null,
    isLoading: false,
    error: null,
    expiresAt: null,
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setToken', () => {
    const actual = authReducer(
      initialState,
      setToken({ token: 'test-token', expiresAt: 1234567890 })
    );
    expect(actual.token).toEqual('test-token');
    expect(actual.expiresAt).toEqual(1234567890);
    expect(actual.error).toBeNull();
  });

  it('should handle clearToken', () => {
    const stateWithToken = {
      ...initialState,
      token: 'test-token',
      expiresAt: 1234567890,
    };
    const actual = authReducer(stateWithToken, clearToken());
    expect(actual.token).toBeNull();
    expect(actual.expiresAt).toBeNull();
  });
});