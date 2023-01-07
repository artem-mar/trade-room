/* eslint-disable no-undef */

import { getCurrentId, parseTime, getSecondsLeft } from '../utils';

test('getCurrentId', () => {
  const items = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
  expect(getCurrentId(items, '1', Date.now())).toEqual('1');
  expect(getCurrentId(items, '1', Date.now() - 250000)).toEqual('3');
  expect(getCurrentId(items, '4', Date.now() - 121000)).toEqual('1');
});

test('parseTime', () => {
  expect(parseTime(120)).toEqual('02 : 00');
  expect(parseTime(0)).toEqual('00 : 00');
  expect(parseTime(75)).toEqual('01 : 15');
  expect(parseTime(520)).toEqual('08 : 40');
});

test('getSecondsLeft', () => {
  expect(getSecondsLeft(Date.now() - 50000)).toEqual(70);
  expect(getSecondsLeft(Date.now(), 60)).toEqual(60);
  expect(getSecondsLeft(Date.now() - 250000, 120)).toEqual(110);
  expect(getSecondsLeft(Date.now() - 40000, 60)).toEqual(20);
});
