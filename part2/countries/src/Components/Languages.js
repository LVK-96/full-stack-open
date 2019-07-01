import React from 'react';
import Language from './Language';

const Languages = ({ languages }) => {
  const langList = languages.map(language => <Language key={language.iso639_1} 
                                              language={language.name} />);

  return (
    <div>
      {langList}
    </div>
  )
}

export default Languages;
