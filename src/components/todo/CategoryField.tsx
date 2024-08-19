import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

const categories = [{ title: '미지정' }, { title: '식사' }, { title: '공부' }, { title: '업무' }, { title: '휴식' }];

const StyledLi = styled.li`
  width: 100%;
  height: 100%;
  margin: 0;
  line-height: 32px;
  &:hover {
    background-color: yellow;
  }
`;

export default function CategoryField() {
  const [selectedCategory, setSelectedCategory] = React.useState([categories[0]]);

  return (
    <Box sx={{ margin: '10px 0' }}>
      <Autocomplete
        multiple
        limitTags={1}
        id="tags-outlined"
        options={categories}
        getOptionLabel={(option) => option.title}
        value={selectedCategory}
        filterSelectedOptions
        ChipProps={{ sx: { background: 'lightcoral', color: 'white', borderRadius: '4px' } }}
        renderInput={(params) => <TextField {...params} label="카테고리" placeholder="카테고리 검색" />}
        renderOption={(props, option) => (
          <Box display="flex" alignItems="center" boxShadow="1px 1px 10px lightgray" margin="8px" borderRadius={1}>
            {/* <TextField size="small" disabled="disabled" /> */}
            <Box width="100%">
              <StyledLi {...props}>{option.title}</StyledLi>
            </Box>

            <Box>수정</Box>
            <Box>삭제</Box>
          </Box>
        )}
        onChange={(e, value) => {
          if (value.length > 0) {
            setSelectedCategory([value[value.length - 1]]); // 마지막으로 선택한 카테고리만 선택
          } else {
            setSelectedCategory([]);
          }
        }}
      />
    </Box>
  );
}
