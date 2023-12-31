const { getPaginatedList, setDataStorage } = require('./index');
const DataModel = require('../models');

const mockData = [
  new DataModel({ postId: 1, id: 1, name: 'Alice', email: 'alice@example.com', body: 'Hello' }),
  new DataModel({ postId: 2, id: 2, name: 'Bob', email: 'bob@example.com', body: 'World' }),
];

describe('getPaginatedList', () => {
  beforeAll(() => {
    setDataStorage(mockData);
  });

  test('should return the correct pagination structure', () => {
    const result = getPaginatedList({ limit: 1, offset: 0 });
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('data');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(result.data.length).toBe(1);
  });

  test('should apply limit and offset correctly', () => {
    const result = getPaginatedList({ limit: 1, offset: 1 });
    expect(result.data.length).toBe(1);
    expect(result.data[0]).toEqual(mockData[1]);
  });

  test('should apply sorting correctly', () => {
    const result = getPaginatedList({ sortBy: 'name', sortDirection: 'desc' });
    expect(result.data).toEqual([mockData[1], mockData[0]]);
  });

  test('should filter data correctly', () => {
    const result = getPaginatedList({ filters: { name: 'Alice' } });
    expect(result.data).toEqual([mockData[0]]);
  });

  test('should throw an error for invalid filter keys', () => {
    expect(() => {
      getPaginatedList({ filters: { invalidKey: 'value' } });
    }).toThrow('Invalid filter key: invalidKey');
  });
});
