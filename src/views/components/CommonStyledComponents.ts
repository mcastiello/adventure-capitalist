import styled from 'styled-components';
import { F7Button, F7Input, F7Link, F7ListItem } from 'framework7-react';

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

export const ListButton = styled(F7Button)`
  color: white;
  background: var(--blue-background);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

export const ListOptionsButton = styled(ListButton)`
  display: inline-block;
  width: 50%;
`;

export const ListUpgradeButton = styled(ListOptionsButton)`
  border-bottom-right-radius: 0;
`;

export const ListDeleteButton = styled(ListOptionsButton)`
  border-bottom-left-radius: 0;
  background: red;
`;

export const IconSlot = styled.div`
  font-size: 28px;
  text-align: center;
  position: relative;
`;

export const StyledItem = styled(F7ListItem)`
  pointer-events: none;
  & > .item-content > .item-inner {
    margin-left: 0;
  }

  & a,
  & span.clickable {
    pointer-events: initial;
  }

  & span.clickable {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const NotAvailableMessage = styled.div`
  font-size: 18px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  padding-top: 10px;
`;
