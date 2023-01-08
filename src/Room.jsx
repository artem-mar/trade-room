import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import RoomContext from './context.js';
import TableCell from './TableCell.jsx';
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

const Room = () => {
  const [{ startTraderId, startTime }, setTimerInfo] = useState({});
  const [traders, setTraders] = useState([]);
  const [activeTraderId, setActiveTraderId] = useState(null);
  const [error, setError] = useState(null);

  const setCurrentTraderId = () => {
    const id = getCurrentId(traders, startTraderId, startTime);
    if (activeTraderId !== id) {
      setActiveTraderId(id);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          'https://trade-room-7f3ef-default-rtdb.europe-west1.firebasedatabase.app/roomInfo.json',
        );

        const { traderList, timerInfo } = data;
        setTimerInfo(timerInfo);
        setTraders(traderList);

        setActiveTraderId(
          getCurrentId(traderList, timerInfo.startTraderId, timerInfo.startTime),
        );
      } catch (err) {
        setError(err);
        throw err;
      }
    };
    fetchData();
  }, [activeTraderId]);

  const tradersTable = traders.reduce((acc, trader, i) => {
    const entries = Object.entries(trader);
    const { id } = trader;

    return entries.reduce(
      (ac, [key, value]) => ({
        ...ac,
        [key]: [
          ...ac[key],
          <TableCell
            key={`${key} ${id}`}
            params={{
              id, key, value, i, activeTraderId,
            }}
          />,
        ],
      }),
      acc,
    );
  }, traderScheme);

  const switchTimer = async () => {
    try {
      const ids = traders.map(({ id }) => id);
      const index = ids.indexOf(activeTraderId);
      const nextId = index === ids.length - 1 ? ids[0] : ids[index + 1];
      await axios.put(
        'https://trade-room-7f3ef-default-rtdb.europe-west1.firebasedatabase.app/roomInfo/timerInfo.json',
        { startTime: Date.now(), startTraderId: nextId },
      );
      setTimerInfo({ startTraderId, startTime: Date.now() });
    } catch (err) {
      /* eslint-disable-next-line no-console */
      console.log(err.message);
    }
  };

  return (
    <RoomContext.Provider
      value={useMemo(() => ({ startTime, setCurrentTraderId }), [activeTraderId, startTime])}
    >
      <div className="p-4">
        <div className="fs-5 text-danger">
          Ход торгов
          {' '}
          <b>Тестовые торги на аппарат ЛОТОС №3384342 (дата, время)</b>
        </div>
        <hr />
        {error && <p className="fs-4">Ошибка соединения. Проверьте подключение к сети</p>}
        {!error && (
        <>
          <table className="table table-striped caption-top fs-6 fw-weight-light w-100">
            <caption className="text-danger">
              Уважаемые участники, во время вашего хода вы можете изменить параметры торгов,
              указанных в таблице:
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
        </>
        )}
      </div>
    </RoomContext.Provider>
  );
};

export default Room;
