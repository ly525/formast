import React, { useState, useCallback } from 'react';
import { Formast } from '../../src/react/index.js';
import schemaJson from './form.json';
import { isEmpty } from 'ts-fns';
import * as Options from '../../src/antd';

export default function App() {
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState({});
  const [random, setRandom] = useState(Math.random())

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const errors = model.validate();
    if (errors.length) {
      setErrors(errors);
      setData({});
      return;
    }

    const data = model.toData();
    setErrors([])
    setData(data)
  }, [])

  return (
    <div>
      <Formast schema={schemaJson} options={Options} props={{
        onSubmit: handleSubmit,
        random,
      }} />
      <div>
        {errors.map((err, i) => {
          return <div key={i} style={{ color: 'red' }}>{err.message}</div>
        })}
      </div>
      <pre>
        {isEmpty(data) ? null : JSON.stringify(data, null, 4)}
      </pre>
      <button onClick={() => setRandom(Math.random())}>Random</button>
    </div>
  );
}
