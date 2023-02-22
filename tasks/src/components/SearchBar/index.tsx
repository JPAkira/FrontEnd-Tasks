import React, { useState } from 'react';
import {SearchInputStyle, SearchButton, FormStyle} from "./style";

interface SearchInputProps {
}

const SearchInput: React.FC<SearchInputProps> = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <SearchInputStyle type="text" placeholder="Pesquisar..." value={searchValue} onChange={handleChange} />
      <SearchButton type="submit">Search</SearchButton>
    </FormStyle>
  );
};

export default SearchInput;