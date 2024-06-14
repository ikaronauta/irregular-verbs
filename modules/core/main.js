export function existLocalStorage(item) {
  if (localStorage.getItem(item)) return true;
  else return false;
}

export function getVerb(dataVerbs, verb) {
  let data = dataVerbs.find(function (objVerb) {
    return objVerb.data.es.find(function (item) {
      return item == verb;
    });
  });

  if (data) return data;
}

export function getVerbs(dataVerbs, letters) {
  let data = dataVerbs
    .filter(function (objVerb) {
      return objVerb.data.es.some(function (item) {
        return item.includes(letters);
      });
    })
    .map(function (objVerb) {
      // Encuentra el primer texto que contiene las letras
      const foundText = objVerb.data.es.find(function (item) {
        return item.includes(letters);
      });

      // Agrega el atributo found al objeto
      return {
        ...objVerb,
        found: foundText,
      };
    });

  return data;
}
