import React from 'react';

function Title({ title }) {
  return (
    <h2 className="text-center mb-8 text-xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-primary font-primary">
      {title}
    </h2>
  );
}

export default Title;
