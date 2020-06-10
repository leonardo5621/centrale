'use strict';

module.exports.handle = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Oui ça marche Léo'
      },
      null,
      2
    ),
  };
};
