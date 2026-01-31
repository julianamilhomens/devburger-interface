import Select from 'react-select';
import styled from 'styled-components';

export const ProductImage = styled.img`
  height: 80px;
  padding: 12px;
  border-radius: 16px;
`;

export const SelectStatus = styled(Select)`
  width: 240px;
  display: inline-block;
  vertical-align: middle;
  
  * {
    font-size: 14px !important;
  }
`;

export const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 32,
    height: 32,
    borderRadius: 8,
    fontSize: 14,
    boxShadow: 'none',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    borderColor: state.isFocused ? '#9758a6' : base.borderColor,
    '&:hover': {
      borderColor: '#9758a6',
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: '0 6px',
    gridColumn: '1 / 2',
    height: 32,
    display: 'flex',
    alignItems: 'center',
  }),

  singleValue: (base) => ({
    ...base,
    maxWidth: '100%',  
    margin: 0,
    fontSize: '14px !important',
    lineHeight: '1.2',
  }),

  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    fontSize: 14,
  }),

  indicatorsContainer: (base) => ({
    ...base,
    gridColumn: '2 / 3',
    padding: 0,
    height: 32,
    display: 'flex',
    alignItems: 'center',
  }),

  dropdownIndicator: (base) => ({
    ...base,
    padding: 4,
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  
  menu: (base) => ({
    ...base,
    fontSize: 14,
  }),
  
  option: (base, state) => ({
    ...base,
    fontSize: 14,
    backgroundColor: state.isSelected 
      ? '#9758a6'
      : state.isFocused 
      ? '#E9D5FF'
      : 'white',
    color: state.isSelected ? 'white' : '#333',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#9758a6',
    },
  }),
};

export const Filter = styled.div`
  display: flex;
  justify-content: center;
  margin: 28px 0;
  gap: 50px;
  flex-wrap: nowrap;
`;

export const FilterOption = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: ${(props) => props.$isActiveStatus ? props.theme.purple : props.theme.darkGray};
  border-bottom: ${(props) => props.$isActiveStatus ? `2px solid ${props.theme.purple}` : 'none'};
  font-size: 15px;
  line-height: 20px;
  padding-bottom: 5px;
  white-space: nowrap;
`;