import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { F7List } from 'framework7-react';
import { ItemDescription, ItemInputName, ItemName, ItemTitle, ListItem, ListButton } from '../CommonStyledComponents';
import { ItemProps, BaseItemType, ItemData } from '../ItemProps';

const AddItemModalContent = <T extends string, S extends BaseItemType>({
  open,
  onCreate,
  wallet,
  source,
  defaultValue,
  title,
  icons,
  dataValues
}: ItemProps<T, S>) => {
  const [selectedType, setSelectedType] = useState<T>(defaultValue);
  const [name, setName] = useState('');
  const updateName = useCallback((event: SyntheticEvent) => {
    if (event) {
      const nativeEvent = event.nativeEvent as InputEvent;
      const input = nativeEvent.target as HTMLInputElement;
      const value = input.value || '';
      setName(value);
    }
  }, []);
  const list: ItemData<T, S>[] = (Object.keys(source) as T[]).map((itemType) => {
    const data: ItemData<T, S> = {
      ...source[itemType],
      type: itemType
    };
    return data;
  });
  const createItem = useCallback(() => onCreate(name, selectedType), [name, selectedType, onCreate]);

  useEffect(() => {
    setSelectedType(defaultValue);
    setName('');
  }, [open, defaultValue]);

  return (
    <>
      <ItemTitle>{`Add New ${title}`}</ItemTitle>
      <F7List themeDark mediaList>
        {list.map((item) => (
          <ListItem
            title={item.typeName}
            key={item.type}
            radio
            radioIcon={'end'}
            onClick={() => setSelectedType(item.type)}
            checked={selectedType === item.type}
          >
            <span slot={'media'}>{icons[item.type]}</span>
          </ListItem>
        ))}
      </F7List>
      <ItemName>{`${title} Description`}</ItemName>
      <ItemDescription>{source[selectedType].description}</ItemDescription>
      <F7List themeDark mediaList>
        {dataValues.map((dataValue) => (
          <ListItem key={dataValue.title} title={dataValue.title} after={dataValue.getValue(selectedType)}>
            <span slot={'media'}>{dataValue.icon}</span>
          </ListItem>
        ))}
      </F7List>
      <ItemName>{`${title} Name`}</ItemName>
      {open && (
        <ItemInputName
          type={'text'}
          placeholder={`Insert your ${title} name`}
          value={name}
          onChange={updateName}
          validate
          validateOnBlur
          required
        />
      )}
      <ListButton
        text={wallet < source[selectedType].cost ? 'Not enough funds' : 'Create'}
        disabled={name.length === 0 || wallet < source[selectedType].cost}
        onClick={createItem}
      />
    </>
  );
};

export default AddItemModalContent;
