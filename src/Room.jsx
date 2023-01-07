import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import RoomContext from './context.js';
import Timer from './Timer.jsx';
import { getCurrentId } from './utils.jsx';

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

const renderTd = (params) => {
  const {
    id, key, value, i, activeTraderId,
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
          className={`text-center px-5 ${activeTraderId === id && 'table-danger'}`}
        >
          {activeTraderId === id && <Timer />}
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

const Room = () => {
  const [activeTraderId, setActiveTraderId] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [traders, setTraders] = useState([]);

  const setNextTraderId = () => {
    const ids = traders.map(({ id }) => id);
    const index = ids.indexOf(activeTraderId);
    const newId = index === ids.length - 1 ? ids[0] : ids[index + 1];
    setActiveTraderId(newId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        'https://trade-room-7f3ef-default-rtdb.europe-west1.firebasedatabase.app/roomInfo.json',
      );
      setActiveTraderId(
        getCurrentId(data.traders, data.timerInfo.startUserId, data.timerInfo.startTime),
      );
      setStartTime(data.timerInfo.startTime);
      setTraders(data.traders);
    };
    fetchData();
  }, [startTime, activeTraderId]);

  const tradersTable = traders.reduce((acc, trader, i) => {
    const entries = Object.entries(trader);
    const { id } = trader;

    return entries.reduce(
      (ac, [key, value]) => ({
        ...ac,
        [key]: [
          ...ac[key],
          renderTd({
            id, key, value, i, activeTraderId,
          }),
        ],
      }),
      acc,
    );
  }, traderScheme);

  const switchTimer = async () => {
    try {
      const ids = traders.map(({ id }) => id);
      const index = ids.indexOf(activeTraderId);
      const newId = index === ids.length - 1 ? ids[0] : ids[index + 1];
      await axios.put(
        'https://trade-room-7f3ef-default-rtdb.europe-west1.firebasedatabase.app/roomInfo/timerInfo.json',
        { startTime: Date.now(), startUserId: newId },
      );
      setStartTime(Date.now());
      setActiveTraderId(newId);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <RoomContext.Provider
      value={useMemo(() => ({ startTime, setNextTraderId }), [activeTraderId, startTime])}
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
            Уважаемые участники, во время вашего хода вы можете изменить параметры торгов, указанных
            в таблице:
          </caption>
          <thead className="text-primary text-uppercase align-middle">
            <tr>
              <td className="min-vw-25">Ход</td>
              {tradersTable.id}
            </tr>
            <tr>
              <td>Параметры и требования</td>
              {tradersTable.name}
            </tr>
          </thead>
          <tbody className="table-group-divider align-middle">
            <tr>
              <td>Наличие комплекса мероприятий, повышающих стандарты качества изготовления</td>
              {tradersTable.qualityImprovement}
            </tr>

            <tr>
              <td>Срок изготовления лота, дней</td>
              {tradersTable.productionTime}
            </tr>

            <tr>
              <td>Гарантийные обязательства, мес</td>
              {tradersTable.warrantyPeriod}
            </tr>

            <tr>
              <td>Условия оплаты</td>
              {tradersTable.paymentTerms}
            </tr>

            <tr>
              <td>Стоимость изготовления лота, руб (без НДС)</td>
              {tradersTable.lotProductionCost}
            </tr>

            <tr>
              <td>Действия</td>
              {tradersTable.actions}
            </tr>
          </tbody>
        </table>
        <button onClick={switchTimer} type="button" className="btn btn-primary">
          Сделать ход
        </button>
      </div>
    </RoomContext.Provider>
  );
};

export default Room;
