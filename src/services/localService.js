export const VISITED_VEHICLES = "visitedVehicles";
export const SHOP_TOKEN = "tok";

export const saveTokenLocal = (_token) => {
  localStorage.setItem(SHOP_TOKEN, _token);
}

export const checkTokenLocal = () => {
  if(localStorage[SHOP_TOKEN]){
    return localStorage[SHOP_TOKEN];
  }
  else{
    return false;
  }
}

export const deleteToken = () => {
  localStorage.removeItem(SHOP_TOKEN)
}


export const addProdVisitedToLocal = (_id) => {
  let local_ar = localStorage[VISITED_VEHICLES] ? localStorage[VISITED_VEHICLES].split(",") : [];
  if (!local_ar.includes(_id)) {
    local_ar.unshift(_id);
    local_ar.splice(3, local_ar.length);
    localStorage.setItem(VISITED_VEHICLES, local_ar.join(","));
  }
}

export const checkVisitedLocal = () => {
  if (localStorage[VISITED_VEHICLES]) {
    return localStorage[VISITED_VEHICLES];
  }
  return null;
}