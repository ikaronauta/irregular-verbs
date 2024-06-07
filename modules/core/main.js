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
