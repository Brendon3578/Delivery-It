import Datetime from 'react-datetime';
import { DatetimepickerProps } from 'react-datetime';
import 'moment/locale/pt-br';
import "react-datetime/css/react-datetime.css";

import '../../utils/formatMomentDate'

import './styles.scss'

export function DateTimeField({...props}: DatetimepickerProps) {
  return(
    <div className="input-block input-datetime">
      <label>Data de Entrega</label>
      <Datetime {...props}/>
    </div>
  );
}