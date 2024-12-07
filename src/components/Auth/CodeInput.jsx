import React, { useState } from 'react';

const CodeInput = ({ length = 5}) => {
  const [values, setValues] = useState(Array(length).fill(''));
  const handleInputChange = (event) => {
    const { value } = event.target;
    // Оставляем только цифры
    event.target.value = value.replace(/[^0-9]/g, "");
  };
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.length > 1) return;
    
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    // Перемещаем фокус на следующее поле
    if (value !== '' && index < length - 1) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Переход на предыдущий input при удалении
    if (e.key === 'Backspace' && values[index] === '' && index > 0) {
      document.getElementById(`code-input-${index - 1}`).focus();
    }
  };

  return (
    <div className='code-input' style={{ display: 'flex', gap: '10px' }}>
      {values.map((val, index) => (
        <input
          key={index}
          id={`code-input-${index}`}
          type="tel"
          placeholder='_'
          maxLength="1"
          className="only-numbers"
          value={val}
          onInput={handleInputChange}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            width: '55px',
            height: '44px',
            textAlign: 'center',
            fontSize: '20px',
            background: '#f2f2f2',
            borderRadius: '25px'
          }}
        />
      ))}
    </div>
  );
};

export default CodeInput;
