import { MouseEventHandler } from 'react';
import AsyncSelect from 'react-select/async';

import { api, ACCESS_TOKEN_MAP_BOX } from '../../services/api';

import { AddressType } from '../../App'
import { DropdownIndicator, NoOptionsMessage } from './SelectComponents'

import './styles.scss'

type AddressSelectFieldProps = {
  address: AddressType;
  onChangeSelect: (event: any) => void;
  clearAddressEvent: MouseEventHandler;
}


export function AddressSelectField ({
  address, onChangeSelect, clearAddressEvent
} : AddressSelectFieldProps) {

  const loadOptions = async (inputValue: any, callback: any) => {
    if (inputValue.length < 5) return;
    let places: any = [];
    const response = await api.get(`geocoding/v5/mapbox.places/${inputValue}.json?access_token=${ACCESS_TOKEN_MAP_BOX}`);

    response.data.features.map((item: any) => {
      places.push({
        label: item.place_name,
        value: item.place_name,
        coords: item.center,
        place: item.place_name,
      });
      return null
    });
    
    callback(places);
  };

  return (
    <div className="input-block">
      <label htmlFor="address">Endereço</label>
      <AsyncSelect
        placeholder="Digite o endereço da entrega"
        classNamePrefix="address-select"
        cacheOptions
        loadOptions={loadOptions}
        onChange={onChangeSelect}
        value={address}
        components={{ DropdownIndicator, NoOptionsMessage }}
      />
      <button className="clean-button" onClick={clearAddressEvent}>
        Limpar
      </button>
    </div>
  );
}