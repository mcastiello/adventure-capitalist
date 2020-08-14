import styled from 'styled-components';
import { F7Input, F7Link, F7ListItem } from 'framework7-react';

export const AddItemButton = styled(F7Link)`
  position: absolute;
  right: 5px;
  top: 5px;
`;

export const ItemTitle = styled.div`
  font-size: 20px;
  padding: 3px;
`;

export const ItemDescription = styled.div`
  padding: 5px;
  text-align: justify;
  font-style: italic;
  opacity: 0.75;
`;

export const ItemName = styled.div`
  font-size: 16px;
  padding: 3px;
`;

export const ItemInputName = styled(F7Input)`
  padding: 3px 3px 1px 3px;
  height: auto;

  &.input-with-error-message {
    padding-bottom: 1px;
    margin-bottom: 22px;
  }
`;

export const ListItem = styled(F7ListItem)`
  & .item-content {
    min-height: 30px;
  }
  & .item-inner,
  & .item-media {
    padding-top: 2px;
    padding-bottom: 2px;
    min-height: 30px;
  }
  & > .item-content > .item-media {
    min-width: 20px;
  }
`;
