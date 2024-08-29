import * as React from 'react';
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import useBooleanState from '@/hooks/utils/useBooleanState';
import useUpdateCategory from '@/api/hooks/categoryHooks/useUpdateCategory';
import useCreateCategory from '@/api/hooks/categoryHooks/useCreateCategory';
import randomColor from 'randomcolor';
import useGetCategoryList from '@/api/hooks/categoryHooks/useGetCategoryList';
import { Input } from '../common';
import ColorPickerInput from '../ColorPickerBox/ColorPickerInput';
import * as S from '../ColorPickerBox/ColorPickerBox.styled';

type Category = {
  id: number;
  title: string;
  color: string | null;
  isDisplayed: number | null; // 사용시에 optional 처리
};

export default function CategoryField() {
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category>({ id: 0, title: '', color: '', isDisplayed: 0 });
  const [isEditingComplete, setEditingComplete] = useState(false);
  const { value: isEditing, toggle } = useBooleanState(false);
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: createCategory } = useCreateCategory();

  const sampleCategoryList = useGetCategoryList();
  const filteredCategoryList = sampleCategoryList?.map(({ userId, isDefault, ...rest }) => rest);

  const handleEdit = (id: number, title: string, color: string, isDisplayed: number) => {
    setEditingCategory({ id, title, color, isDisplayed });
    toggle();
  };

  const handleCompleteEdit = (id: number, title: string, color: string) => {
    if (id === 0 || !title) {
      console.error('Invalid category data');
      return;
    }

    updateCategory({ categoryId: id, createInfo: { title, color, isDisplayed: 0 } });

    toggle();
    setEditingComplete(true);
  };

  const handleCategoryChange = (value: (string | Category)[]) => {
    const lastValue = value[value.length - 1];
    if (typeof lastValue === 'string') {
      // 사용자가 키보드를 통해서 카테고리를 생성할 떄 진행되는 코드
      createCategory({ title: lastValue, color: randomColor(), isDisplayed: 0 });
    } else if (lastValue && !selectedCategory.includes(lastValue)) {
      // Option을 선택할 때 진행되는 코드
      setSelectedCategory([lastValue]); // Select only the last chosen category
    }
  };

  const handleSetCategoryColor = (newColor: string) => {
    // Update category color
    setEditingCategory({ ...editingCategory, color: newColor });
  };

  return (
    filteredCategoryList && (
      <Box sx={{ margin: '10px 0' }}>
        <Box sx={{ display: isEditing ? 'flex' : 'none', position: 'relative', alignItems: 'center' }}>
          <S.ColorPickerBoxLayout $height="100%" $margin="0px 0px 0px 0px" $gap="10px" $alignItems="stretch">
            <S.LabelP>카테고리 수정</S.LabelP>
            <ColorPickerInput style={{ flex: 0.7 }} color={editingCategory.color || ''} setColor={handleSetCategoryColor} />
            <Input
              style={{ flex: 8 }}
              value={editingCategory.title}
              onChange={(event) => setEditingCategory({ ...editingCategory, title: event.target.value })}
              // onKeyUp={handleKeyUp}
            />
            <IconButton
              style={{ flex: 1 }}
              size="medium"
              color="default"
              onClick={() => handleCompleteEdit(editingCategory.id, editingCategory.title, editingCategory.color || '')}
            >
              <CheckCircleOutlinedIcon />
            </IconButton>
          </S.ColorPickerBoxLayout>
        </Box>

        <Autocomplete
          sx={{ display: isEditing ? 'none' : 'block' }}
          multiple
          freeSolo
          autoHighlight
          disableClearable
          limitTags={1}
          id="tags-outlined"
          options={filteredCategoryList}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
          value={selectedCategory} // 확인 팔요.
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="카테고리" placeholder="카테고리 검색" />}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const tagProps = getTagProps({ index });
              return (
                <Chip
                  key={tagProps.key}
                  label={option.title}
                  className={tagProps.className}
                  onDelete={() => setSelectedCategory([])}
                  disabled={tagProps.disabled}
                  tabIndex={tagProps.tabIndex}
                  sx={{ background: option.color, color: 'white', borderRadius: '4px' }}
                />
              );
            })
          }
          renderOption={(props, option) => (
            <Box
              position="relative"
              display="flex"
              alignItems="center"
              boxShadow="1px 1px 5px lightgray"
              margin="8px"
              borderRadius={1}
            >
              <Box
                width="100%"
                height="36px"
                display="flex"
                alignItems="center"
                position="relative"
                sx={{
                  '&:hover': {
                    bgcolor: '#f2f3f5', // Hover effect
                  },
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: 1,
                    bgcolor: option.color,
                  }}
                />
                <span
                  {...props}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    margin: '0',
                  }}
                >
                  {option.title}
                </span>

                <Box position="absolute" right={8}>
                  <IconButton
                    size="small"
                    sx={{ color: '#b3b3b3' }}
                    onClick={() => handleEdit(option.id, option.title, option.color || randomColor(), option.isDisplayed || 0)}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          )}
          onChange={(e, value) => {
            handleCategoryChange(value); // 얜 엔터를 치면 간다.
          }}
        />

        {isEditingComplete && <S.ColorPickerEditedSpan $color="green">카테고리 수정 완료</S.ColorPickerEditedSpan>}
      </Box>
    )
  );
}
