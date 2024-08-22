import { useState } from 'react';
import { getItemFromLocalStorage, setItemToLocalStorage } from '@/utils';
import * as CommonStyle from '@/components/common';
import * as ColorPickerStyle from './ColorPicker.styled';
import { DEFAULT_COLOR_PALETTE, PALETTE_SIZE } from './constants';

const S = { ...CommonStyle, ...ColorPickerStyle };

interface ColorPaletteProps extends React.ComponentPropsWithRef<'div'> {
  color: string;
  setColor: (newColor: string) => void;
}

function ColorPalette({ color, setColor }: ColorPaletteProps) {
  const [localColorPalette, setLocalColorPalette] = useState<string[]>(getItemFromLocalStorage<string[]>('colorPalette') ?? []);
  const [colorPalette, setColorPalette] = useState<string[]>([...localColorPalette, ...DEFAULT_COLOR_PALETTE].slice(0, 10));

  const handleSaveColor = () => {
    if (localColorPalette.includes(color)) {
      return;
    }

    const updatedLocalColorPalette =
      PALETTE_SIZE <= localColorPalette.length ? [color, ...localColorPalette.slice(0, -1)] : [color, ...localColorPalette];
    setLocalColorPalette([...updatedLocalColorPalette]);
    setItemToLocalStorage('colorPalette', [...updatedLocalColorPalette]);
    setColorPalette([...updatedLocalColorPalette, ...DEFAULT_COLOR_PALETTE].slice(0, 10));
  };

  return (
    <>
      <S.SaveBarLayout $justify="space-between" $align="center">
        <S.Text $fontSize="14px">Saved color:</S.Text>
        <S.SaveButton type="button" onClick={handleSaveColor}>
          save
        </S.SaveButton>
      </S.SaveBarLayout>
      <S.ColorPaletteLayout>
        {colorPalette.map((paletteColor) => (
          <S.PaletteColorButton
            $backgroundColor={paletteColor}
            type="button"
            key={paletteColor}
            onClick={() => {
              setColor(paletteColor);
            }}
          />
        ))}
      </S.ColorPaletteLayout>
    </>
  );
}

export default ColorPalette;
