import React, { useState, useMemo, useEffect } from 'react';
import RoomContext from './context.js';
import Timer from './Timer.jsx';
import { getCurrentId } from './utils.jsx';

const traders = [
  {
    id: 1,
    name: 'name 1',
    qualityImprovement: '-',
    productionTime: '11',
    warrantyPeriod: '111',
    paymentTerms: '123',
    lotProductionCost: '111',
    actions: '',
  },
  {
    id: 2,
    name: 'name 2',
    qualityImprovement: '-',
    productionTime: '22',
    warrantyPeriod: '222',
    paymentTerms: '234',
    lotProductionCost: '211',
    actions: '',
  },
  {
    id: 3,
    name: 'name 3',
    qualityImprovement: '-',
    productionTime: '33',
    warrantyPeriod: '333',
    paymentTerms: '345',
    lotProductionCost: '321',
    actions: '',
  },
  {
    id: 4,
    name: 'name 4',
    qualityImprovement: '-',
    productionTime: '11',
    warrantyPeriod: '111',
    paymentTerms: '123',
    lotProductionCost: '111',
    actions: '',
  },
  {
    id: 5,
    name: 'name 5',
    qualityImprovement: '-',
    productionTime: '22',
    warrantyPeriod: '222',
    paymentTerms: '234',
    lotProductionCost: '211',
    actions: '',
  },
];

const traderScheme = {
  id: [],
  name: [],
  qualityImprovement: [],
  productionTime: [],
  warrantyPeriod: [],
  paymentTerms: [],
  lotProductionCost: [],
  actions: [],
};

// const tradersTable = traders.reduce(
//   (acc, trader) => ({
//     names: [...acc.names, trader.name],
//     qualityImprovements: [...acc.qualityImprovements, trader.qualityImprovement],
//     productionTimes: [...acc.productionTimes, trader.productionTime],
//     warrantyPeriods: [...acc.warrantyPeriods, trader.warrantyPeriod],
//     paymentTerms: [...acc.paymentTerms, trader.paymentTerms],
//     lotProductionCosts: [...acc.lotProductionCosts, trader.lotProductionCost],
//     actions: [...acc.actions, trader.actions],
//   }), traderScheme
// );

const renderTd = (params) => {
  const {
    id, key, value, i, activeUserId,
  } = params;

  switch (key) {
    case 'name':
      return (
        <td key={`${key} ${id}`} className="text-center px-5">
          <span>{`участник №${i + 1}`}</span>
          <p className="mb-0">{value}</p>
        </td>
      );
    case 'id':
      return (
        <td
          key={`${key} ${id}`}
          className={`text-center px-5 ${activeUserId === id && 'table-danger'}`}
        >
          {activeUserId === id && <Timer />}
        </td>
      );
    default:
      return (
        <td key={`${key} ${id}`} className="text-center px-5">
          {value}
        </td>
      );
  }
};

const time = new Date('01-01-2023 00:01').getTime();

const Room = () => {
  const [activeTraderId, setActiveTraderId] = useState(traders[0].id);
  const [startTime, setStartTime] = useState(Date.now());

  const ids = traders.map(({ id }) => id);

  const setNextTraderId = () => {
    const index = ids.indexOf(activeTraderId);
    const newId = index === ids.length - 1 ? ids[0] : ids[index + 1];
    setActiveTraderId(newId);
  };

  useEffect(() => {
    setStartTime(time);
    setActiveTraderId(getCurrentId(ids, 1, time));
  }, [startTime]);

  const tTable = traders.reduce((acc, trader, i) => {
    const entries = Object.entries(trader);
    const { id } = trader;

    return entries.reduce(
      (ac, [key, value]) => ({
        ...ac,
        [key]: [...ac[key], renderTd({
          id, key, value, i, activeUserId: activeTraderId,
        })],
      }),
      acc,
    );
  }, traderScheme);

  return (
    <RoomContext.Provider value={useMemo(() => (
      { startTime, setNextTraderId }
    ), [activeTraderId, startTime])}
    >
      <div className="p-4">
        <div className="fs-5 text-danger">
          Ход торгов
          {' '}
          <b>Тестовые торги на аппарат ЛОТОС №3384342 (дата, время)</b>
        </div>
        <hr />
        <table className="table table-striped caption-top fs-6 fw-weight-light w-100">
          <caption className="text-danger">
            Уважаемые участники, во время вашего хода вы можете изменить параметры торгов,
            указанных в таблице:
          </caption>
          <thead className="text-primary text-uppercase align-middle">
            <tr>
              <td className="min-vw-25">Ход</td>
              {tTable.id}
            </tr>
            <tr>
              <td>Параметры и требования</td>
              {tTable.name}
            </tr>
          </thead>
          <tbody className="table-group-divider align-middle">
            <tr>
              <td>Наличие комплекса мероприятий, повышающих стандарты качества изготовления</td>
              {tTable.qualityImprovement}
            </tr>

            <tr>
              <td>Срок изготовления лота, дней</td>
              {tTable.productionTime}
            </tr>

            <tr>
              <td>Гарантийные обязательства, мес</td>
              {tTable.warrantyPeriod}
            </tr>

            <tr>
              <td>Условия оплаты</td>
              {tTable.paymentTerms}
            </tr>

            <tr>
              <td>Стоимость изготовления лота, руб (без НДС)</td>
              {tTable.lotProductionCost}
            </tr>

            <tr>
              <td>Действия</td>
              {tTable.actions}
            </tr>
          </tbody>
        </table>
        <button onClick={() => setNextTraderId()} type="button" className="btn btn-primary">btn</button>
      </div>
    </RoomContext.Provider>
  );
};

export default Room;
