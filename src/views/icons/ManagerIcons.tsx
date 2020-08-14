import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserGraduate, faUserNinja, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { ManagerType } from '../../state/features/managers/managersTypes';

export const ManagerIcons: Record<ManagerType, ReactNode> = {
  [ManagerType.Clerk]: <FontAwesomeIcon icon={faUserNinja} />,
  [ManagerType.JuniorManager]: <FontAwesomeIcon icon={faUserGraduate} />,
  [ManagerType.SeniorManager]: <FontAwesomeIcon icon={faUser} />,
  [ManagerType.CEO]: <FontAwesomeIcon icon={faUserTie} />
};
