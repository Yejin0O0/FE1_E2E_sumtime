import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import useBooleanState from '@/hooks/utils/useBooleanState';
import { useState } from 'react';

type Category = {
  id: number;
  title: string;
  color: string;
};

export default function CategoryField() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, title: '식사', color: 'lightcoral' },
    { id: 2, title: '공부', color: 'lightblue' },
    { id: 3, title: '업무', color: 'lightgreen' },
    { id: 4, title: '휴식', color: 'lightpink' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category>({ id: 0, title: '', color: '' });
  const { value: isEditing, toggle } = useBooleanState(false);

  const handleEdit = (id: number, title: string, color: string) => {
    setEditingCategory({ id, title, color });
    setCategories(categories.map((category) => (category.id === id ? { id, title, color } : category)));
    toggle();
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEdit(editingCategory.id, editingCategory.title, editingCategory.color);
    }
  };

  const handleCategoryChange = (value: (string | Category)[]) => {
    const lastValue = value[value.length - 1];
    if (typeof lastValue === 'string') {
      const newCategory = { id: categories.length + 1, title: lastValue, color: 'lightgray' };
      setCategories([...categories, newCategory]);
      setSelectedCategory([newCategory]);
    } else if (lastValue && !selectedCategory.includes(lastValue)) {
      setSelectedCategory([lastValue]); // 마지막으로 선택한 카테고리만 선택
    }
  };

  return (
    <Box sx={{ margin: '10px 0' }}>
      <Box sx={{ display: isEditing ? 'flex' : 'none', position: 'relative', alignItems: 'center' }}>
        <TextField
          inputProps={{ maxLength: 15 }}
          focused
          label="카테고리 수정"
          size="medium"
          value={editingCategory.title}
          onChange={(event) => setEditingCategory({ ...editingCategory, title: event.target.value })}
          onKeyUp={handleKeyUp}
          sx={{ width: '100%', length: '10' }}
        />
        <Box position="absolute" right={14}>
          <IconButton
            size="medium"
            color="default"
            onClick={() => handleEdit(editingCategory.id, editingCategory.title, editingCategory.color)}
          >
            <CheckCircleOutlinedIcon />
          </IconButton>
        </Box>
      </Box>

      <Autocomplete
        sx={{ display: isEditing ? 'none' : 'block' }}
        multiple
        freeSolo
        autoHighlight
        disableClearable
        limitTags={1}
        id="tags-outlined"
        options={categories}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
        value={selectedCategory}
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
            <Box width="100%" height="36px" display="flex" alignItems="center">
              <span
                {...props}
                style={{
                  display: isEditing ? 'none' : 'block',
                  width: '100%',
                  height: '100%',
                  margin: '0',
                }}
              >
                {option.title}
              </span>
            </Box>
            <Box position="absolute" right={40}>
              <IconButton
                size="small"
                sx={{ color: '#b3b3b3' }}
                onClick={() => handleEdit(option.id, option.title, option.color)}
              >
                <EditIcon />
              </IconButton>
            </Box>
            <Box position="absolute" right={8}>
              <IconButton size="small" sx={{ color: '#b3b3b3' }} onClick={() => handleDelete(option.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        )}
        onChange={(e, value) => {
          handleCategoryChange(value);
        }}
      />
    </Box>
  );
}
