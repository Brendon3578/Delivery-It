import { MouseEventHandler } from 'react';

import { Popup } from 'react-leaflet';

import { DeliveryType } from '../../App'

import { FiTrash2, FiEdit3 } from 'react-icons/fi';
import './styles.scss'

type DeliveryPopupProps = {
  delivery: DeliveryType
  deleteDeliveryFunction: MouseEventHandler<HTMLButtonElement>
  editDeliveryFunction: MouseEventHandler<HTMLButtonElement>
}

export function DeliveryPopup ({
  delivery, deleteDeliveryFunction, editDeliveryFunction
}:DeliveryPopupProps) {
  return (
    <Popup
      closeButton={false}
      minWidth={280}
      maxWidth={280}
      className="map-popup"
    >
      <div>
        <h3>📍 {delivery.name}</h3>
        <p>
          {delivery.address} {delivery.complement && `- ${delivery.complement}`}
        </p>
        <p>
          Data de Entrega: {delivery.date}
        </p>
        <div>
          🗺️&nbsp;
          <a target={'_blank'} rel="noreferrer" title='Abrir Rotas do Google Maps'
            href={`https://www.google.com/maps/search/?api=1&query=${delivery.latitude},${delivery.longitude}`}
          >
            Google Maps Rotas
          </a>
        </div>
        <div className="action-buttons">
          <button className="popup-button" onClick={editDeliveryFunction} title='Editar entrega'>
            <FiEdit3 />
          </button>

          <button className="popup-button" onClick={deleteDeliveryFunction} title='Deletar entrega'>
            <FiTrash2 />
          </button>
        </div>
      </div>
    </Popup>
  );
}