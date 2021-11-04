import { DropdownIndicatorProps, NoticeProps} from 'react-select'

export const NoOptionsMessage = (props: NoticeProps<any>) => {
  const { innerProps } = props;

  return (
    <div
      {...innerProps}
      className="address-select__no-info"
    >
      Nenhum endereço encontrado!
    </div>
  );
}

export const DropdownIndicator = (props: DropdownIndicatorProps<any>) => {
  const { innerProps } = props;

  return (
    <div
      {...innerProps}
      className='search-button'
    >
      🔍
    </div>
  );
};