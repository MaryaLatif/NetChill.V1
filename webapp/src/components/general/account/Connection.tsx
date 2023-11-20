import { useState } from 'react';
import * as React from 'react';
import '../../../../assets/scss/components/general/account/account.scss';
import IconButton from '../../theme/action/IconButton';
import { Popin } from '../../theme/popin/Popin';

type Props = {
  handleSubmitAction: (inputState: { value: string; }) => void,
};

function Connection({ handleSubmitAction }: Props) {
  const [inputState, setInputState] = useState<{ value: string }>({ value: '' });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputState({ value: event.target.value });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); // Empêcher la soumission par défaut du formulaire
    handleSubmitAction(inputState);
  }

  return (
    <div className="connection">
      <h2>Hi there! Enter the secret code plz. 🤨</h2>
      <form onSubmit={handleSubmit}>
        <label>Secret code: &nbsp;
          <input type="password" value={inputState.value} onChange={handleChange} className="connection__input-pass" />
        </label>
        <IconButton><input type="submit" /></IconButton>
      </form>
    </div>

  /*
    <div className="connection__container">
      <div className='connection'>
        <h2>Hi there! Enter the secret code plz. 🤨</h2>
        <form onSubmit={handleSubmit}>
          <label>Secret code: &nbsp;
            <input type="password" value={inputState.value} onChange={handleChange} className='connection__input-pass'/>
          </label>
          <IconButton ><input type="submit"/></IconButton>
        </form>
      </div>
    </div>
     */
  );
}

export default Connection;
