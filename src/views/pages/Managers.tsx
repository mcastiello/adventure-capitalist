import React from 'react';
import { useSelector } from 'react-redux';
import { getManagers } from '../../state/features/managers/managersSelectors';
import { F7List } from 'framework7-react';
import { NotAvailableMessage } from '../components/CommonStyledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import ManagerItem from '../components/manager/ManagerItem';
import styled from 'styled-components';

const StyledList = styled(F7List)`
  & .item-text {
    max-height: unset;
  }
`;

const ManagersPage: React.FC = () => {
  const managers = useSelector(getManagers);

  return (
    <>
      {managers.length === 0 ? (
        <NotAvailableMessage>
          Add a new manager using the <FontAwesomeIcon icon={faPlusCircle} /> icon
        </NotAvailableMessage>
      ) : (
        <StyledList themeDark mediaList style={{ margin: '0' }}>
          <ul>
            {managers.map((manager) => (
              <ManagerItem key={manager.id} manager={manager} />
            ))}
          </ul>
        </StyledList>
      )}
    </>
  );
};

export default ManagersPage;
