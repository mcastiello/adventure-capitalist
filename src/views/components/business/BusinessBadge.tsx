import React from 'react';
import styled from 'styled-components';
import { BusinessBadgeProps } from '../../GameProps';
import { BusinessIcons } from '../../icons/BusinessIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { IconSlot } from '../CommonStyledComponents';

const BadgeSlot = styled.div`
  position: absolute;
  font-size: 15px;
  top: -5px;
  right: -5px;
  color: var(--blue-background);
  width: 15px;
  height: 15px;
  text-align: center;
`;

const BadgeSlotLevel = styled(BadgeSlot)`
  color: white;
  font-size: 12px;
  top: -3px;
`;

const BusinessBadge: React.FC<BusinessBadgeProps> = ({ type, level }) => {
  return (
    <IconSlot>
      {BusinessIcons[type]}
      <BadgeSlot>
        <FontAwesomeIcon icon={faCertificate} />
      </BadgeSlot>
      <BadgeSlotLevel>{level}</BadgeSlotLevel>
    </IconSlot>
  );
};

export default BusinessBadge;
