import * as React from 'react';
import { useState, Dispatch, SetStateAction } from 'react';
import { IconButton, Box, TextField, Autocomplete, MenuItem, createFilterOptions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import useUpdateCategory from '@/api/hooks/categoryHooks/useUpdateCategory';
import useCreateCategory from '@/api/hooks/categoryHooks/useCreateCategory';
import randomColor from 'randomcolor';
import useGetCategoryList from '@/api/hooks/categoryHooks/useGetCategoryList';
import useBooleanState from '@/hooks/utils/useBooleanState';
import * as ColorPickerBoxStyle from '../../ColorPickerBox/ColorPickerBox.styled';
import * as Style from './TodoModal.styled';
import UpdateCategoryColorButton from './UpdateCategoryColorButton';

const S = { ...ColorPickerBoxStyle, ...Style };

type EditType = 'add' | 'update' | 'read';

type EditCategoryType = {
  title: string;
  color?: string | null;
  editType?: EditType;
  id?: number;
  isDisplayed?: number | null;
  isDefault?: number;
};

interface CategoryFieldProps {
  categoryId: number;
  setCategoryId: Dispatch<SetStateAction<number | undefined>>;
}

const filter = createFilterOptions<EditCategoryType>();

export default function CategoryField({ categoryId, setCategoryId }: CategoryFieldProps) {
  const { value: isOpen, setTrue: openAutocompleteOption, setFalse: closeAutocompleteOption } = useBooleanState(false);
  const isFocusColorPicker = React.useRef(false);
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: createCategory } = useCreateCategory();
  const { categoryList } = useGetCategoryList();
  const editCategoryList: EditCategoryType[] | undefined = categoryList?.map((category) => ({
    title: category.title,
    color: category.color,
    editType: 'read',
    id: category.id,
    isDisplayed: category.isDisplayed,
    isDefault: category.isDefault,
  }));
  const selectedCategory = editCategoryList?.find((category) => category.id === categoryId);
  const [editingCategory, setEditingCategory] = useState<EditCategoryType | undefined>(selectedCategory);

  const handleStopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    categoryList && (
      <Box sx={{ margin: '10px 0' }}>
        {editCategoryList && (
          <>
            <S.AutocompleteCloseLayout
              $isOpen={isOpen}
              onClick={() => {
                closeAutocompleteOption();
              }}
            />
            <Autocomplete
              sx={{ zIndex: 80 }}
              open={isOpen}
              disablePortal
              value={editingCategory}
              // 아래 onChange는 value의 값을 변경했을 때가 아닌 enter를 쳤을 때의 콜백이 호출된다.
              onChange={(event, newValue) => {
                if (!newValue) {
                  return;
                }

                if (typeof newValue === 'string') {
                  const color = randomColor();

                  createCategory(
                    { title: newValue, color, isDisplayed: 1 },
                    {
                      onSuccess: (data) => {
                        const { id } = data;
                        setCategoryId(id);
                        setEditingCategory({
                          ...data,
                        });
                      },
                    },
                  );

                  return;
                }

                if (newValue.editType === 'add') {
                  const title = newValue.title.replace('Add ', '');
                  const color = randomColor();

                  setEditingCategory({
                    title,
                    color,
                  });

                  createCategory(
                    { title, color, isDisplayed: 1 },
                    {
                      onSuccess: (data) => {
                        const { id } = data;
                        setCategoryId(id);

                        setEditingCategory({
                          ...data,
                        });
                      },
                    },
                  );

                  return;
                }

                if (newValue.editType === 'update' && editingCategory) {
                  const title = newValue.title.replace('Update ', '');
                  const { id, isDisplayed, color } = editingCategory;

                  if (!isDisplayed || !id || !color) {
                    return;
                  }
                  setEditingCategory({ ...editingCategory, title });

                  updateCategory(
                    { categoryId: id, createInfo: { color, title, isDisplayed } },
                    {
                      onSuccess: () => {
                        setEditingCategory({ ...editingCategory, title });
                        setCategoryId(id);
                      },
                    },
                  );
                  return;
                }

                setEditingCategory(newValue);
                setCategoryId(newValue.id);
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;

                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    title: `Update ${inputValue}`,

                    editType: 'update',
                  });
                  filtered.push({
                    title: `Add ${inputValue}`,

                    editType: 'add',
                  });
                }

                return filtered;
              }}
              handleHomeEndKeys
              options={editCategoryList}
              getOptionLabel={(option) => {
                if (typeof option === 'string') {
                  return option;
                }

                // if (option.inputValue) {
                //   return option.inputValue;
                // }

                // Regular option
                return option.title;
              }}
              freeSolo
              renderInput={(params) => <TextField {...params} />}
              renderOption={(props, option) => {
                // eslint-disable-next-line react/prop-types
                const { key, ...otherProps } = props;
                return (
                  <MenuItem key={key} {...otherProps} sx={{ height: '52px' }}>
                    <S.SelectItemLayout>
                      <S.SelectItemDescriptionLayout>
                        {option.id && (
                          <UpdateCategoryColorButton
                            categoryId={option.id}
                            onPointerDown={handleStopPropagation}
                            onMouseDown={handleStopPropagation}
                            onClick={(e) => {
                              handleStopPropagation(e);
                              isFocusColorPicker.current = true;
                            }}
                            onBlur={(e) => {
                              e.preventDefault();
                            }}
                          />
                        )}
                        {option.title}
                      </S.SelectItemDescriptionLayout>
                      {option.isDefault === 0 && (
                        <IconButton
                          size="medium"
                          color="default"
                          onClick={(e) => {
                            handleStopPropagation(e);
                            setEditingCategory({ ...option });
                            e.preventDefault();
                          }}
                          onPointerDown={(e) => {
                            handleStopPropagation(e);
                            e.preventDefault();
                          }}
                          onMouseDown={handleStopPropagation}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </S.SelectItemLayout>
                  </MenuItem>
                );
              }}
              onClose={(_event, reason) => {
                if (reason === 'blur') {
                  return;
                }

                closeAutocompleteOption();
              }}
              onOpen={() => {
                openAutocompleteOption();
              }}
            />
          </>
        )}
      </Box>
    )
  );
}
