export const testAction = (payload) => ({
  type: 'TEST',
  payload,
});

export const testActionDone = (payload) => ({
  type: 'TEST_DONE',
  payload,
});
